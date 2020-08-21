export function json2Form (json: any) {
  const arr = []
  for (let p in json) {
    // @ts-ignore
    arr.push(`${p}=${json[p]}`)
  }

  return arr.join('&')
}

export function isObject (obj) {
  return obj !== null && typeof obj == 'object'
}

export function isUndefined (value) {
  return value === void 0
}

export function isBoolean (value) {
  return typeof value == 'boolean'
}

export function isString (value) {
  return typeof value == 'string'
}

export function isFunction (obj) {
  return typeof obj == 'function'
}

export function compare (property) {
  return function (a, b) {
    return (a[property] - b[property])
  }
}

export function pxTransform (size: number): string {
  if (!size) return ''
  const designWidth = 750
  const deviceRatio = {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2
  }
  return `${size / deviceRatio[designWidth]}rpx`
}


export const objectToString = (style: object | string): string => {
  if (style && typeof style === 'object') {
    let styleStr = ''
    Object.keys(style).forEach(key => {
      const lowerCaseKey = key.replace(/([A-Z])/g, '-$1').toLowerCase()
      styleStr += `${lowerCaseKey}:${style[key]};`
    })
    return styleStr
  } else if (style) {
    return style
  }
  return ''
}
