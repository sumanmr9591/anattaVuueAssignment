import Vue from 'vue';
import App from './App.vue';
import Router from 'vue-router';
import vuetify from './plugins/vuetify';
import Login from './components/Login.vue';
import Register from './components/Register.vue';
import Account from './components/Account.vue';
import Userview from './components/Userview.vue';

Vue.use(Router);
Vue.use(vuetify);
Vue.config.productionTip = false

const routes = [
  {path:'/', component: Login},
  {path:'/register', component: Register},
  {path:'/adminView', component: Account},
  {path:'/userView/:id', component: Userview},
  {
    path: '/index.html',
    redirect: '/' 
  }
];

const router = new Router({
  routes: routes,
  mode: 'history'
});

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
