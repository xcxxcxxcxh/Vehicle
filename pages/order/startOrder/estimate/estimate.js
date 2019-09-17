// pages/order/startOrder/estimate/estimate.js
var app = getApp();
import Dialog from '../../../../dist/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    radio: '1',
    carList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
this.est()
    this.setData({
      name: app.globalData.info.realName,
      phone: app.globalData.info.phone,
      saName: app.globalData.info.saName,
      saPhone: app.globalData.info.saPhone,
      // is: true
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  est:function(){
    var url = app.globalData.base +
      "carList"
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
          res.data.data[0]['checked']=true
          that.setData({
            carList: res.data.data,
            type: res.data.data[0]['id'],
            // is: true
          })
          
          // Dialog.alert({
          //   message: '性别填写成功'
          // }).then(() => {
          //   // on close
          //   var pages = getCurrentPages()

          //   var beforePage = pages[pages.length - 2]

          //   beforePage.initial()

          //   wx.navigateBack({


          //     delta: 1,

          //   })
          // });

          // // wx.navigateTo({
          // //   url: "../../../welcome/welcome?phoneId=2"
          // // });
          // console.log(res.data.data)
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
 
  },
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail)


    this.setData({
      type: e.detail.value,
      // is: true
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  goEst: function () {
    if (this.data.type) {


      var url = app.globalData.baseOrder +
        "fawOrder/createOrder?orderType=1" + "&userCarMpId=" + this.data.type
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
            Dialog.alert({
              message: '评估发起成功'
            }).then(() => {
              // on close
              var pages = getCurrentPages()

              var beforePage = pages[pages.length - 2]

              //  beforePage.initial()

              wx.navigateBack({


                delta: 2,

              })
            });

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
    } else {
      Dialog.alert({
        message: '请选择意向车型'
      }).then(() => {
        // on close
      });
    }
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