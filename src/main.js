import Vue from 'vue';
import App from './App.vue';
import router from './router';
import { Form, FormItem, Input, Button, Icon, Progress, Message } from 'element-ui';
import './assets/css/index.less';

Vue.config.productionTip = false;
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Button);
Vue.use(Icon);
Vue.use(Progress);
Vue.prototype.$message = Message;

new Vue({
    render: (h) => h(App),
    router,
}).$mount('#app');