// pages/login/loginAuthorization/loginByPhone/loginByPhone.js
import Dialog from '../../../../dist/dialog/dialog';
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
sms:'', 
    loginable:false,
    disabled: false,
    time: 0,
    btntxt: "获取验证码",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var phoneUrl = app.globalData.base +
      "/verificationCode";
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
  onChange(event) {
    // event.detail 为当前输入的值
    this.setData({
      sms: event.detail
    });
    console.log(event.detail);
  },
  onChangeCode: function (event){
    var re = /^1\d{10}$/
    if (event.detail && re.test(this.data.sms)){
      console.log(111)
      this.setData({
        loginable: true,
        code: event.detail
      });
    }
  },
  send:function(){


    var re = /^1\d{10}$/
    if (re.test(this.data.sms)) {
      this.setData({
        time: 60,
        disabled:true
      });
      // this.data.time = 60;
      // this.data.disabled = true;
      this.timer();
      var phoneUrl = app.globalData.base +
        "verificationCode?phone=" + this.data.sms
      wx.request({
        url: phoneUrl,
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
          "Content-Type": "json"
        },
        success: function (res) {
          that.processDoubanData(res.data, settedKey, categoryTitle)
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
        message: '请输入正确的手机号码'
      }).then(() => {
        // on close
      });
    }
    console.log(11)
    console.log(this.data.sms)
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  timer:function() {
    console.log(111)
    if (this.data.time > 0) {
      this.data.time--;
      this.data.btntxt = this.data.time + "s后重新获取";
      this.setData({
        btntxt: this.data.time + "s后重新获取"
      });
      console.log(this.data.time)
      setTimeout(this.timer, 1000);
    } else {
      this.setData({
        btntxt: "获取验证码",
        disabled: false

      });
      this.data.time = 0;
      // this.data.btntxt = "获取验证码";
      // this.data.disabled = false;
    }
  },
  login:function(){
    var phoneUrl = app.globalData.base +
      "phoneLogin?vfCode=" + this.data.code +"&phone=" + this.data.sms
    wx.request({
      url: phoneUrl,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type": "json"
      },
      success: function (res) {
        console.log(res)
        if(res.data.code==200){
          wx.setStorage({
            key: 'sessionId',
            data: 'SESSION=' + res.data.data.sessionId,
            success: function (res) {
              console.log(res)
            }
          })
          getApp().globalData.header.Cookie = 'JSESSIONID=' + res.data.data.sessionId;
          wx.reLaunch({
            url: "../../../welcome/welcome?phoneId=2"
          });
        }else{
          Dialog.alert({
            message: res.data.message
          }).then(() => {
            // on close
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
    wx.navigateTo({
      url: "../../../posts/post"
    });
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