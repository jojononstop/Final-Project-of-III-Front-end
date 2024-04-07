<template>
  <div>
    <!-- <button class="checkout" @click="">test1</button>
    <button class="checkout" @click="">test2</button> -->
    <!-- <button class="checkout" @click="getLinePayData">getLinePayData</button> -->
    <button class="checkout" @click="postLinePay">LinePay結帳</button>
    <!-- <button class="checkout" @click="postEcPay">EcPay結帳</button> -->
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { VueCookieNext as $cookie } from 'vue-cookie-next';
let orderId = ref('');
let amount = 0;
let cartGames = ref([]);



async function getLinePayData() {
  let id = $cookie.getCookie('Id')
  
  let cartItems = ref(null);

  let cartData = {};

  const response = await axios.get(`https://localhost:7048/api/CartItems/${id}`)
 
  cartItems.value = response.data;

  cartData.amount = 0;
  cartData.currency = 'TWD';
  orderId = cartItems.value[0].id.toString();
  cartData.orderId = orderId;
  cartData.packages = [];

  let packageData = {};

  packageData.id = '1';
  packageData.amount = 0;
  packageData.name = "test";
  packageData.products = [];

  for (let item of cartItems.value) { 
    // 发送另一个axios请求
    let gameResponse = await axios.get(`https://localhost:7048/api/Games/${item.gameId}`);
    cartGames.value.push(gameResponse.data);
    let game = gameResponse.data;
    
    let cartGame = {};
    cartGame.name = game.name;
    cartGame.quantity = 1;
    
    if(game.discountPrice != 0){
      amount += game.discountPrice;
      cartData.amount += game.discountPrice;
      packageData.amount += game.discountPrice;
      cartGame.price = game.discountPrice;
    }else{
      amount += game.price;
      cartData.amount += game.price;
      packageData.amount += game.price;
      cartGame.price = game.price;
    }
    
    packageData.products.push(cartGame)
  }
  
  cartData.redirectUrls = {
    "confirmUrl":`http://localhost:3000/checkout/cart`,//付款完成之後就會跳轉至confirmUrl
    "cancelUrl":"https://localhost:7048/api/LinePay/Cancel"
  }
  // axios.post('https://localhost:7048/api/Order',)
  
  cartData.packages.push(packageData)

  // console.log(amount)
  //  console.log(JSON.stringify(cartData))

  return cartData
}

const postLinePay = async () => {
  try {
    let cartItem = ref(null);

    const data = await getLinePayData();
    console.log(data)
    
    const res = await axios.post('https://localhost:7048/api/LinePay/Create', data);
    
    cartItem.value = res.data;

    console.log(cartItem.value.info.transactionId)
    console.log(orderId)
    console.log(amount)

    // 檢查是否有 paymentUrl 屬性
    if (res.data.info && res.data.info.paymentUrl && res.data.info.paymentUrl.web) {

      const paymentUrl = res.data.info.paymentUrl.web;
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
    console.log(res)
    // 檢查是否有 paymentUrl 屬性
    if (res.data.info && res.data.info.paymentUrl && res.data.info.paymentUrl.web) {
      const paymentUrl = res.data.info.paymentUrl.web;
      console.log("Payment URL:", paymentUrl);
      window.location.href = paymentUrl; // 將瀏覽器重定向到 EcPay結帳頁面
    } else {
      console.error("無法找到 paymentUrl 屬性或 paymentUrl.web 屬性。");
    }
  } catch (error) {
    console.error('調用 ECPAY API 時出錯：', error);
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