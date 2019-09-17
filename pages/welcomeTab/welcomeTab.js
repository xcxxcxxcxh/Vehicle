var postsData = require('../../data/posts-data.js')
import Dialog from '../../dist/dialog/dialog';
var app = getApp();
Page({
  data: {
    //小程序总是会读取data对象来做数据绑定，这个动作我们称为动作A
    // 而这个动作A的执行，是在onLoad函数执行之后发生的
    modalFlag:true
  },
    onTap: function (event) {
        // wx.navigateTo({
        //     url:"../posts/post"
        // });
        
        wx.switchTab({
            url: "../posts/post"
        });
        
    },
  modalOk:function(){
    this.setData({
      modalFlag: false
    })
    getApp().globalData.login=true
  },
  onLoad: function (options) {
    if (getApp().globalData.login){
      this.setData({
        modalFlag: false
      })
    }
    var that =this
    console.log(options)
    var postId = options.id;
    var phoneId = options.phoneId;
    this.data.currentPostId = postId;
    this.data.phoneId = phoneId;
    if (postId){
      console.log(222)
      wx.setStorage({
        key: "currentPostId",
        data: postId
      })
    }else{
      wx.getStorage({
        key: 'currentPostId',
        success(res) {
          that.data.currentPostId = res.data
          console.log(that.data.currentPostId)
        }
      })
    }
    if (phoneId) {
      console.log(222)
      wx.setStorage({
        key: "phoneId",
        data: phoneId
      })
    } else {
      wx.getStorage({
        key: 'phoneId',
        success(res) {
          that.data.phoneId = res.data
          console.log(that.data.phoneId)
        }
      })
    }
    console.log(this.data.currentPostId)
    this.setData({
      postList: postsData.postList
    });
    wx.getLocation()

    this.getAct()
    // this.data.postList = postsData.postList
   
  },

  getAct:function(){
    var url = app.globalData.base +
      "/cuPlan"
   // var sessionId = wx.getStorageSync('sessionId')
    var that = this;
    wx.request({
      url: url,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function (res) {
        console.log(res)
        if (res.data.code == 200) {
          that.setData({
            imgList: res.data.data,
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
        Dialog.alert({
          message: "当前网络异常，请您稍后再试。"
        }).then(() => {
          // on close
        });
      }
    })
  },
  preventTouchMove: function () { },
  onPostTap: function (event) {
    var postId = event.currentTarget.dataset.postid;
    // console.log("on post id is" + postId);
    wx.navigateTo({
      url: "post-detail/post-detail?id=" + postId
    })
  },

  onSwiperTap: function (event) {
    // target 和currentTarget
    // target指的是当前点击的组件 和currentTarget 指的是事件捕获的组件
    // target这里指的是image，而currentTarget指的是swiper
    var postId = JSON.stringify(event.target.dataset.postid);
    wx.navigateTo({
      url: "../posts/post-detail/post-detail?id=" + postId
    })
  },
  onLogin: function (event) {
    var that=this
    var postId = event.target.dataset.postid;
    console.log(postId)
    // target 和currentTarget
    // target指的是当前点击的组件 和currentTarget 指的是事件捕获的组件
    // target这里指的是image，而currentTarget指的是swiper
    wx.getSetting({
      success(res) {
        console.log(res.authSetting)
        console.log(that.data.currentPostId)
        if (((res.authSetting['scope.userInfo'] && that.data.currentPostId == 2) || that.data.phoneId == 2) && that.data.phoneId != 3) {
          if (postId==6){
            wx.switchTab({
              url: "../order/order",
              success: function (e) {
                var page = getCurrentPages().pop();
                if (page == undefined || page == null) return;
                page.onLoad();
              }
            });
          } else if (postId == 7){
            wx.switchTab({
              url: "../movies/movies",
              success: function (e) {
                var page = getCurrentPages().pop();
                if (page == undefined || page == null) return;
                page.onLoad();
              }
            });
          }
         
          console.log(4)
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
        
        }else{
          console.log(7)
          Dialog.confirm({
            title: '提示',
            message: '您还未登录,请登录后再进行相关操作!',
            confirmButtonText:'去登录',
            asyncClose: false
          })
            .then(() => {
              var postId = event.currentTarget.dataset.postid;
              wx.navigateTo({
                url: "../login/loginAuthorization/loginAuthorization?id=" + postId
              })
              Dialog.close();
              // setTimeout(() => {
              //   Dialog.close();
              // }, 1000);
            })
            .catch(() => {
              Dialog.close();
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
    },
    
    
    )
   
  }
})