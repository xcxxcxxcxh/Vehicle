// pages/movies/car/car.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cList: [

      // { type: "卡罗拉", time: '2017年', vin:'123456789112345678' },

      // { type: "卡罗拉1", time: '2017年', vin: '123456789112345678' }, { type: "卡罗拉2", time: '2017年', vin: '123456789112345678' },

    ],
  },
  initial:function(){
    //调接口
    var getInfoUrl = app.globalData.base +
      "/carList";
    this.getCarData(getInfoUrl)
  },
  getCarData: function (url) {
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
            cList: res.data.data
            // is: true
          })
          //this.cList = res.data.data
          // getApp().globalData.info = res.data.data
          // that.setData({
          //   name: res.data.data.realName,
          //   saName: res.data.data.saName,
          //   phone: res.data.data.phone,
          //   sex: that.data.array[res.data.data.gender],
          //   date: res.data.data.birthday,
          //   love: res.data.data.hobby,
          //   region: [res.data.data.city, res.data.data.city, res.data.data.address]

          // })

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

  onCancelImgTap: function (event) {
    this.setData({
      containerShow: true,
      searchPanelShow: false,
      searchResult: {}
    }
    )
  },

  onBindFocus: function (event) {
    this.setData({
      containerShow: false,
      searchPanelShow: true
    })
  },
back:function(event){
  console.log(event.currentTarget.dataset)
  var postId = JSON.stringify(event.currentTarget.dataset.postid);
  wx.navigateTo({
    url: "addCar/addCar?id=" + postId
  })
},
  addCar:function(){
    wx.navigateTo({
      url: "addCar/addCar"
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initial()
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