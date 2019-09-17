// pages/login/loginAuthorization/loginAuthorization.js
import Dialog from '../../../dist/dialog/dialog';
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    motto: 'Hello World',
    userInfo: {},
    showModal: false,
    hasUserInfo: false,
    show:false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  viewAgree:function(){
    console.log('a')
    wx.navigateTo({
      url: "agree/agree"
    })
  },
  getPhoneNumber(e) {
    
    console.log(e.detail)
   
    if (e.detail.encryptedData){



      this.setData({
        phoneEncryptedData: e.detail.encryptedData,
        phoneIV: e.detail.iv
        //  hasUserInfo: true
      })
      var phoneUrl = app.globalData.base +
        "wxLogin?jsCode=" + this.data.jsCode + "&phoneEncryptedData=" + this.data.phoneEncryptedData + "&phoneIV=" + this.data.phoneIV + "&userEncryptedData=" + this.data.userEncryptedData + "&userIV=" + this.data.userIV 
      wx.request({
        url: phoneUrl,
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
          "Content-Type": "json"
        },
        success: function (res) {
        //  that.processDoubanData(res.data, settedKey, categoryTitle)
          // wx.navigateTo({
          //   url: "../../welcome/welcome?id=2"
          // });


          wx.setStorage({
            key: 'sessionId',
            data: 'SESSION=' + res.data.data.sessionId,
            success: function (res) {
              console.log(res)
            }
          })
          getApp().globalData.header.Cookie = 'JSESSIONID=' + res.data.data.sessionId;
          wx.reLaunch({
            url: "../../welcome/welcome?id=2&phoneId=4"
          });
        },
        fail: function (error) {
          Dialog.alert({
            message: "当前网络异常，请您稍后再试。"
          }).then(() => {
            // on close
          });
        }
      })
    }
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
  },
  getUserInfo: function (e) {
    var that=this
    console.log(e.detail)
    // this.setData({
    //   state: false,
    //   //  hasUserInfo: true
    // })
    if (e.detail.userInfo) {
      wx.getUserInfo({
        lang: 'zh_CN',
        success: function (res) {
          console.log(res)
          that.setData({
            showModal: true,
            userEncryptedData: res.encryptedData,
            userIV: res.iv
            //  hasUserInfo: true
          })
        }
      })
      console.log(e.detail.userInfo)
      if (true) {



        this.setData({
          showModal: true,
          userEncryptedData: e.detail.encryptedData,
          userIV : e.detail.iv
          //  hasUserInfo: true
        })
      }
      console.log('sass')
      if (true){

      
      wx.login({
        success(res) {
          if (res.code) {




            //发起网络请求
            that.setData({
              jsCode: res.code,
              //  hasUserInfo: true
            })
           
          } else {
            console.log('获取jscode失败' + res.errMsg)
          }
        }
        })
      }
      }

//     } else {
//       if (this.data.state){
//         // this.setData({
//         //   show: true,
//         //   //  hasUserInfo: true
//         // })
//         Dialog.alert({
//           title: '提示',
//           message: '请您确认是否手机号授权'
//         }).then(() => {
//           // Dialog.confirm({
//           //   title: '标题',
//           //   message: '此时模拟手机号授权弹出框'
//           // }).then(() => {
//           //   wx.navigateTo({
//           //     url: "../../welcome/welcome?id=2"
//           //   });
//           //   // on confirm
//           // }).catch(() => {
//           //   wx.navigateTo({
//           //     url: "../../welcome/welcome?id=3"
//           //   });
//           //   // on cancel
//           // });

// console.log(2)

//           this.setData({
//             showModal: true,
//             //  hasUserInfo: true
//           })
          
//         });
//       }else{
//         this.setData({
//           state: true,
//           //  hasUserInfo: true
//         })
//       }
     
//       console.log('xxxx')
//     }
//    // wx.getUserInfo()
//    // alert('a')
//     console.log(e)
//    // app.globalData.userInfo = e.detail.userInfo
//     this.setData({
//     //  userInfo: e.detail.userInfo,
//     //  hasUserInfo: true
//     })
  },
  goPhoneNumber:function(){
    wx.navigateTo({
      url: "loginByPhone/loginByPhone"
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  showDialogBtn: function () {
    this.setData({
      showModal: true
    })
  },
  /**
   * 弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function () {
  },
  /**
   * 隐藏模态对话框
   */
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function () {
    this.hideModal();
  },
  /**
   * 对话框确认按钮点击事件
   */
  onConfirm: function () {
    this.hideModal();
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})