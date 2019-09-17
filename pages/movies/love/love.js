// pages/movies/love/love.js
import Dialog from '../../../dist/dialog/dialog';
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gd1List2: [

      { name: "读书", isChecked2: false },

      { name: "打球", isChecked2: false },

      

      { name: "唱歌", isChecked2: false },
      { name: "跳舞", isChecked2: false }, { name: "游戏", isChecked2: false }, { name: "种花", isChecked2: false }, { name: "旅游", isChecked2: false }, { name: "摄影", isChecked2: false }, { name: "其他", isChecked2: false },

    ],
    ar:[]
  },
  getDemo2: function (e) {

    if (false) {
      console.log(2)
    } else {
      var that = this

      var index = e.currentTarget.dataset.index;//每一个button的索引

      var item = that.data.gd1List2[index];//每一个索引对应的内容
     
      let res = this.data.gd1List2.filter(function (item, index, array) {
        //元素值，元素的索引，原数组。
        return (item.isChecked2 == true);
      });
      console.log(res)
    
      console.log(item)
      if (res.length > 4) {
        if (item.isChecked2) {
          item.isChecked2 = !item.isChecked2;
        } else {
          Dialog.alert({
            message: '最多选择5个爱好'
          }).then(() => {
            // on close
          });
        }
      } else {
        item.isChecked2 = !item.isChecked2;
        this.data.ar.push(item)
      }
      //选中，未选中 两种状态切换

      that.setData({//更新到data

        res: this.data.ar,

      });
      that.setData({//更新到data

        gd1List2: that.data.gd1List2,

      });
    }


  },
  love:function(){

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  love:function(){
    var st=[]
    for (var i = 0; i < this.data.res.length;i++){
      st.push(this.data.res[i].name)
    }
    console.log(st)
    st = Array.from(new Set(st))
    var url = app.globalData.base +
      "/hobbyUp?hobby=" + st.join(',')
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
            message: '爱好填写成功'
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