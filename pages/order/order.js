// pages/order/order.js
var app = getApp();
import Dialog from '../../dist/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList: [],
    f:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var getInfoUrl = app.globalData.base +
      "/findCUInfo";
  

    this.getInfoData(getInfoUrl);
    this.getOrderList()
  },
  onShow: function () {
    this.onLoad()
  },
  getInfoData: function (url) {
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
          if (res.data.data.realName && res.data.data.hasOwnProperty('gender')&& res.data.data.saName && res.data.data.carCount) {
            getApp().globalData.info = res.data.data
            that.setData({
              // name: res.data.data.realName,
              // saName: res.data.data.saName,
              // phone: res.data.data.phone,
              // sex: that.data.array[res.data.data.gender],
              // date: res.data.data.birthday,
              // love: res.data.data.hobby,
              // region: [res.data.data.city, res.data.data.city, res.data.data.address]

            })
          } else if (!(getApp().globalData.j) && res.data.data.saCheck == -1) {
            Dialog.alert({
              message: '请先完善您的个人信息请在“我的”中完善您的信息，再发起服务申请'
            }).then(() => {
              // on close
              wx.navigateTo({
                url: "../movies/movies",
               
              });
              getApp().globalData.j = true
            });
            getApp().globalData.info = res.data.data
            that.setData({
              // name: res.data.data.realName,
              // saName: res.data.data.saName,
              // phone: res.data.data.phone,
              // sex: that.data.array[res.data.data.gender],
              // date: res.data.data.birthday,
              // love: res.data.data.hobby,
              // carCount: res.data.data.carCount,
              // love: res.data.data.hobby,
              // background: res.data.data.avatarUrl,
              //  region: [res.data.data.city, res.data.data.city, res.data.data.address]
              //   region: [res.data.data.city, res.data.data.city, res.data.data.address]

            })
          } else {
            getApp().globalData.info = res.data.data
            that.setData({
              // name: res.data.data.realName,
              // saName: res.data.data.saName,
              // phone: res.data.data.phone,
              // sex: that.data.array[res.data.data.gender],
              // date: res.data.data.birthday,
              // love: res.data.data.hobby,
              // carCount: res.data.data.carCount,
              // love: res.data.data.hobby,
              // background: res.data.data.avatarUrl,
              //  region: [res.data.data.city, res.data.data.city, res.data.data.address]
              //   region: [res.data.data.city, res.data.data.city, res.data.data.address]

            })
          }


          getApp().globalData.j = true
          // wx.navigateTo({
          //   url: "../../../welcome/welcome?phoneId=2"
          // });
          console.log(res.data.data)
        } else {
             getApp().globalData.info = res.data.data
            that.setData({
              // name: res.data.data.realName,
              // saName: res.data.data.saName,
              // phone: res.data.data.phone,
              // sex: that.data.array[res.data.data.gender],
              // date: res.data.data.birthday,
              // love: res.data.data.hobby, 
              // carCount: res.data.data.carCount,
              // love: res.data.data.hobby,
              // background: res.data.data.avatarUrl,
            //  region: [res.data.data.city, res.data.data.city, res.data.data.address]
              //   region: [res.data.data.city, res.data.data.city, res.data.data.address]

            })
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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  goStart: function () {
    var url = app.globalData.base +
      "/findCUInfo";
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
          if (res.data.data.realName && res.data.data.hasOwnProperty('gender') && res.data.data.saName && res.data.data.carCount) {
            wx.navigateTo({
              url: "startOrder/startOrder"
            })
          } else if (res.data.data.realName && res.data.data.hasOwnProperty('gender')&& res.data.data.carCount&&res.data.data.saCheck == 0) {
            Dialog.alert({
              message: '请您在服务顾问通过绑定申请之后，再发起服务申请'
            }).then(() => {
              // on close
            });
          } else {
            Dialog.alert({
              message: '请先完善您的个人信息请在“我的”中完善您的信息，再发起服务申请'
            }).then(() => {
              // on close
            });
          } 


          getApp().globalData.j = true
          // wx.navigateTo({
          //   url: "../../../welcome/welcome?phoneId=2"
          // });
          console.log(res.data.data)
        } else {
          getApp().globalData.info = res.data.data
          that.setData({
            // name: res.data.data.realName,
            // saName: res.data.data.saName,
            // phone: res.data.data.phone,
            // sex: that.data.array[res.data.data.gender],
            // date: res.data.data.birthday,
            // love: res.data.data.hobby,
            // carCount: res.data.data.carCount,
            // love: res.data.data.hobby,
            // background: res.data.data.avatarUrl,
            //  region: [res.data.data.city, res.data.data.city, res.data.data.address]
            //   region: [res.data.data.city, res.data.data.city, res.data.data.address]

          })
        }
      },
      fail: function (error) {
        // fail
        console.log(error)
      }
    })
   
  },
  go:function(event){
    var detail = event.currentTarget.dataset.detail;
    wx.navigateTo({
      url: "../order/appraise/appraise?id=" + detail.id+'&idm=7'
    })
  },
  getOrderList: function () {
    var url = app.globalData.baseOrder +
      "fawOrder/cuOrders"
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
               orderList: res.data.data,
               f:true
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
            confirmButtonText: "重新登录",
            message: res.data.message
          }).then(() => {
            wx.navigateTo({
              url: "../login/loginAuthorization/loginAuthorization"
            })
          }).catch(() => {
            // on cancel
          });
        }
      },
      fail: function (error) {
        // fail
        console.log(error)
      }
    })
  },
  goDetail: function (event){
    var detail = event.currentTarget.dataset.detail;
    // console.log("on post id is" + postId);
    if (detail.orderType==1){
      wx.navigateTo({
        url: "usedCarOrderDetial/usedCarOrderDetial?id=" + detail.id
      })
    } else if (detail.orderType == 3) {
      wx.navigateTo({
        url: "repurchase/repurchase?id=" + detail.id
      })
    } else if (detail.orderType == 2) {
      wx.navigateTo({
        url: "replacementDetial/replacementDetial?id=" + detail.id
      })
    } else if (detail.orderType == 4) {
      wx.navigateTo({
        url: "introduceDetail/introduceDetail?id=" + detail.id
      })
    }
   
  },
  orderType:function(type){
    console.log(9)
    if (type==0){
      return '再购新车'
    } else if (type == 1){
      return '二手车评估'
    } else if (type == 2) {
      return '置换新车'
    } else if (type == 3) {
      return '转介绍'
    }else{
      return '无'
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  // onShow: function () {

  // },

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