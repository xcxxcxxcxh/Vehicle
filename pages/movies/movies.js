var util = require('../../utils/util.js')
import Dialog from '../../dist/dialog/dialog';
var app = getApp();
Page({
  // RESTFul API JSON
  // SOAP XML
  //粒度 不是 力度
  data: {
    inTheaters: {},
    comingSoon: {},
    top250: {},
    array: ['男', '女'],
    array3: ['男', '女'],
    region: [],
    is: false,
    iss: true,
    isPhone: false,
    background: "",
    image: `<image`,
    searchResult: {},
    containerShow: true,
    searchPanelShow: false,
    text: "请选择",
    items: [
      { name: '1', value: '干皮' },
      { name: '2', value: '油皮' },
      { name: '3', value: '敏感肌' },
      { name: '4', value: '痘痘肌' },
      { name: '5', value: '混干皮' },
      { name: '6', value: '混油皮' },
      { name: '7', value: '中性皮肤' },
    ],
    gd1List2: [

      { name: "毛坯房", isChecked2: false },

      { name: "普通装修", isChecked2: false },

      { name: "精装修", isChecked2: false },

      { name: "豪华装修", isChecked2: false },
      { name: "豪华装修", isChecked2: false }, { name: "豪华装修", isChecked2: false }, { name: "豪华装修", isChecked2: false }, { name: "豪华装修", isChecked2: false }, { name: "豪华装修", isChecked2: false },

    ],


  },
  onShow: function () {
    this.onLoad()
  },
  login: function () {
    var phoneUrl = app.globalData.baseOrder +
      "dis/logout"
    wx.request({
      url: phoneUrl,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type": "json"
      },
      success: function (res) {
        console.log(res)
        if (res.data.code == 200) {

          getApp().globalData.j = false
          // wx.setStorage({
          //   key: 'sessionId',
          //   data: 'SESSION=' + res.data.data.sessionId,
          //   success: function (res) {
          //     console.log(res)
          //   }
          // })
          // getApp().globalData.header.Cookie = 'JSESSIONID=' + res.data.data.sessionId;

          console.log(2)
          wx.reLaunch({
            url: "../../../../welcome/welcome?phoneId=3"
          });
        } else {
          Dialog.alert({
            message: res.data.message
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
    wx.navigateTo({
      url: "../../../posts/post"
    });
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
      if (res.length > 5) {
        if (item.isChecked2) {
          item.isChecked2 = !item.isChecked2;
        } else {
          console.log(9)
        }
      } else {
        item.isChecked2 = !item.isChecked2;
      }
      //选中，未选中 两种状态切换


      that.setData({//更新到data

        gd1List2: that.data.gd1List2,

      });
    }


  },
  upload: function () {
    var that = this
    var sessionId = wx.getStorageSync('sessionId')
    var Url = app.globalData.baseUp +
      "/upload";
    wx.chooseImage({
      success(res) {
        const tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: Url, //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          header: {
            'cookie': sessionId,
            "Content-Type": "application/json",

          },
          name: 'file',
          formData: {
            'user': 'test'
          },
          success(res) {
            const data = res.data
            //do something
          },
          fail: function (error) {
            Dialog.alert({
              message: "当前网络异常，请您稍后再试。"
            }).then(() => {
              // on close
            });
          },
          complete(res) {

            const query = wx.createSelectorQuery()
            query.select('#the-id')
            console.log(JSON.parse(res.data))
            console.log(JSON.parse(res.data).data)
            console.log(query.select('#the-id'))
            that.setData({
              background: JSON.parse(res.data).data
            })
            //do something
          },
        })
      }
    })
  },

  checkboxChange: function (e) {
    var that = this;
    var skin = e.detail.value
    //新建数组全部设置为没被选中  
    var new_itmes = [
      { name: '1', value: '干皮' },
      { name: '2', value: '油皮' },
      { name: '3', value: '敏感肌' },
      { name: '4', value: '痘痘肌' },
      { name: '5', value: '混干皮' },
      { name: '6', value: '混油皮' },
      { name: '7', value: '中性皮肤' },
    ]
    if (skin.length > 3) {
      //取出倒数三个值  
      var key1 = skin[skin.length - 1];
      var key2 = skin[skin.length - 2];
      var key3 = skin[skin.length - 3];
      //设置最后三个值为选中状态  
      new_itmes[key1 - 1]['checked'] = 'true'
      new_itmes[key2 - 1]['checked'] = 'true'
      new_itmes[key3 - 1]['checked'] = 'true'

      //删除被选中的第一个值  
      skin.splice(0, 1);
    } else {
      //被选中少于三个，直接设置被选中  
      for (var i = 0; i < skin.length; i++) {
        var key = skin[i]
        new_itmes[key - 1]['checked'] = 'true'
      }
    }
    //拼接文字显示  
    var text = [];
    for (var i = 0; i < skin.length; i++) {
      var key = skin[i]
      text[i] = that.data.items[key - 1]['value']
    }
    text = text.join("、")
    //存入  
    that.setData({
      skin: skin,
      text: text,
      items: new_itmes
    })
  },

  initial: function () {
    var getInfoUrl = app.globalData.base +
      "/findCUInfo";

    this.getInfoData(getInfoUrl);
  },
  op: function () {
    // if (this.data.is && !this.data.sex) {
    //   Dialog.alert({
    //     message: '性别一经确认，无法修改，请正确选择您的性别。'
    //   }).then(() => {
    //     this.setData({
    //       is: false
    //     })
    //   });
    // }
    if (this.data.sex && this.data.is) {
      // this.setData({
      //      is: true
      //    })
      Dialog.alert({
        message: '信息不可改'
      }).then(() => {

      });
    }
  },
  opPhone: function () {
    // if (this.data.isPhone && !this.data.date) {
    //   Dialog.alert({
    //     message: '生日一经确认，无法修改，请正确选择您的生日。'
    //   }).then(() => {
    //     this.setData({
    //       isPhone: false
    //     })
    //   });
    // }
    if (this.data.date && this.data.isPhone) {
      Dialog.alert({
        message: '信息不可改'
      }).then(() => {

      });
    }

  },

  op2: function () {
    if (this.data.iss && !this.data.name) {
      Dialog.alert({
        message: '姓名一经确认，无法修改，请正确填写您的姓名。'
      }).then(() => {
        this.chooseName()
        this.setData({
          iss: false
        })
      });
    } else if (this.data.name) {
      Dialog.alert({
        message: '信息不可改'
      }).then(() => {

      });

    } else {
      this.chooseName()
    }

  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
    var url = app.globalData.base +
      "/addressUp?city=" + e.detail.value[1] + "&address=" + e.detail.value[2] + "&province=" + e.detail.value[0]
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
            message: '地区填写成功'
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
  bindPickerChange: function (e) {
    console.log(!this.data.sexF)
    if (!this.data.sexF) {
      Dialog.confirm({
        title: '提示',
        message: '性别一经确认，无法修改，请正确选择您的性别。',
        confirmButtonText: '确定',
        asyncClose: false
      })
        .then(() => {
          console.log('picker发送选择改变，携带值为', e.detail.value)
          this.setData({
            sex: this.data.array[e.detail.value],
            is: true
          })
          var a = e.detail.value == 0 ? 1 : 2
          var url = app.globalData.base +
            "/genderUp?gender=" + a
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
                  message: '性别填写成功'
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
        })
        .catch(() => {
          this.setData({
            // sex: this.data.array[e.detail.value],
            //sexF: true
          })
        });
    }




  },
  bindDateChange: function (e) {
    Dialog.confirm({
      title: '提示',
      message: '生日一经确认，无法修改，请正确选择您的生日。',
      confirmButtonText: '确定',
      asyncClose: false
    })
      .then(() => {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
          date: e.detail.value,
          isPhone: true
        })
        var url = app.globalData.base +
          "/birthdayUp?birthday=" + e.detail.value
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
                message: '生日填写成功'
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
      })
      .catch(() => {
        Dialog.close();
      });

  },
  onLoad: function (event) {
    var getInfoUrl = app.globalData.base +
      "/findCUInfo";
    var comingSoonUrl = app.globalData.doubanBase +
      "/v2/movie/coming_soon" + "?start=0&count=3";
    var top250Url = app.globalData.doubanBase +
      "/v2/movie/top250" + "?start=0&count=3";

    this.getInfoData(getInfoUrl);
    this.getMovieListData(comingSoonUrl, "comingSoon", "即将上映");
    this.getMovieListData(top250Url, "top250", "豆瓣Top250");
  },

  chooseName: function () {
    wx.navigateTo({
      url: "name/name"
    })
  },
  chooseServer: function () {
    console.log(this.data)

    if (this.data.saName && this.data.saName != '等待服务顾问确认') {
      wx.navigateTo({
        url: "hasServer/hasServer"
      })
    } else if (this.data.saName == '等待服务顾问确认'){


    }else{
      console.log(this.data.carCount)
      console.log(this.data.realName)
      console.log(this.data.sex)
      console.log(this.data.carCount)
      if (this.data.carCount > 0 && this.data.name && this.data.sex && this.data.phone) {
        wx.navigateTo({
          url: "service/service"
        })
      } else {
        Dialog.alert({
          message: '姓名，性别，手机号，爱车信息，需要先填写完整，才能绑定服务顾问'
        }).then(() => {

        });
      }

    }

  },
  onMoreTap: function (event) {
    var category = event.currentTarget.dataset.category;
    wx.navigateTo({
      url: "more-movie/more-movie?category=" + category
    })
  },

  onMovieTap: function (event) {
    var movieId = event.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: "movie-detail/movie-detail?id=" + movieId
    })
  },

  getInfoData: function (url) {

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
          console.log(res.data.data.realName && res.data.data.gender && res.data.data.saName && res.data.data.carCount)
          if (res.data.data.realName && res.data.data.hasOwnProperty('gender') && res.data.data.saName && res.data.data.carCount) {
            getApp().globalData.info = res.data.data
            if (res.data.data.realName) {
              that.setData({
                name: res.data.data.realName,
              })
            } else {
              that.setData({
                name: '',
              })
            }
            if (res.data.data.saName) {
              that.setData({
                saName: res.data.data.saName
              })
            } else {
              that.setData({
                saName: '',
              })
            }
            if (res.data.data.saCheck == 0) {
              that.setData({
                saName: "等待服务顾问确认"
              })
            }
            if (res.data.data.carCount) {
              that.setData({
                carCount: res.data.data.carCount
              })
            } else {
              that.setData({
                carCount: 0,
              })
            }
            if (res.data.data.phone) {
              that.setData({
                phone: res.data.data.phone
              })
            } else {
              that.setData({
                phone: '',
              })
            }
            if (res.data.data.gender) {
              that.setData({
                sex: that.data.array3[res.data.data.gender - 1],
                is: true
              })
            } else {
              that.setData({
                sex: '',
              })
            }
            if (res.data.data.birthday) {
              that.setData({
                date: res.data.data.birthday,
                isPhone: true
              })
            } else {
              that.setData({
                date: '',
              })
            }
            if (res.data.data.hobby) {
              that.setData({
                love: res.data.data.hobby
              })
            } else {
              that.setData({
                love: '',
              })
            }
            if (res.data.data.avatarUrl) {
              that.setData({
                background: res.data.data.avatarUrl
              })
            } else {
              that.setData({
                background: '',
              })
            }
            if (res.data.data.address) {
              that.setData({
                region: [res.data.data.province, res.data.data.city, res.data.data.address]
              })
            } else {
              that.setData({
                region: [],
              })
            }
          } else if (!(getApp().globalData.j) && res.data.data.saCheck == -1) {
            Dialog.alert({
              message: '请先完善您的个人信息请在“我的”中完善您的信息，再发起服务申请'
            }).then(() => {
              // on close
              getApp().globalData.j = true
            });
            getApp().globalData.info = res.data.data
            if (res.data.data.realName) {
              that.setData({
                name: res.data.data.realName,
              })
            } else {
              that.setData({
                name: '',
              })
            }
            if (res.data.data.saName) {
              that.setData({
                saName: res.data.data.saName
              })
            } else {
              that.setData({
                saName: '',
              })
            }
            if (res.data.data.saCheck == 0) {
              that.setData({
                saName: "等待服务顾问确认"
              })
            }
            if (res.data.data.carCount) {
              that.setData({
                carCount: res.data.data.carCount
              })
            } else {
              that.setData({
                carCount: 0,
              })
            }
            if (res.data.data.phone) {
              that.setData({
                phone: res.data.data.phone
              })
            } else {
              that.setData({
                phone: '',
              })
            }
            if (res.data.data.gender) {
              that.setData({
                sex: that.data.array3[res.data.data.gender - 1],
                is: true
              })
            } else {
              that.setData({
                sex: '',
              })
            }
            if (res.data.data.birthday) {
              that.setData({
                date: res.data.data.birthday,
                isPhone: true
              })
            } else {
              that.setData({
                date: '',
              })
            }
            if (res.data.data.hobby) {
              that.setData({
                love: res.data.data.hobby
              })
            } else {
              that.setData({
                love: '',
              })
            }
            if (res.data.data.avatarUrl) {
              that.setData({
                background: res.data.data.avatarUrl
              })
            } else {
              that.setData({
                background: '',
              })
            }
            if (res.data.data.address) {
              that.setData({
                region: [res.data.data.province, res.data.data.city, res.data.data.address]
              })
            } else {
              that.setData({
                region: [],
              })
            }
          } else {
            getApp().globalData.info = res.data.data
            if (res.data.data.realName) {
              that.setData({
                name: res.data.data.realName,
              })
            } else {
              that.setData({
                name: '',
              })
            }
            if (res.data.data.saName) {
              that.setData({
                saName: res.data.data.saName
              })
            } else {
              that.setData({
                saName: '',
              })
            }
            if (res.data.data.saCheck == 0) {
              that.setData({
                saName: "等待服务顾问确认"
              })
            }
            if (res.data.data.carCount) {
              that.setData({
                carCount: res.data.data.carCount
              })
            } else {
              that.setData({
                saName: '',
              })
            }
            if (res.data.data.phone) {
              that.setData({
                phone: res.data.data.phone
              })
            } else {
              that.setData({
                phone: '',
              })
            }
            if (res.data.data.gender) {
              that.setData({
                sex: that.data.array3[res.data.data.gender - 1],
                is: true
              })
            } else {
              that.setData({
                sex: '',
              })
            }
            if (res.data.data.birthday) {
              that.setData({
                date: res.data.data.birthday,
                isPhone: true
              })
            } else {
              that.setData({
                date: '',
              })
            }
            if (res.data.data.hobby) {
              that.setData({
                love: res.data.data.hobby
              })
            } else {
              that.setData({
                love: '',
              })
            }
            if (res.data.data.avatarUrl) {
              that.setData({
                background: res.data.data.avatarUrl
              })
            } else {
              that.setData({
                background: '',
              })
            }
            if (res.data.data.address) {
              that.setData({
                region: [res.data.data.province, res.data.data.city, res.data.data.address]
              })
            } else {
              that.setData({
                region: [],
              })
            }
            // if (res.data.data.birthday) {
            //   that.setData({
            //     date: res.data.data.birthday
            //   })
            // }
            // that.setData({
            //   name: res.data.data.realName||'',
            //   saName: res.data.data.saName || '',
            //   phone: res.data.data.phone || '',
            //   sex: that.data.array[res.data.data.gender] || '',
            //   date: res.data.data.birthday || '',
            //   love: res.data.data.hobby || '',
            //   carCount: res.data.data.carCount || '',
            //   love: res.data.data.hobby || '',
            //   background: res.data.data.avatarUrl || '',
            // //  region: [res.data.data.city, res.data.data.city, res.data.data.address]
            //   //   region: [res.data.data.city, res.data.data.city, res.data.data.address]

            // })
          }
          getApp().globalData.j = true


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

  onBindBlur: function (event) {
    var text = event.detail.value;
    var searchUrl = app.globalData.doubanBase + "/v2/movie/search?q=" + text;
    this.getMovieListData(searchUrl, "searchResult", "");
  },

  processDoubanData: function (moviesDouban, settedKey, categoryTitle) {
    var movies = [];
    for (var idx in moviesDouban.subjects) {
      var subject = moviesDouban.subjects[idx];
      var title = subject.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + "...";
      }
      // [1,1,1,1,1] [1,1,1,0,0]
      var temp = {
        stars: util.convertToStarsArray(subject.rating.stars),
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id
      }
      movies.push(temp)
    }
    var readyData = {};
    readyData[settedKey] = {
      categoryTitle: categoryTitle,
      movies: movies
    }
    this.setData(readyData);
  }
})