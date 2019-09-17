var app = getApp();
import Dialog from '../../../dist/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id,

      // is: true
    })
    this.getOrderDetial()

    console.log(options)

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  go: function (event) {
    var detail = event.currentTarget.dataset.detail;
    wx.navigateTo({
      url: "../appraise/appraise?id=" + detail.id
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  getOrderDetial: function () {
    var url = app.globalData.baseOrder +
      "fawOrder/detailById?orderId=" + this.data.id
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
          that.setData({
            orderDetial: res.data.data,
            // is: true
          })
          // let ar = []
          // for (var i = 0; i < res.data.data.length; i++) {
          //   ar.push(res.data.data[i]['carName'])
          // }
          // that.setData({
          //   array: ar,
          //   // is: true
          // })

          // that.setData({
          //   arr: res.data.data,
          //   // is: true
          // })

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