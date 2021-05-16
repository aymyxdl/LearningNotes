const baseUrl = 'http://122.51.199.176:9999/';

export default function wxRequest(method, url, data) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${baseUrl}${url}`,
      method,
      data,
      success: res => resolve(res),
      file: res => reject(res)
    })
  })
}