// 在全局範圍內緩存認證狀態
import { useAuthStore } from '../store/logincookies'
// let isAuthenticated = false;
import { VueCookieNext as $cookie } from 'vue-cookie-next'
export default defineNuxtRouteMiddleware((to, from) => {
    const isAcvice=$cookie.isCookieAvailable('accountId');
    // const authStore = useAuthStore();
    // isAuthenticated = authStore.isAuthenticated;
    // 直接使用緩存的認證狀態
    console.log(isAcvice)
    if (isAcvice) {
        return navigateTo('/');
    }
    // isAuthenticated
    // 在需要時獲取並更新認證狀態

});

// import { useAuthStore } from '../store/logincookies'

// export default defineNuxtRouteMiddleware((to, from) => {
//     const authStore = useAuthStore()

//     // 直接从 Pinia store 中获取认证状态
//     const isAuthenticated = authStore.isAuthenticated
//     console.log(isAuthenticated)
//     console.log(authStore);
//     if (isAuthenticated) {
//         return navigateTo('/');
//     }

// })