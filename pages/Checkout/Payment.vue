<template>
  <div class="shopping-cart">
    <h1>購物車</h1>
    <div v-if="cartItems.length === 0">
      <p>購物車是空的</p>
    </div>
    <div v-else>
      <div v-for="item in cartItems" :key="item.id" class="cart-item">
        <img :src="item.image" :alt="item.name">
        <div class="item-details">
          <h2>{{ item.name }}</h2>
          <p>價格: ${{ item.price.toFixed(2) }}</p>
          <p>數量: {{ item.quantity }}</p>
          <button @click="removeFromCart(item)">從購物車移除</button>
        </div>
        <div class="payment-options">
      <button @click="selectedMethod = 'creditCard'">
        <img src="/Img/creit-card.png" alt="信用卡圖示" class="payment-icon"> <span class="payment-text">信用卡付款</span>
      </button>
      <button @click="selectedMethod = 'linePay'">
        <img src="/Img/linePay.png" alt="Line Pay 圖示" class="payment-icon"> <span class="payment-text">Line Pay 付款</span>
      </button>
    </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cartItems: [
        {
          id: 1,
          name: '商品1',
          price: 29.99,
          quantity: 1,
          image: '../Img/Test.jpg'
        },
        {
          id: 2,
          name: '商品2',
          price: 39.99,
          quantity: 2,
          image: '/Img/Test.jpg'
        }
      ],
      selectedMethod: '' // 存儲選擇的付款方式
    };
  },
  methods: {
    removeFromCart(item) {
      const index = this.cartItems.findIndex(cartItem => cartItem.id === item.id);
      if (index !== -1) {
        this.cartItems.splice(index, 1);
      }
    }
  }
};
</script>

<style scoped>
.shopping-cart {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.payment-options {
  margin-bottom: 20px;
}

.payment-options button {
  margin-right: 10px;
  padding: 5px 10px;
  display: flex;
  align-items: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
}

.payment-icon {
  width: 30px;
  height: 30px;
  margin-right: 5px;
}

.payment-text {
  color: white;
}

.cart-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.cart-item img {
  width: 100px;
  height: 100px;
  margin-right: 20px;
}

.item-details h2 {
  margin-bottom: 5px;
}

.item-details p {
  margin-bottom: 10px;
}

button {
  padding: 5px 10px;
  cursor: pointer;
}
</style>
