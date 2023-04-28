/*
 * @Author: sanghangning
 * @Date: 2019-12-11 10:46:35
 * @Last Modified by: sanghangning
 * @Last Modified time: 2023-04-28 09:56:41
 */

// directives
import directives from './directives/directives.js'
// methods
import dateMethods from './methods/dateMethods.js'
const mixins = {
  directives: {
    ...directives,
  },
  methods: {
    ...dateMethods,
  },
}
export default mixins
