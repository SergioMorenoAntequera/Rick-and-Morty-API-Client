import { NextRouter } from "next/router"

export function extractParam(paramContainer: string | NextRouter, param: string) {
  
  let url = ''
  if(typeof paramContainer === 'object') {
    url = paramContainer.asPath
  }
  if(typeof paramContainer === 'string') {
    url = paramContainer
  }

  if(!url.includes(`${param}=`)) return ''

  const paramsFromSelected = url.substring(url.indexOf(`${param}=`) + param.length + 1)
  const nextParamIndex = paramsFromSelected.indexOf('&')

  return nextParamIndex !== -1 ? paramsFromSelected.substring(0, nextParamIndex) : paramsFromSelected
}

export function extractPageNumber(url: string) {
  return parseInt(extractParam(url, 'page'))
}

export function extractId(url: string) {
  return parseInt(url.substring(url.lastIndexOf("/") + 1))
}
