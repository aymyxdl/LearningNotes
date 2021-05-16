// pages/redirect/redirect.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg: '------',
    second: '====',
    localPath: '请选择位置'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
  },

  modify() {
    this.data.msg = '修改了';
    console.log(this.data);
    setTimeout(() => {

    })
  },

  modify2() {
    this.setData({
      second: this.data.msg + '你好啊'
    })
  },

  getUserInfo() {
    console.log('=========');
    // wx.openSetting({});
    wx.getUserInfo({
      success: (res) => {
        console.log('success', res);
      },
      fail: (res) => {
        console.log('fail', res);
      }
    })

    wx.getUserProfile({
      "desc": '测试',
      success: (res) => {
        console.log('success', res);
      },
      fail: (res) => {
        console.log('fail', res);
      }
    })
  },

  log(res) {
    console.log(res, '-------');
  },

  getLocal() {
    wx.getSetting({
      success: (res) => {
        console.log(res);
        if (!res.authSetting['scope.userLocation']) {
          // wx.openSetting({});
          console.log('----------');
          wx.authorize({
            scope: 'scope.userLocation',
            success () {
              // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
              // wx.startRecord()
              console.log('----------');
            },
            fail: (res) => {
              console.log('fail=======');
              wx.openSetting({});
              // 这里竟然没用
            }
          })
        }
      }
    });
    wx.chooseLocation({
      success: (res) => {
        console.log('success', res);
      },
      fail: (res) => {
        console.log('fail', res);
      }
    })
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