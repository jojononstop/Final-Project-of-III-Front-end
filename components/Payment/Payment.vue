<template>
  <div>
    <button class="checkout" @click="show()">test</button>
    <button class="checkout" @click="postLinePay">LinePay結帳</button>
    <button class="checkout" @click="postEcPay">EcPay結帳</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { VueCookieNext as $cookie } from 'vue-cookie-next';

async function show() {
  let test = ref(null);
  let id = $cookie.getCookie('Id')
  
  let cartItems = ref(null);
  let testData = {};
  let cartData = {}
  
  const response = await axios.get(`https://localhost:7048/api/CartItems/${id}`)
 
  cartItems.value = response.data;
  testData.amount = 0;
  testData.packages = [];
  testData.packages.amount = 0;
    testData.packages.products = [];
  for (let item of cartItems.value) {
    // 从item中获取所需的信息
    let itemId = item.gameId;
 
    // 发送另一个axios请求
    let gameResponse = await axios.get(`https://localhost:7048/api/Games/${itemId}`);
    // 获取游戏数据
    let game = gameResponse.data;
    
  
    // 将游戏数据添加到gameData对象中
    

    testData.amount += game.discountPrice;
    
    testData.packages.amount += game.discountPrice;
    testData.packages.id = 1;
    testData.packages.name = "test";

    let cartGame = {
      "name": `${game.name}`,
      "quantity": 1,
      "price": game.discountPrice
    }

    console.log(cartGame)
    testData.packages.products.push(cartGame)

  }

  
  testData.currency = 'TWD';
  testData.orderId = '1';
  testData.redirectUrls = {
    "confirmUrl": "https://localhost:7048/api/LinePay/confirm",
    "cancelUrl": "https://localhost:7048/api/LinePay/cancel"
  }

  console.log(testData)
}


const postLinePay = async () => {
  try {
    const data = {
      "amount": 1,
      "currency": "TWD",
      "orderId": "1",
      "packages": [
        {
          "id": "1",
          "amount": 1,
          "name": "POKEMON",
          "products": [
            {
              "name": "POKEMON",
              "quantity": 1,
              "price": 1
            }
          ]
        }
      ],
      "redirectUrls": {
        "confirmUrl": "https://localhost:7048/api/LinePay/confirm",
        "cancelUrl": "https://localhost:7048/api/LinePay/cancel"
      }
    };

    const res = await axios.post('https://localhost:7048/api/LinePay/Create', data);
    cartItem.value = res.data;

    // 檢查是否有 paymentUrl 屬性
    if (res.data.info && res.data.info.paymentUrl && res.data.info.paymentUrl.web) {
      const paymentUrl = res.data.info.paymentUrl.web;
      console.log("Payment URL:", paymentUrl);
      window.location.href = paymentUrl; // 將瀏覽器重定向到 LinePay 支付頁面
    } else {
      console.error("無法找到 paymentUrl 屬性或 paymentUrl.web 屬性。");
    }
  } catch (error) {
    console.error('調用 LINE PAY API 時出錯：', error);
  }
};

const postEcPay = async () => {
  try {
    const ecPayData = {
      "MerchantID": "3002607",
      "MerchantTradeNo": "a24e870b0f9f4c3c8c5b",
      "MerchantTradeDate": "2024/04/01 12:42:11",
      "PaymentType": "aio",
      "TotalAmount": "1",
      "TradeDesc": "無",
      "ItemName": "1",
      "ExpireDate": "3",
      "ReturnURL": "http://localhost:8889/api/ECPayPayments/PayInfo",
      "OrderResultURL": "http://localhost:8889/api/ECPayPayments/GetPayInfo",
      "ChoosePayment": "ALL",
      "PaymentInfoURL": "http://localhost:8889/api/ECPayPayments/AddAccountInfo",
      "EncryptType": "1",
      "ClientRedirectURL": "http://localhost:8888/Pay/milePurchaseTest",
      "CheckMacValue": "54FD269B4C4F7C335054DD79B409A7C43B18830AF95D417003BB33928AB2000F"
    };

    const res = await axios.get('https://localhost:7048/api/ECPayPayments/Index?TotalAmount=1&ItemName=1', ecPayData);
    cartItem.value = res.data;

    // 檢查是否有 paymentUrl 屬性
    if (res.data.info && res.data.info.paymentUrl && res.data.info.paymentUrl.web) {
      const paymentUrl = res.data.info.paymentUrl.web;
      console.log("Payment URL:", paymentUrl);
      window.location.href = paymentUrl; // 將瀏覽器重定向到 EcPay結帳頁面
    } else {
      console.error("無法找到 paymentUrl 屬性或 paymentUrl.web 屬性。");
    }
  } catch (error) {
    console.error('調用 LINE PAY API 時出錯：', error);
  }
};
</script>

<style scoped>
.checkout {
  padding: 10px 20px;
  background-color: green;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}
</style>