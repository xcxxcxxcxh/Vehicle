// pages/movies/car/addCar/addCar.js
import Dialog from '../../../../dist/dialog/dialog';
const date = new Date()
const years = []
var app = getApp();
for (let i = 1990; i <= date.getFullYear(); i++) {
  years.push(i) 
}

years.reverse()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['卡罗拉', '亚洲龙'],
    years: years,
    vin:"",
    year:"",
    type:"",
    cardID:""
   // year: date.getFullYear(),
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {



    if (options.id){

    
    options.id=JSON.parse(options.id)
    console.log(options)
      this.data.type = options.id.carId;
      this.data.id = options.id.id;
      this.data.year = options.id.buyTime;
      this.data.vin = options.id.vinCode;
    console.log(this.data.year)

    this.setData({
      type: options.id.carName,
      carId: options.id.carId,
      year: options.id.buyTime,
      vin: options.id.vinCode,
      f:true
      // is: true
      })
    }
    this.getCarList()
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
  getCarList:function(){
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
          let ar=[]
          for (var i = 0; i < res.data.data.length;i++){
            if (res.data.data[i]['carName'] != '无意向车型'){
              ar.push(res.data.data[i]['carName'])
            }
           
          }
        //  ar.pop()
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
  back: function () {
    console.log(this.data.year.length)
    console.log(this.data.vin.length)
    console.log(this.data.carId)
    var that=this
    if (this.data.year.toString().length > 0 && this.data.vin.length > 0 && this.data.carId.toString().length > 0){
      var sessionId = wx.getStorageSync('sessionId')
      if(this.data.f){
        var url = app.globalData.base +
          "updateCarInfo?buyTime=" + this.data.year + "&vinCode=" + this.data.vin + "&carId=" + this.data.carId + "&id=" + this.data.id
      }else{
        var url = app.globalData.base +
          "addCarInfo?buyTime=" + this.data.year + "&vinCode=" + this.data.vin + "&carId=" + this.data.carId 
      } 
       // + "&userId=" + app.globalData.info.id
      wx.request({
        url: url,
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
          "Content-Type": "json",
          'Cookie': sessionId
        },
        success: function (res) {
          if (res.data.code == 200) {
            if (that.data.f) {
              Dialog.alert({
                message: '爱车信息修改成功'
              }).then(() => {
                // on close
                var pages = getCurrentPages()

                var beforePage = pages[pages.length - 2]

                beforePage.initial()

                wx.navigateBack({


                  delta: 1,

                })
              });
            }else{
              Dialog.alert({
                message: '爱车信息填写成功'
              }).then(() => {
                // on close
                var pages = getCurrentPages()

                var beforePage = pages[pages.length - 2]

                beforePage.initial()

                wx.navigateBack({


                  delta: 1,

                })
              });
            }



           

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
          // var pages = getCurrentPages()

          // var beforePage = pages[pages.length - 2]

          // beforePage.initial()
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
      message: '请填写爱车信息完整'
    }).then(() => {
      // on close
    });
  
    }

   
    // beforePage.setData({  // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。

    //   vin: this.data.vin



    // })

    // wx.navigateBack({


    //   delta: 1,

    // })
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
  bindPickerChangeYear: function (e) {

    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      year: this.data.years[e.detail.value],
      // is: true
    })



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