// pages/auth/auth.js

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '15000890154',
    code: '123456',
    countdown: false,
    countdownNum: 0,
    timer: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  bindPhoneInput(e) {
    this.setData({ phone: e.detail.value })
  },

  bindCodeInput(e) {
    this.setData({ code: e.detail.value })
  },

  countdownFunc(num) {
    // 两种方式倒计时，一种 setTimeout
    // console.log(num, this.timer);
    // if (num) {
    //   this.setData({
    //     countdownNum: num
    //   });
    //   this.timer = setTimeout(() => {
    //     this.countdownFunc(--num)
    //   }, 1000)
    // } else {
    //   this.setData({
    //     countdown: false
    //   })
    // }

    // 一种 setInterval
    let countdownNum = num;
    this.setData({ countdownNum })

    this.timer = setInterval(() => {
      countdownNum = --this.data.countdownNum;
      if (countdownNum) {
        this.setData({
          countdownNum
        })
      } else {
        clearInterval(this.timer);
        this.setData({ countdown: false })
      }
      // console.log(this.data.countdownNum);
    }, 1000)
  },

  onClickCheckCode() {
    let phone = this.data.phone;
    if(phone.length !== 11) {
      wx.showToast({ title: '请正确填写手机号码', icon: 'none' });
      return;
    }
    
    var reg = /^[1][3,4,5,7,8,9][0-9]{9}$/
    if (!reg.test(phone)) {
      wx.showToast({ title: '手机格式错误', icon: 'none' });
      return;
    }

    // 接口可以用，但是因为用的别人公司的接口，不好总发短信
    // wx.request({
    //   url: 'http://122.51.199.176:9999/v1/api/code/phone',
    //   data: {
    //     phone
    //   },
    //   method: 'POST',
    //   success: (result) => {
    //     // 这里还需要判断一下，因为可能是发送短信失败，但是接口访问成功
    //     // 根据返回结果判断一下是成功发送，还是发送失败
    //     // 成功的话，显示60s倒计时
    //     this.setData({
    //       countdown: true
    //     })
    //     this.countdownFunc(60);
    //   },
    // })
    this.setData({
      countdown: true
    })
    this.countdownFunc(60);
  },

  onClickLogin() {
    // 登录
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
        if (result.data.return_code === 'SUCCESS') {
          wx.showToast({ title: '登录成功', icon: 'none' })


          // app.globalData.phone = phone;
          // wx.setStorageSync('phone', phone);
          // 改进：封装一下
          app.setLoginInfi({phone, token: result.data.result.data.token, nickName: '用户', avatarUrl: '/static/images/icon/visituser_icon_show.png' });

          // 跳转的两种方式
          // let pages = getCurrentPages();
          // console.log(pages);
          // wx.navigateTo({
          //   url: '/' + pages[pages.length - 2].route,
          // })
          wx.navigateBack({
            delta: 1,
          })
        } else {
          wx.showToast({ title: '登录失败', icon: 'none' })
        }
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
    // 销毁定时器
    clearTimeout(this.timer);
    clearInterval(this.timer);
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