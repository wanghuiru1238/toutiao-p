// 本地存储封装模块
export const getItem = name => {
  const data = window.localStorage.getItem(name)
  // 因为本地存储只能存字符串格式,所以在存储时会使用用JSON.stringfy()方法把数据转换成字符串格式
  // 所以在提取时要判断数据类型是否为JSON字符串格式,如果是 要把返回的数据使用JSON.parse()方法把数据转换成对象, 如果不是直接把数据返回
  try {
    return JSON.parse(data)
  } catch (err) {
    return data
  }
}

export const setItem = (name, value) => {
  // 如果value是对象 使用JSON.stringfy()方法把value转成JSON字符串再存储
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(name, value)
}

export const removeItem = name => {
  window.localStorage.removeItem(name)
}
