<template>
    <div class="toast-container position-fixed bottom-0 end-0 p-3">
        <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
                <img src="/public/images/icons/cross-out.png" class="rounded me-2" alt="...">
                <strong class="me-auto">系統通知</strong>
                <small>{{ Time }}</small>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body text-bg-success">
                {{ message }}
            </div>
        </div>
    </div>
</template>

<script setup>
import startConnection from '@/data/signalR';
import axios from 'axios';

let Time = ref(new Date().toLocaleTimeString());
let message = ref('');
const connection = startConnection();
const toastLiveExample = document.getElementById('liveToast')

connection.on('userconnected', (connectionId) => {
    console.log(connectionId);
    message.value = `您的好友 ${connectionId.UserName} 上線`;
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
    toastBootstrap.show()
});

connection.on('userdisconnected', (connectionId) => {
    console.log(connectionId);
    message.value = `您的好友 ${connectionId.UserName} 離線`;
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
    toastBootstrap.show()
});



</script>

<!-- 样式引入，确保你的项目中已经引入了 Bootstrap 样式 -->
<style scoped>
.toast {
    position: relative;
    max-width: 350px;
}
</style>
