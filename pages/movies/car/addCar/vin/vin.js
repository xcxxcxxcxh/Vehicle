// pages/movies/name/name.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value:''
  },
  onChange(event) {
    // event.detail 为当前输入的值
    this.setData({
      vin: event.detail
    });
    console.log(event.detail);
  },
  back:function(){
    var pages = getCurrentPages() 

    var beforePage = pages[pages.length - 2]

    //beforePage.initial()
    beforePage.setData({  // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。

      vin: this.data.vin

  

    })

    wx.navigateBack({
    

      delta: 1,

    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  vin:function(){
    if (this.data.vin) {
      var pages = getCurrentPages()

      var beforePage = pages[pages.length - 2]

      //beforePage.initial()
      beforePage.setData({  // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。

        vin: this.data.vin



      })

      wx.navigateBack({


        delta: 1,

      })
    } else {
      Dialog.alert({
        message: '请输入经销商代码'
      }).then(() => {
        // on close
      });
    }
   // console.log(e)
  },
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})