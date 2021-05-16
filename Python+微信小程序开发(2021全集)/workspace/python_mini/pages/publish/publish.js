// pages/publish/publish.js
import api from '../../config/api';

console.log(api, 'apiiiiiii');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgList: [],
    upList: [
      {id: 1, title: '图片1', percent: 20},
      {id: 2, title: '图片2', percent: 50},
      {id: 3, title: '图片3', percent: 70}
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    wx.hideShareMenu();
    const { getNews } = api;
    console.log(getNews);
    const res = await getNews({
      phone: '15000890154',
      code: '123456'
    })
    console.log(res, 'resssss');
  },

  update() {  
    
    
    // this.setData({
    //   upList[0].percent: 77
    // })

    // 所以可以使用统一修改
    // let upList = this.data.upList;
    // upList[0].percent = 77;
    // this.setData({
    //   upList
    // })

    let num1 = 1;
    let num2 = 2;
    this.setData({
      ['upList[0].percent']: 35,
      ['upList[' + num1 + '].percent']: 45,
      [`upList[${num2}].title`]: '????'
    })

  },

  reset() {
    let pages = getCurrentPages();
    pages[pages.length - 1].resetData();
    // 好吧，这个resetData 不是官方的，而是自定义的
    wx.navigateBack({})
  },

  resetData() {},

  uploadImg() {
    console.log('uploadImg');
    wx.chooseImage({
      success: (res) => {
        console.log('success', res);
        this.setData({
          imgList: res.tempFilePaths
        })
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
    console.log('监听用户下拉动作');
    // wx.startPullDownRefresh()
    setTimeout(() => {
      wx.stopPullDownRefresh()
    }, 500)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('页面上拉触底事件的处理函数');
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})