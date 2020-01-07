export default [
  /* Load i18n namespace with route
  {
    path: '/view2',
    name: 'view2',
    component: () => import('@/views/View2'),
    meta: {
      i18n: ['namespace2']
    }
  },
   */
  {
    path: '/components/base',
    name: 'BaseComponentsView',
    component: () => import('@/views/BaseComponentsView')
  },
  {
    path: '/components/fields',
    name: 'FieldComponentsView',
    component: () => import('@/views/FieldComponentsView')
  }
]
