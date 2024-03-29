import { VueCookieNext as $cookie } from 'vue-cookie-next'

export default defineNuxtRouteMiddleware((to, from) => {
    const isLoggedIn = $cookie.isCookieAvailable('isLoggedIn');
  
    if (isLoggedIn.value) {
        return router.push('/');
    }
  
    return router.push('/Login');
  })