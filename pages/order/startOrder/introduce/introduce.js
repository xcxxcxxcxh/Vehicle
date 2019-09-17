// pages/order/startOrder/introduce/introduce.js
var app = getApp();
import Dialog from '../../../../dist/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['卡罗拉', '亚洲龙'],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCarList()


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
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  bindPickerChange: function (e) {

    console.log('picker发送选择改变，携带值为', e.detail.value)
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

  getCarList: function () {
    var url = app.globalData.base +
      "carTypeList"
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
          let ar = []
          for (var i = 0; i < res.data.data.length; i++) {
            ar.push(res.data.data[i]['carName'])
          }
          that.setData({
            array: ar,
            // is: true
          })

          that.setData({
            arr: res.data.data,
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
   bindPickerChange: function (e) {
    console.log(this.data.arr)
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      type: this.data.arr[e.detail.value]['carName'],
      carId: this.data.arr[e.detail.value]['id'],
      // is: true
    })
    // this.setData({
    //   carId: this.data.array[e.detail.value]['id'],
    //   // is: true
    // })



  },
  goIntroduce: function () {
    if (this.data.type && this.data.name2 && this.data.phone2) {


      var url = app.globalData.baseOrder +
        "fawOrder/createOrder?orderType=4" + "&intentionCarId=" + this.data.carId + "&realName=" + this.data.name2 + "&phone=" + this.data.phone2
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
              message: '转介绍发起成功'
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
        message: '请补充信息完整'
      }).then(() => {
        // on close
      });
    }
  },
  onChange(event) {
    // event.detail 为当前输入的值
    this.setData({
      name2: event.detail
    });
    console.log(event.detail);
  },
  onChangePh(event) {
    // event.detail 为当前输入的值
    this.setData({
      phone2: event.detail
    });
    console.log(event.detail);
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