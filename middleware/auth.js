import {useCookie} from "#app";
import {getAuth} from "firebase/auth";
export default defineNuxtRouteMiddleware(async (to) => {
                const auth = getAuth();
            if (process.server){
                const cookie =  useCookie('session')
                const data = await $fetch('http://localhost:3000/api/checkauthstatus',{
                    method: 'POST',
                    body: JSON.stringify({sessionCookie: cookie.value}),
                })
                if (data?.statusCode === 401 && !to.path.startsWith('/login')){
                    return  navigateTo('/login')
                }
                if (data?.statusCode === 200 && to.path.startsWith('/login')){
                    return  navigateTo('/')
                }
            }

})

