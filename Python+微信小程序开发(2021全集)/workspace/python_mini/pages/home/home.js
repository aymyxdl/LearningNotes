// pages/home/home.js
const app = getApp();

console.log(app, 'appppppp');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: null,
    loginInfo: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onloadddddddd', app);
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
    // let {phone} = wx.getStorageSync('loginInfo');
    // this.setData({
    //   phone: app.globalData.loginInfo.phone
    //   // phone
    // })

    // 改成了使用 loginInfo 对象
    let loginInfo = app.globalData.loginInfo;
    this.setData({ loginInfo });
  },

  /**
   * 注销登录
   */
  logout() {
    app.globalData.loginInfo = null;
    wx.removeStorageSync('loginInfo');
    this.setData({
      loginInfo: null
    })
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