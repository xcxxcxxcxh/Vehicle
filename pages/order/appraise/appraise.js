// pages/order/appraise/appraise.js
var app = getApp();
import Dialog from '../../../dist/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rate: 0,
   
      ico_index1: '1',
      ico_index2: '1',
      ico_index3: '1',
    ico_index4: '1',
    ico_index5: '1',
    ico_index6: '1',
    ico_index7: '1',
    ico_index8: '1',
    ico_index9: '1',
    ico_index11: '1',
    ico_index21: '1',
    ico_index31: '1',
      face_type: '5',
    arr:[],
    arr2: [],
    

    arr3: [],
    
  },
  handleChange: function (e) {
    this.setData({
      rate: e.detail.value,
      arr: [{
        "orderId": this.data.serverlist[0].orderId,
        "result": e.detail.value,
        "type": 2,
        "distributorId": this.data.distributor.id
      }]
    })
    console.log(this.data.arr2.concat(this.data.arr).length)
    // this.data.arr.push({
    //   "orderId": this.data.serverlist[0].orderId,
    //   "result": e.detail.value,
    //   "type": 2,
    //   "distributorId": this.data.distributor.id
    // })
    if (this.data.arr2.concat(this.data.arr).length == (Number(this.data.serverlist.length) + Number(1))) {
      var c = 0
      var arr22 = this.data.arr2.concat(this.data.arr)
      for (var i = 0; i < arr22.length; i++) {
        if (typeof arr22[i] != "object") {
          c++
        }
      }
      if (c == 0) {
        this.setData({
          loginable: true
        })
      }
    }
  },
  change_color: function (e) {
    
    console.log(e)
    var id = e.currentTarget.dataset.id;   
    var c = e.currentTarget.dataset.c;      //获取当前点击的是哪一个图片   通过wxml中data-id 来判断的
    console.log(c)
    var server = e.currentTarget.dataset.server; 
    this.setData({
      serverId:server.id,
      c:c
    })
    if (c==0&&this.data.ico_index10 ){

   
       this.setData({
        ico_index10: this.data.ico_index10,
        ico_index20: this.data.ico_index20,
        ico_index30: this.data.ico_index30,
   
        face_type: '1'
      })
    }
    if (c == 1 &&this.data.ico_index21) {


      this.setData({
       
        ico_index11: this.data.ico_index11,
        ico_index21: this.data.ico_index21,
        ico_index31: this.data.ico_index31,
        face_type: '1'
      })
    }
    console.log(server)
    this.data.arr2[c] = {
      "orderId": server.orderId,
      "result": Number(id),
      "type": 1,
      "userId": server.toUserId
    }
//     if (this.data.arr.indexOf(server.orderId)<0){

//       this.data.arr2[id] = {
//         "orderId": server.orderId,
//         "result": Number(id),
//         "type": 1,
//         "userId": server.id
//       }
//     //  this.data.arr.push(server.orderId)
// //       this.data.arr2.push({
// //         "orderId": server.orderId,
// // "result": Number(id),
// // "type": 1,
// //         "userId": server.id
// // },)
//     }
    
    console.log(id);
    // this.setData({
    //   arr: '2',
     
    // })
    if(c==0){
      if (id == 1) {                          //如果此时点击的是第1张图片  第1张图片变成2.png， 则其他图片变成1.png ,且此时评分变为1   后面以此类推
        this.setData({
          ico_index10: '1',
          ico_index20: '1',
          ico_index30: '1',
          face_type: '1'
        })
       

      }
      if (id == 2) {
        
        this.setData({
          ico_index10: '1',
          ico_index20: '2',
          ico_index30: '1',
          face_type: '3'
        })
     


      }
      if (id == 3) {
       
        this.setData({
          ico_index10: '1',
          ico_index20: '1',
          ico_index30: '2',
          face_type: '5'                     //wxml中直接通过{{face_type}}模板语言来使用
        })
       
      }
    }
    if (c == 1) {
      if (id == 1) {                          //如果此时点击的是第1张图片  第1张图片变成2.png， 则其他图片变成1.png ,且此时评分变为1   后面以此类推
      
        this.setData({
          ico_index11: '2',
          ico_index21: '1',
          ico_index31: '1',
          face_type: '1'
        })

      }
      if (id == 2) {
        
        this.setData({
          ico_index11: '1',
          ico_index21: '2',
          ico_index31: '1',
          face_type: '3'
        })


      }
      if (id == 3) {
       
        this.setData({
          ico_index11: '1',
          ico_index21: '1',
          ico_index31: '2',
          face_type: '5'                     //wxml中直接通过{{face_type}}模板语言来使用
        })
      }
    }
    if(c==0){

    
    if (id == 1) {                          //如果此时点击的是第1张图片  第1张图片变成2.png， 则其他图片变成1.png ,且此时评分变为1   后面以此类推
      this.setData({
        ico_index1: '2',
        ico_index2: '1',
        ico_index3: '1',
        face_type: '1'
      })


    }
    if (id == 2) {

      this.setData({
        ico_index1: '1',
        ico_index2: '2',
        ico_index3: '1',
        face_type: '3'
      })



    }
    if (id == 3) {

      this.setData({
        ico_index1: '1',
        ico_index2: '1',
        ico_index3: '2',
        face_type: '5'                     //wxml中直接通过{{face_type}}模板语言来使用
      })

      }
    }
    if (c == 1) {


      if (id == 1) {                          //如果此时点击的是第1张图片  第1张图片变成2.png， 则其他图片变成1.png ,且此时评分变为1   后面以此类推
        this.setData({
          ico_index4: '2',
          ico_index5: '1',
          ico_index6: '1',
          face_type: '1'
        })


      }
      if (id == 2) {

        this.setData({
          ico_index4: '1',
          ico_index5: '2',
          ico_index6: '1',
          face_type: '3'
        })



      }
      if (id == 3) {

        this.setData({
          ico_index4: '1',
          ico_index5: '1',
          ico_index6: '2',
          face_type: '5'                     //wxml中直接通过{{face_type}}模板语言来使用
        })

      }
    }
    if (c == 2) {


      if (id == 1) {                          //如果此时点击的是第1张图片  第1张图片变成2.png， 则其他图片变成1.png ,且此时评分变为1   后面以此类推
        this.setData({
          ico_index7: '2',
          ico_index8: '1',
          ico_index9: '1',
          face_type: '1'
        })


      }
      if (id == 2) {

        this.setData({
          ico_index7: '1',
          ico_index8: '2',
          ico_index9: '1',
          face_type: '3'
        })



      }
      if (id == 3) {

        this.setData({
          ico_index7: '1',
          ico_index8: '1',
          ico_index9: '2',
          face_type: '5'                     //wxml中直接通过{{face_type}}模板语言来使用
        })

      }
    }
    console.log(this.data.arr2.concat(this.data.arr).length)
    console.log(this.data.arr2)
    console.log(this.data.arr)
    if (this.data.arr2.concat(this.data.arr).length == (Number(this.data.serverlist.length) + Number(1))) {
      var c=0
      var arr22 = this.data.arr2.concat(this.data.arr)
      for (var i = 0; i < arr22.length;i++){
        if (typeof arr22[i] != "object"){
c++
        }
      }
      if(c==0){
        this.setData({
          loginable: true
        })
      }
      
    }
  },
  change_color1: function (e) {
    var id = e.currentTarget.dataset.id;      //获取当前点击的是哪一个图片   通过wxml中data-id 来判断的
    var server = e.currentTarget.dataset.server; 
    console.log(id);
    if (id == 1) {                          //如果此时点击的是第1张图片  第1张图片变成2.png， 则其他图片变成1.png ,且此时评分变为1   后面以此类推
      this.setData({
        ico_index10: '2',
        ico_index20: '1',
        ico_index30: '1',
        face_type: '1'
      })

    }
    if (id == 2) {
      this.setData({
        ico_index10: '1',
        ico_index20: '2',
        ico_index30: '1',
        face_type: '3'
      })


    }
    if (id == 3) {
      this.setData({
        ico_index10: '1',
        ico_index20: '1',
        ico_index30: '2',
        face_type: '5'                     //wxml中直接通过{{face_type}}模板语言来使用
      })
    }
    if (c == 1) {
      if (id == 1) {                          //如果此时点击的是第1张图片  第1张图片变成2.png， 则其他图片变成1.png ,且此时评分变为1   后面以此类推
       
       
        this.setData({
          ico_index11: '2',
          ico_index21: '1',
          ico_index31: '1',
          face_type: '1'
        })

      }
      if (id == 2) {
       
        this.setData({
          ico_index11: '1',
          ico_index21: '2',
          ico_index31: '1',
          face_type: '3'
        })


      }
      if (id == 3) {
      
        this.setData({
          ico_index11: '1',
          ico_index21: '1',
          ico_index31: '2',
          face_type: '5'                     //wxml中直接通过{{face_type}}模板语言来使用
        })
      }
    }
    if (id == 1) {                          //如果此时点击的是第1张图片  第1张图片变成2.png， 则其他图片变成1.png ,且此时评分变为1   后面以此类推
      this.setData({
        ico_index1: '1',
        ico_index2: '1',
        ico_index3: '1',
        face_type: '1'
      })


    }
    if (id == 2) {

      this.setData({
        ico_index1: '1',
        ico_index2: '2',
        ico_index3: '1',
        face_type: '3'
      })



    }
    if (id == 3) {

      this.setData({
        ico_index1: '1',
        ico_index2: '1',
        ico_index3: '2',
        face_type: '5'                     //wxml中直接通过{{face_type}}模板语言来使用
      })

    }

  },
  change_color1: function (e) {
    var id = e.currentTarget.dataset.id;      //获取当前点击的是哪一个图片   通过wxml中data-id 来判断的
    var server = e.currentTarget.dataset.server;
    console.log(id);
    if (id == 1) {                          //如果此时点击的是第1张图片  第1张图片变成2.png， 则其他图片变成1.png ,且此时评分变为1   后面以此类推
      this.setData({
        ico_index1: '2',
        ico_index2: '1',
        ico_index3: '1',
        face_type: '1'
      })

    }
    if (id == 2) {
      this.setData({
        ico_index1: '1',
        ico_index2: '2',
        ico_index3: '1',
        face_type: '3'
      })


    }
    if (id == 3) {
      this.setData({
        ico_index1: '1',
        ico_index2: '1',
        ico_index3: '2',
        face_type: '5'                     //wxml中直接通过{{face_type}}模板语言来使用
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id,
      arr:[],
      arr2:[]

      // is: true
    })
    if (options && options.idm) {
      this.setData({
        idm: options.idm,

        // is: true
      })
    }
    this.getOrderSa()
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
  goStart:function(){
   
    var url = app.globalData.baseOrder +
      "fawOrderEvaluation/evaluation"
    var sessionId = wx.getStorageSync('sessionId')
    var that = this;
    wx.request({
      url: url,
      dataType: 'STRING',
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT,
      data: { evaluations: JSON.stringify(this.data.arr2.concat(this.data.arr))},
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'  ,
        'Cookie': sessionId
      },
      success: function (res) {
        console.log(res)
        if (JSON.parse(res.data).code == 200) {
          wx.navigateTo({
            url: "aaccomplish/accomplish?idm=" + that.data.idm
          })
        } else {
          // Dialog.alert({
          //   message: res.data.message
          // }).then(() => {
          //   // on close
          // });
          console.log(JSON.parse(res.data).message)
          Dialog.alert({
            message: JSON.parse(res.data).message
          }).then(() => {
            // on close
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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getOrderSa: function () {
    var url = app.globalData.baseOrder +
      "fawOrderEvaluation/tobeEvaluation?orderId=" + this.data.id
    var sessionId = wx.getStorageSync('sessionId')
    var that = this;
    wx.request({
      url: url,
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type": "json",
        'Cookie': sessionId
      },
      success: function (res) {
        console.log(res)
        if (res.data.code == 200) {
          that.setData({
            serverlist: res.data.data.tobeEvaluations,
            distributor: res.data.data.distributor,
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
})