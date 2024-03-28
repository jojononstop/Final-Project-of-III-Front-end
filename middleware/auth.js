// 在全局範圍內緩存認證狀態
//import { useAuthStore } from '../store/logincookies'
// let isAuthenticated = false;
import { VueCookieNext as $cookie } from 'vue-cookie-next'
export default defineNuxtRouteMiddleware((to, from) => {
    if (process.client) {
    const isAcvice=$cookie.isCookieAvailable('accountId');
    console.log(isAcvice)
    if (isAcvice) {
        return navigateTo('/');
    }
   }
});

