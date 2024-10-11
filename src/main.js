import Vue from 'vue';
import App from './App.vue';
import router from './router';
import { Form, FormItem, Input, Button, Icon, Progress, Message, MenuItem, Menu, DatePicker, Loading, Select, Option, Table, TableColumn, Pagination} from 'element-ui';
import './assets/css/index.less';

Vue.config.productionTip = false;
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Button);
Vue.use(Icon);
Vue.use(Progress);
Vue.use(MenuItem);
Vue.use(Menu);
Vue.use(DatePicker);
Vue.use(Loading);
Vue.use(Select);
Vue.use(Option);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Pagination);
Vue.prototype.$message = Message;

new Vue({
    render: (h) => h(App),
    router,
}).$mount('#app');
