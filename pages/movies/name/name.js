// pages/movies/name/name.js
import Dialog from '../../../dist/dialog/dialog';
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loginable: false,
  },
  back:function(){
    var pages = getCurrentPages() 

    var beforePage = pages[pages.length - 2]

    beforePage.initial()

    wx.navigateBack({
    

      delta: 1,

    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  commit:function(){
    var re = /[a-zA-Z]{1,24}|[\u4e00-\u9fa5]{1,12}/
    console.log(re.test(this.data.name))
    if (this.data.name && ((/^[a-zA-Z ]{1,24}$/.test(this.data.name)) || (/^[\u4e00-\u9fa5]{0,12}$/.test(this.data.name)))){
      var url = app.globalData.base +
        "/realNameUp?realName=" + this.data.name
      var sessionId = wx.getStorageSync('sessionId')
      var that = this;
      wx.request({
        url: url,
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
          "Content-Type": "json",
          'Cookie': sessionId
        },
        success: function (res) {
          console.log(res)
          if (res.data.code == 200) {
            var pages = getCurrentPages()

            var beforePage = pages[pages.length - 2]

            beforePage.initial()

            wx.navigateBack({


              delta: 1,

            })
            // Dialog.alert({
            //   message: '姓名填写成功'
            // }).then(() => {
            //   // on close
            //   var pages = getCurrentPages()

            //   var beforePage = pages[pages.length - 2]

            //   beforePage.initial()

            //   wx.navigateBack({


            //     delta: 1,

            //   })
            // });

            // wx.navigateTo({
            //   url: "../../../welcome/welcome?phoneId=2"
            // });
            console.log(res.data.data)
          } else {
            // Dialog.alert({
            //   message: res.data.message
            // }).then(() => {
            //   // on close
            // });
            Dialog.confirm({
              confirmButtonText: "确认",
              message: res.data.message
            }).then(() => {
              // wx.navigateTo({
              //   url: "../login/loginAuthorization/loginAuthorization"
              // })
            }).catch(() => {
              // on cancel
            });
          }
        },
        fail: function (error) {
          Dialog.alert({
            message: "当前网络异常，请您稍后再试。"
          }).then(() => {
            // on close
          });
        }
      })
    }else{
      Dialog.alert({
        message: '请输入正确的姓名'
      }).then(() => {
        // on close
      });
      // var url = app.globalData.base +
      //   "/api/findCUInfo";
     
    }
   
  },
  onChange(event) {
    // event.detail 为当前输入的值
    if (event.detail && ((/^[a-zA-Z ]{1,24}$/.test(this.data.name)) || (/^[\u4e00-\u9fa5]{1,12}$/.test(this.data.name)))) {
    this.setData({
        loginable: true,
      name: event.detail
    });}else{
      this.setData({
        loginable: false,
        name: event.detail
      })
    }
    console.log(event.detail);
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