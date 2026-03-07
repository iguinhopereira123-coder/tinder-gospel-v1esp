/**
 * Persistência e repasse de UTMs em todas as etapas.
 * Compatível com o script UTMify: captura UTMs da URL e repassa em links e botões.
 */

const STORAGE_KEY = 'utmify_query'

const UTM_PREFIX = 'utm_'

/**
 * Persiste os parâmetros UTM da URL atual no sessionStorage.
 * Chamar ao carregar a app ou quando a URL tiver UTMs.
 * @param {string} [search=window.location.search]
 */
export function persistUtmFromSearch(search = typeof window !== 'undefined' ? window.location.search : '') {
  if (typeof window === 'undefined') return
  const params = new URLSearchParams(search)
  const utmParams = new URLSearchParams()
  for (const [key, value] of params) {
    if (key.toLowerCase().startsWith(UTM_PREFIX) && value) utmParams.set(key, value)
  }
  if (utmParams.toString()) {
    sessionStorage.setItem(STORAGE_KEY, '?' + utmParams.toString())
  }
}

/**
 * Retorna a query string de UTMs armazenada (ex: "?utm_source=fb&utm_medium=cpc").
 * Usar em rotas internas: to={pathname + getUtmSearch()}
 */
export function getUtmSearch() {
  if (typeof window === 'undefined') return ''
  return sessionStorage.getItem(STORAGE_KEY) || ''
}

/**
 * Anexa UTMs a qualquer URL (interna ou externa).
 * Usar em links externos e em <a href>: appendUtmToUrl('https://hotm.io/xxx')
 */
export function appendUtmToUrl(url) {
  const q = getUtmSearch()
  if (!q) return url
  const separator = url.includes('?') ? '&' : '?'
  const queryWithoutQuestion = q.startsWith('?') ? q.slice(1) : q
  return queryWithoutQuestion ? `${url}${separator}${queryWithoutQuestion}` : url
}
