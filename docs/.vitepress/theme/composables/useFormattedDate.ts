/**
 * Date formatting relies on `Date.prototype.Format` from legacy dateMethods (loaded once).
 */
import '../../utils/mixins/methods/dateMethods.js'
import dateMethods from '../../utils/mixins/methods/dateMethods.js'

export function formatArticleDate(
  date: string | Date | undefined,
  fmt = 'yyyy-MM-dd'
) {
  return dateMethods.mixin_getDate(date as any, fmt)
}
