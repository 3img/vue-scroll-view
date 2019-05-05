import Vue from 'vue'
import App from './App.vue'
import ScrollerView from './components/ScrollerView.vue'
import ScrollerViewItem from './components/ScrollerViewItem.vue'

Vue.config.productionTip = false

Vue.component('ScrollerView', ScrollerView)
Vue.component('ScrollerViewItem', ScrollerViewItem)

new Vue({
  render: h => h(App),
}).$mount('#app')