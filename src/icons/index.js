import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon.vue'// svg组件

// 全局注册 register globally
Vue.component('svg-icon', SvgIcon)

// 自动加载 svg 图标
const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)