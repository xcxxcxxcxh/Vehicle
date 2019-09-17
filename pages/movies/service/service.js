// pages/movies/service/service.js
import Dialog from '../../../dist/dialog/dialog';
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    serviceLists: [{ name: "卡罗拉", year: '2017年', phone: '12345678911' ,id:1},

      { name: "卡罗拉", year: '2017年', phone: '123456789',id:2 },],
    serviceList: [],
    code:'DIS10001112'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onSearch:function(e){
    console.log(this.data.code)
    if (this.data.code){
      var url = app.globalData.base +
        "/findSAbyCode?code=" + this.data.code
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
            that.setData({//更新到data

              serviceList: res.data.data

            });
           // that.data.serviceList = res.data.data
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
        message: '请输入经销商代码'
      }).then(() => {
        // on close
      });
    }
    console.log(e)
  },

  
  
  
  
  
  
  ch: function (event){
    this.setData({
      code: event.detail
    });
  },
  opServer:function(e){
    if (!this.data.server){
    if ( !this.data.is) {
      Dialog.alert({
        message: '服务顾问确认后，无法修改，请谨慎选择您的服务顾问。'
      }).then(() => {
        this.setData({
          is: true,
         // isCansle: true
        })
        // this.setData({
        //   isCansle: true
        // })
      });
    }else{
      var url = app.globalData.base +
        "choiceSa?id=" + e.currentTarget.dataset.id
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
              message: '顾问选择成功'
            }).then(() => {
              // on close
              var pages = getCurrentPages()

              var beforePage = pages[pages.length - 2]

              beforePage.initial()

              wx.navigateBack({


                delta: 1,

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
      
      // this.setData({
      //  // isCansle: true
      // }, () => {
      //   Dialog.alert({
      //     message: '您确认要选择该服务顾问'
      //   }).then(() => {
      //     var url = app.globalData.base +
      //       "choiceSa?id=" + e.currentTarget.dataset.id
      //     var sessionId = wx.getStorageSync('sessionId')
      //     var that = this;
      //     wx.request({
      //       url: url,
      //       method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      //       header: {
      //         "Content-Type": "json",
      //         'Cookie': sessionId
      //       },
      //       success: function (res) {
      //         console.log(res)
      //         if (res.data.code == 200) {
      //           Dialog.alert({
      //             message: '顾问选择成功'
      //           }).then(() => {
      //             // on close
      //             var pages = getCurrentPages()

      //             var beforePage = pages[pages.length - 2]

      //             beforePage.initial()

      //             wx.navigateBack({


      //               delta: 1,

      //             })
      //           });

      //           // wx.navigateTo({
      //           //   url: "../../../welcome/welcome?phoneId=2"
      //           // });
      //           console.log(res.data.data)
      //         } else {
      //           // Dialog.alert({
      //           //   message: res.data.message
      //           // }).then(() => {
      //           //   // on close
      //           // });
      //           Dialog.confirm({
      //             confirmButtonText: "确认",
      //             message: res.data.message
      //           }).then(() => {
      //             // wx.navigateTo({
      //             //   url: "../login/loginAuthorization/loginAuthorization"
      //             // })
      //           }).catch(() => {
      //             // on cancel
      //           });
      //         }
      //       },
      //       fail: function (error) {
      //         Dialog.alert({
      //           message: "当前网络异常，请您稍后再试。"
      //         }).then(() => {
      //           // on close
      //         });
      //       }
      //     })
      //     this.setData({
      //       server: e.currentTarget.dataset.id
      //     })
      //     // var pages = getCurrentPages()

      //     // var beforePage = pages[pages.length - 2]

      //     // //beforePage.initial()
      //     // beforePage.setData({  // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。

      //     //   id: this.data.server



      //     // })

      //     // wx.navigateBack({


      //     //   delta: 1,

      //     // })
      //   });
      // })
     
      }
    }
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