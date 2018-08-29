// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import store from './store'

import axios from 'axios'

Vue.use(ElementUI)

import '@/assets/css/index.styl'

Vue.config.productionTip = false

if(localStorage.getItem('token')){
  store.commit('LOGIN',{
    token:localStorage.getItem('token'),
    refreshToken:localStorage.getItem('refreshToken'),
    user:localStorage.getItem('user')
  })
}

router.beforeEach((to,from,next)=>{
  if(to.meta.requireAuth && store.state.token){
    if(window.localStorage.getItem('token')){
      next()
    }else{
      next({
        path:'/login',
        query:{redirect:to.fullPath}
      })
    }
  }else{
    next()
  }
  
})

axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    config.headers.Authorization=`Bearer ${store.state.token}`;
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
});


// http response 拦截器
axios.interceptors.response.use(
  response => {
      return response;
  },
  error => {
  	if(error.response.status===401){
      console.log(router.currentRoute.query.redirect)
      console.log(router);
      var query=router.currentRoute.query.redirect || '/';
  		router.replace({
  			path:'login',
  			query:{redirect:query}
  		})  
  	}
  	return Promise.reject(error.response.data);
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
