import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'newProject',
      component: require('@/components/Home/NewProject').default,
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});
