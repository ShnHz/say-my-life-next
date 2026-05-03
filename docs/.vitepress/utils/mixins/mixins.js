/*
 * Global component methods (legacy mixin shape — registered via app.mixin in theme)
 */
import dateMethods from './methods/dateMethods.js'

const mixins = {
  methods: {
    ...dateMethods,
  },
}

export default mixins
