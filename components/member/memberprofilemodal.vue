<template>
    <div class="modal-overlay">
      <div class="modal">
        <div style="display: flex; justify-content: flex-start; align-items: center; height: 10%; width: 100%;">
            <img src="../../public/images/icons/close32px.png" style="margin-left: auto; margin-top: 10px; margin-right: 10px;" @click="close" >
        </div>
           <h2 style="color:black">上傳頭像</h2>
        <div>
          
            <input type="file" accept="image/*">
          <!-- <button style="margin-right: 2px;">是</button>
          <button @click="close" style="margin-left: 2px;">否</button> -->
        </div>
        <div v-if="imageUrl" style="background-color: red;width:100%;">
             <img :src="imageUrl" alt="Uploaded Image" style="width: 290px;height:136px;">
         </div>
        <div>
            <button v-if="imageUrl">確定</button>
        </div>
      </div>
    </div>
  </template>
  

  <script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const emits = defineEmits(['closeModal']); // 定义 close modal 事件

const router = useRouter();

let imageUrl = ref(''); // 存储上传图片的URL

const close = async () => {
  emits('closeModal'); // 触发 close modal 事件
};


</script>
  
  <style scoped>
  
  .modal-overlay {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    /* display: flex; */
    /* justify-content: center; */
  
    background-color: #000000da;
    /* #000000da */
  }
  
  .modal {
    text-align: center;
    border-radius: 20px; 
    background-color: white;
    display: flex;
    height: 500px;
    width: 500px;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  
    flex-direction: column;
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