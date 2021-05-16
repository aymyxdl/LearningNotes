// component/tabbar/tabbar.js

const app = getApp();

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    selected: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    list: [
      {
        pagePath: "/pages/index/index",
        iconPath: "/images/icon_component.png",
        selectedIconPath: "/images/icon_component_HL.png",
        text: "首页"
      }, 
      {
        // 这里因为跳转到发布页是完整的页面，不用tabbar，所以不给路径
        // pagePath: "/pages/publish/publish",
        text: "发布"
      }, 
      {
        pagePath: "/pages/home/home",
        iconPath: "/images/icon_API.png",
        selectedIconPath: "/images/icon_API_HL.png",
        text: "我的"
      }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    switchTab(e) {
      console.log(app, 'globalData');
      const hasToken = app.globalData.loginInfo ? app.globalData.loginInfo.token : null;
      const url = e.currentTarget.dataset.path;
      console.log(e, '---------');
      if (url) {
        wx.switchTab({ url });
      } else {
        if (!hasToken) {
          console.log('我想跳转到发布页面，但是我没有登录，所以我要自动跳转到登录页面');
          wx.navigateTo({
            url: '/pages/auth/auth',
          });
        } else {
          wx.navigateTo({
            url: '/pages/publish/publish',
          })
        }
      }
    }
  }
})
