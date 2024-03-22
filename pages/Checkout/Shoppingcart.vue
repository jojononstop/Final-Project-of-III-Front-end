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
            <button @click="removeFromCart(item.id)">從購物車移除</button>
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
        ]
      };
    },
    methods: {
  removeFromCart(id: number) { // 将参数类型设置为 number
    const index = this.cartItems.findIndex(cartItem => cartItem.id === id);
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
  