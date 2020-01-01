/**
 * Import vue store modules dynamically
 */
const requireModule = require.context('.', true, /\.js$/)
const modules = {}

requireModule.keys().forEach(fileName => {
  if (fileName === './index.js') return

  // Replace ./ and .js
  const path = fileName.replace(/(\.\/|\.js)/g, '')
  const [moduleName, imported] = path.split('/')

  if (!modules[moduleName]) {
    modules[moduleName] = {
      namespaced: true
    }
  }

  modules[moduleName][imported] = requireModule(fileName).default
})

/**
 * https://webpack.js.org/guides/dependency-management/
 */
const requireComponent = require.context(
  '@/components', true, /\.vue$/
)

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)

  // file example: "./admin/Users.vue"
  const componentName = upperFirst(fileName.replace(/[./]|vue/g, ''))

  Vue.component(componentName, componentConfig.default || componentConfig)
})