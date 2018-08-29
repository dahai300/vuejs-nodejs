import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/login',
      component: resolve => require(['@/components/login'], resolve)
    },
    {
      path:"/",
      component:resolve => require(['@/components/layout'], resolve),
      meta:{
        requireAuth:true
      },
      children:[
        {
          path:'',
          redirect:'/products'
        },
        {
          path:'users',
          component:resolve => require(['@/components/users/users'], resolve),
          meta:{
            requireAuth:true
          }
        },
        {
          path:'products',
          component:resolve => require(['@/components/products/products'], resolve),
          meta:{
            requireAuth:true
          }
        },
        {
          path:'addproduct',
          component:resolve => require(['@/components/products/add'], resolve),
          meta:{
            requireAuth:true
          }
        },
        {
          path:'news',
          component:resolve => require(['@/components/news/news'], resolve),
          meta:{
            requireAuth:true
          }
        },
        {
          path:'addnews',
          component:resolve => require(['@/components/news/add'], resolve),
          meta:{
            requireAuth:true
          }
        }
      ]
    }
  ]
})
