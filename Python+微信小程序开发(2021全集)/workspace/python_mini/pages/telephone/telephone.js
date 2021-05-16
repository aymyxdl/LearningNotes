// pages/telephone/telephone.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    code: ''
  },

  bindPhone(e) {
    this.setData({
      phone: e.detail.value
    })
  },

  bindCode(e) {
    this.setData({
      code: e.detail.value
    })
  },

  /**
   * 登录
   */
  login() {
    console.log(this.data.phone, this.data.code);

    let phone = this.data.phone;
    let code = this.data.code;

    wx.request({
      url: 'http://122.51.199.176:9999/v1/api/login/phone',
      data: {
        phone, code
      },
      method: 'POST',
      success: (result) => {
        console.log(result, 'succccccc');
        wx.showToast({
          title: '成功了',
        })
      },
      fail: (res) => {
        console.log(res, 'faiiiiiiiiii');
        wx.showToast({
          title: '失败了',
        })
      }
    })
  },

  /**
   * 进行数字校验
   */

  checkNumber (theObj) {
    // var reg = /^[0-9]+.?[0-9]*$/;
    var reg = /^[1][3,4,5,7,8,9][0-9]{9}$/
    if (reg.test(theObj)) {
      return true;
    }
    return false;
  },

  /**
   * 发送短信验证码信息
   */
  getMessageCode() {
    // 进行输入判断，因为不合法，没必要发送信息
    let phone = this.data.phone;
    if(phone.length !== 11 || !this.checkNumber(phone)) {
      wx.showToast({
        title: '输入错误',
        icon: 'none'  // 或者自定义图片
      });
      return;
    }
    
    wx.request({
      url: 'http://122.51.199.176:9999/v1/api/code/phone',
      data: {
        phone
      },
      method: 'POST',
      success: (result) => {
        console.log(result, 'succccccc');
        wx.showToast({
          title: '成功了',
        })
      },
      fail: (res) => {
        console.log(res, 'faiiiiiiiiii');
        wx.showToast({
          title: '失败了',
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})