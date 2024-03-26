<template>
  <div class="modal-overlay">
    <div class="modal">
      <!-- <img class="check" src="~/assets/check-icon.png" alt="" /> -->
      <p>您的google帳號並沒有綁定帳號是否要註冊帳號</p>
      <button>是</button>
      <button>否</button>
    </div>
  </div>
</template>

<script>
  export default {
}
</script>

<style scoped>

.modal-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  background-color: #000000da;

}

.modal {
  text-align: center;
  background-color: white;
  height: 500px;
  width: 500px;
  border-radius: 20px;
  padding: 60px 0;
  position: fixed;
  top: 50%; /* 将顶部定位到视口中心 */
  left: 50%; /* 将左侧定位到视口中心 */
  transform: translate(-50%, -50%); /* 使用 transform 来实现水平和垂直居中 */
}
.close {
  margin: 10% 0 0 16px;
  cursor: pointer;
}

.close-img {
  width: 25px;
}

.check {
  width: 150px;
}

h6 {
  font-weight: 500;
  font-size: 28px;
  margin: 20px 0;
}

p {
  font-size: 16px;
  margin: 20px 0;
}

button {
  background-color: #ac003e;
  width: 150px;
  height: 40px;
  color: white;
  font-size: 14px;
  border-radius: 16px;
  margin-top: 50px;
}
</style>