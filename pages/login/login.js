// pages/login/a.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
type:'ss'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var postId = options.id;
    this.data.currentPostId = postId;
    console.log(this.data.currentPostId)
    if (this.data.currentPostId=='6'){
      this.setData({
        type: '订单'
      });
      //this.data.type='订单'
    } else if (this.data.currentPostId == '7'){
      this.setData({
        type: '个人信息'
      });
      //this.data.type = '个人信息'
    }
  },
  onLoginAuthorization:function(){
    var postId = this.data.currentPostId;
    wx.navigateTo({
      url: "loginAuthorization/loginAuthorization?id=" + postId
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