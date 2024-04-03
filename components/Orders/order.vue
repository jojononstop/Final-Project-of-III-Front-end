<template>
  <div>
    <h1>訂單詳情</h1>
    <div>載入中...</div>
    <div>
      <div v-if="order">
        <p>訂單編號: </p>
        <p>總金額: </p>
      </div>
      <div>
        <p>未找到訂單</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { VueCookieNext as $cookie } from 'vue-cookie-next';
import axios from 'axios'

const route = useRoute();
let amount = 0;
let cartItems = ref([]);
let id;
async function getAmount() {
  id = $cookie.getCookie('Id')
  const response = await axios.get(`https://localhost:7048/api/CartItems/${id}`)

  cartItems.value = response.data;
  

  for (let item of cartItems.value) {
    
    let gameResponse = await axios.get(`https://localhost:7048/api/Games/${item.gameId}`);

    let game = gameResponse.data;
 
    if (game.discountPrice != 0) {
      amount += game.discountPrice;
   
    } else {
      amount += game.price;
   
    }
    
  }
}

onMounted(async () => {
  console.log(route.query.transactionId)
  if (route.query.transactionId != undefined) {
    await getAmount()
    let postData = {}
    postData.currency = "TWD"
    postData.amount = amount;
    console.log(cartItems.value)

    let response = await axios.post(`https://localhost:7048/api/LinePay/Confirm?transactionId=${route.query.transactionId}&orderId=${route.query.orderId}`,postData)
    if(response.data.returnCode == "0000"){
      for (let item of cartItems.value){
      let postData = {}
      postData.gameId = item.gameId
      postData.memberId = item.memberId 
      await axios.post('https://localhost:7048/api/Order',postData)
    }
      await axios.delete(`https://localhost:7048/api/CartItems/delete/${id}`)
    
    }
    
  }
})
</script>