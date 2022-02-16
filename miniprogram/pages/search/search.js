// pages/search/search.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        value: null,
        loading: false,
        pageNum: 0,
        queryItems: [],
        items: [],
        searching: false,
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
        this.onQuery().then(() =>
            this.setData({ items: this.data.queryItems })
        );
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 自定义函数
     */
    onChange(e) {
        this.setData({
            value: e.detail,
        });
    },
    async onSearch() {
        this.setData({
            items: [],
            searching: true,
            pageNum: 0,
        });
        await this.onQuery();
        this.data.value?.length > 0 ?
            this.setData({ items: this.data.queryItems })
            : '';
    },
    async onQuery(pageNum = 0) {
        const db = wx.cloud.database();
        const _ = db.command;
        this.setData({
            queryItems: [],
        });
        if (this.data.value) {
            await new Promise((resolve) => {
                db.collection('items').where(_.or([
                    {
                        product: db.RegExp({
                            regexp: '.*' + this.data.value + '.*',
                            options: 's',
                        })
                    },
                    {
                        customer: db.RegExp({
                            regexp: '.*' + this.data.value + '.*',
                            options: 's',
                        })
                    }
                ])).skip(pageNum * 10) //从第几个数据开始
                    .limit(pageNum * 10 + 10)
                    .get({
                        success: res => {
                            this.setData({ queryItems: res.data });
                            resolve(true);
                        },
                        fail: err => {
                            wx.showToast({
                                icon: 'none',
                                title: '查询记录失败'
                            })
                            resolve(false);
                        }
                    });
            });
        } else {
            await new Promise((resolve) => {
                db.collection('items')
                    .skip(pageNum * 10) //从第几个数据开始
                    .limit(pageNum * 10 + 10)
                    .get({
                        success: res => {
                            this.setData({ queryItems: res.data });
                            resolve(true);
                        },
                        fail: err => {
                            wx.showToast({
                                icon: 'none',
                                title: '查询记录失败'
                            });
                            resolve(false);
                        }
                    });
            });
        }
    },
    toEdit(e) {
        wx.redirectTo({
            url: `../detail/detail?itemId=${e.currentTarget.id}&isEdit=true`,
        })
    },
    toCreate() {
        wx.redirectTo({
            url: '../detail/detail?isEdit=false',
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
        this.setData({ loading: true });
        if (!this.data.searching) {
            console.log("查看触底");
            this.onQuery(this.data.pageNum + 1).then(() => {
                const preItems = [...this.data.items];
                this.setData({
                    pageNum: this.data.pageNum + 1,
                    items: preItems.concat(this.data.queryItems),
                    loading: false,
                });
            }
            );
        } else {
            console.log("搜索触底");
            this.onQuery(this.data.pageNum + 1).then(() => {
                const preItems = [...this.data.items];
                this.setData({
                    pageNum: this.data.pageNum + 1,
                    items: preItems.concat(this.data.queryItems),
                    loading: false,
                });
            }
            );
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
    }
})