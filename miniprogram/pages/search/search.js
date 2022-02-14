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
        cacheItems: [],
        searching: false,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        try {
            let cacheItems = wx.getStorageSync('items');
            if (!cacheItems) {
                const db = wx.cloud.database();
                db.collection('cacheItems')
                    .skip(0) //从第几个数据开始
                    .limit(1)
                    .get({
                        success: res => {
                            wx.setStorageSync('items', res.data[0]?.items )
                        },
                    })
                console.log("缓存为空")
            } else {
                this.setData({ cacheItems});
            }
        } catch (e) {
            console.log("error")
        }
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        let cacheItems = wx.getStorageSync('items');
        if (cacheItems.length > 0) {
            this.onCacheQuery().then(() =>
                this.setData({
                    items: this.data.queryItems
                })
            );
        } else {
            this.onQuery().then(() =>
                this.setData({ items: this.data.queryItems })
            );
        }
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
        if (!this.data.value?.length) return;
        this.setData({
            items: [],
            searching: true,
            pageNum: 0,
        });
        if (this.data.cacheItems.length) {
            this.onCacheQuery().then(() => {
                this.setData({ items: this.data.queryItems });
            });
        } else {
            await this.onQuery();
            this.setData({ items: this.data.queryItems });
        }
    },
    async onQuery(pageNum = 0) {
        const db = wx.cloud.database();
        this.setData({
            queryItems: [],
        });
        if (this.data.value) {
            await new Promise((resolve) => {
                db.collection('items').where({
                    product: db.RegExp({
                        regexp: '.*' + this.data.value + '.*',
                        options: 's',
                    })
                }).skip(pageNum * 10) //从第几个数据开始
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
    async onCacheQuery(pageNum = 0) {
        let queryItems = [];
        this.setData({
            queryItems: [],
        });
        if (this.data.value) {
            let reg = new RegExp(this.data.value);
            this.data.cacheItems.map(item => {
                if (reg.test(item.customer)||reg.test(item.product)) {
                    queryItems.push(item);
                }
            }); 
            this.setData({ queryItems: queryItems.slice(pageNum * 10, pageNum * 10 + 10) });
            console.log('queryItems',queryItems );
        } else {
            queryItems = this.data.cacheItems.slice(pageNum * 10, pageNum * 10 + 10);
            this.setData({ queryItems });
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
        if (this.data.cacheItems.length) {
            this.onCacheQuery(this.data.pageNum + 1).then(() => {
                const preItems = [...this.data.items];
                this.setData({
                    pageNum: this.data.pageNum + 1,
                    items: preItems.concat(this.data.queryItems),
                    loading: false,
                });
            });
        } else {
            this.onQuery(this.data.pageNum + 1).then(() => {
                const preItems = [...this.data.items];
                this.setData({
                    pageNum: this.data.pageNum + 1,
                    items: preItems.concat(this.data.queryItems),
                    loading: false,
                });
            });
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
    }
})