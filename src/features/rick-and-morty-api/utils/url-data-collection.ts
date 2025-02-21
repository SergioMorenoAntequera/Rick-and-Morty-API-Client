
export function extractParam(url: string, param: string) {
  if(!url.includes(`${param}=`)) return ''
  return url.substring(url.indexOf(`${param}=`) + param.length + 1)
}

export function extractPageNumber(url: string) {
  return parseInt(extractParam(url, 'page'))
}

export function extractId(url: string) {
  return parseInt(url.substring(url.lastIndexOf("/") + 1))
}
