// pages/order/appraise/accomplish/accomplish.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  previewImage: function (e) {
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current,
      urls: [current]
    })
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options && options.idm){
      this.setData({
        idm: options.idm,

        // is: true
      })
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
  go:function(){
    console.log(2)
    // wx.navigateTo({
    //   url: "../../../order/order"
    // });
    console.log(this.data.idm)
    if (this.data.idm ==7){
      var pages = getCurrentPages()

      var beforePage = pages[pages.length - 2]

      //  beforePage.initial()

      wx.navigateBack({


        delta: 2,

      })
    }else{
      console.log(2)
      var pages = getCurrentPages()

      var beforePage = pages[pages.length - 2]

      //  beforePage.initial()

      wx.navigateBack({


        delta: 3,

      })
    }
     


    // var pages = getCurrentPages()

    // var beforePage = pages[pages.length - 2]

    // //  beforePage.initial()

    // wx.navigateBack({


    //   delta: 2,

    // })

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})