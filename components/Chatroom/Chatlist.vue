<template>
    <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling"
        aria-controls="offcanvasScrolling" @click="getUserFriends(); getFriendRequests();">好友列表</button>

    <div class="offcanvas offcanvas-start text-bg-dark" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1"
        id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasScrollingLabel">好友列表</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas"
                aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            <div class="row">
                <img v-if="avatarUrl != null" :src="avatarUrl" height="100px" class="col-4">
                <img v-else src="/public/images/avatar/152.png" height="100px" class="col-4">
                <div class="col-4">
                    <h5 class="p-1">{{ userName }}</h5>
                    <div class="status"> <i class="fa fa-circle online"></i> online </div>
                </div>
                <div class="col-2"></div>
                <div class="col-1 float-end">
                    <button type="button" data-bs-toggle="modal" data-bs-target="#addnewfriend"><i
                            class="fa fa-plus"></i></button>
                    <span></span>
                    <button v-if="friendRequests.length > 0" type="button" data-bs-toggle="modal"
                        data-bs-target="#friendrequset">
                        <span class="badge bg-danger">new</span> <!-- 顯示好友邀請數量 -->
                    </button>
                </div>
            </div>
            <div id="plist" class="people-list p-1">
                <div class="input-group">
                    <input type="text" class="form-control" placeholder="Search...">
                </div>
                <ul class="list-unstyled chat-list mt-2 mb-0">
                    <li class="clearfix" v-for="friend in friends" :key="friend.userId" data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop" @click="selectFriend(friend)">
                        <img v-if="friend.avatarUrl != null" :src="friend.avatarUrl" alt="avatar">
                        <img v-else src="/public/images/avatar/152.png" alt="avatar">
                        <div class="about">
                            <div class="name">{{ friend.userName }}</div>
                            <div class="status" v-if="friend.connectionId != null"> <i class="fa fa-circle online"></i>
                                在線
                            </div>
                            <div class="status" v-else> <i class="fa fa-circle offline"></i> 離線 </div>
                        </div>
                        <div class="small text-right row">
                            <div class="col-8">最後上線時間</div>
                            <p>{{ formattedLastLoginTime(friend.lastLoginTime) }}</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <chatroom-add-new-friend></chatroom-add-new-friend>
    <chatroom-friendrequest :firnedRequsets="friendRequests"
        @friendRequestAccepted="handleFriendRequestAccepted"></chatroom-friendrequest>
    <chatroom></chatroom>
</template>

<script setup>
import { VueCookieNext as $cookie } from 'vue-cookie-next';
import axios from 'axios';
import startConnection from '@/data/signalR';

let friends = ref([]);
const selectedFriend = ref([]);
let avatarUrl = ref('');
let userName = ref('');
const friendRequests = ref([]); // 假設有 3 個好友邀請

const connection = startConnection();
avatarUrl.value = $cookie.getCookie('avatarUrl');
userName.value = $cookie.getCookie('name');
let id;
id = $cookie.getCookie('Id');

async function getFriendRequests() {
    await axios.get(`https://localhost:7048/Chat/GetFriendRequests?memberId=${id}`
    ).then(res => {
        friendRequests.value = res.data;
    });
}

function handleFriendRequestAccepted() {
    getFriendRequests();
    getUserFriends();
}

const formattedLastLoginTime = (lastLoginTime) => {
    const date = new Date(lastLoginTime);
    return `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)} ${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}:${('0' + date.getSeconds()).slice(-2)}`;
};


async function getUserFriends() {
    await axios.get(`https://localhost:7048/Chat/GetUserFriends?id=${id}`
    ).then(res => {
        friends.value = res.data;
    });
}


const selectFriend = (friend) => {
    selectedFriend.value = friend;

};
provide('selectedFriend', selectedFriend);


onMounted(() => {

    setInterval(getFriendRequests, 2000); // 每5秒更新一次好友請求
    setInterval(getUserFriends, 2000); // 每5秒更新一次在線人數
});
</script>

<style scoped>
body {
    background-color: #f4f7f6;
    margin-top: 20px;
}

.card {
    background: black;
    transition: .5s;
    border: 0;
    margin-bottom: 30px;
    border-radius: .55rem;
    position: relative;
    width: 100%;
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 10%);
}

.chat-app .people-list {
    width: 280px;
    position: absolute;
    left: 0;
    top: 0;
    padding: 20px;
    z-index: 7
}

.chat-app .chat {
    margin-left: 280px;
    border-left: 1px solid #eaeaea
}

.people-list {
    -moz-transition: .5s;
    -o-transition: .5s;
    -webkit-transition: .5s;
    transition: .5s
}

.people-list .chat-list li {
    padding: 10px 15px;
    list-style: none;
    border-radius: 3px
}

.people-list .chat-list li:hover {
    background: #efefef;
    cursor: pointer
}

.people-list .chat-list li.active {
    background: #efefef
}

.people-list .chat-list li .name {
    font-size: 15px
}

.people-list .chat-list img {
    width: 45px;
    border-radius: 50%
}

.people-list img {
    float: left;
    border-radius: 50%
}

.people-list .about {
    float: left;
    padding-left: 8px
}

.people-list .status {
    color: #999;
    font-size: 13px
}

.chat .chat-header {
    padding: 15px 20px;
    border-bottom: 2px solid #f4f7f6
}

.chat .chat-header img {
    float: left;
    border-radius: 40px;
    width: 40px
}

.chat .chat-header .chat-about {
    float: left;
    padding-left: 10px
}

.chat .chat-history {
    padding: 20px;
    border-bottom: 2px solid #fff
}

.chat .chat-history ul {
    padding: 0
}

.chat .chat-history ul li {
    list-style: none;
    margin-bottom: 30px
}

.chat .chat-history ul li:last-child {
    margin-bottom: 0px
}

.chat .chat-history .message-data {
    margin-bottom: 15px
}

.chat .chat-history .message-data img {
    border-radius: 40px;
    width: 40px
}

.chat .chat-history .message-data-time {
    color: #434651;
    padding-left: 6px
}

.chat .chat-history .message {
    color: #444;
    padding: 18px 20px;
    line-height: 26px;
    font-size: 16px;
    border-radius: 7px;
    display: inline-block;
    position: relative
}

.chat .chat-history .message:after {
    bottom: 100%;
    left: 7%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-bottom-color: #fff;
    border-width: 10px;
    margin-left: -10px
}

.chat .chat-history .my-message {
    background: #efefef
}

.chat .chat-history .my-message:after {
    bottom: 100%;
    left: 30px;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-bottom-color: #efefef;
    border-width: 10px;
    margin-left: -10px
}

.chat .chat-history .other-message {
    background: #e8f1f3;
    text-align: right
}

.chat .chat-history .other-message:after {
    border-bottom-color: #e8f1f3;
    left: 93%
}

.chat .chat-message {
    padding: 20px
}

.online,
.offline,
.me {
    margin-right: 2px;
    font-size: 8px;
    vertical-align: middle
}

.online {
    color: #86c541
}

.offline {
    color: #e47297
}

.me {
    color: #1d8ecd
}

.float-right {
    float: right
}

.clearfix:after {
    visibility: hidden;
    display: block;
    font-size: 0;
    content: " ";
    clear: both;
    height: 0
}

@media only screen and (max-width: 767px) {
    .chat-app .people-list {
        height: 465px;
        width: 100%;
        overflow-x: auto;
        background: #fff;
        left: -400px;
        display: none
    }

    .chat-app .people-list.open {
        left: 0
    }

    .chat-app .chat {
        margin: 0
    }

    .chat-app .chat .chat-header {
        border-radius: 0.55rem 0.55rem 0 0
    }

    .chat-app .chat-history {
        height: 300px;
        overflow-x: auto
    }
}

@media only screen and (min-width: 768px) and (max-width: 992px) {
    .chat-app .chat-list {
        height: 650px;
        overflow-x: auto
    }

    .chat-app .chat-history {
        height: 600px;
        overflow-x: auto
    }
}

@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape) and (-webkit-min-device-pixel-ratio: 1) {
    .chat-app .chat-list {
        height: 480px;
        overflow-x: auto
    }

    .chat-app .chat-history {
        height: calc(100vh - 350px);
        overflow-x: auto
    }
}
</style>../../data/signalR