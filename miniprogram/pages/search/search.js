// pages/search/search.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        pageNum: 0,
        items: [{
            id: '',
            customer: '榕城 B07--15252552155',
            product: '某年某日0添蔗糖乳茶白桃乌龙（港式原味）',
            specification: '1*24',
            purchase_price: '64',
            unit_price: '64 64 64 64 64',
            selling_price: '64',
            wholesale_price: '64 64',
        }],
        localSchools: [],
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
        this.onQuery();
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
    onSearch() {
        this.data.value?.length > 1 ?
            this.onQuery(this.data.value) : '';
        console.log('搜索' + this.data.value);
    },
    onQuery(pageNum = 0) {

        const db = wx.cloud.database()
        // 查询当前用户所有的 counters
        if (this.data.value) {
            this.setData({
                items: [],
                searching: true
            })
            db.collection('items').where({
                product: db.RegExp({
                    regexp: '.*' + this.data.value + '.*',
                    options: 's',
                })
            }).get({
                success: res => {
                    this.setData({
                        items: res.data,
                    })
                },
                fail: err => {
                    wx.showToast({
                        icon: 'none',
                        title: '查询记录失败'
                    })
                }
            })
        } else {
            db.collection('items')
                .skip(pageNum * 10) //从第几个数据开始
                .limit(pageNum * 10 + 10)
                .get({
                    success: res => {
                        this.setData({
                            items: res.data,
                        })
                    },
                    fail: err => {
                        wx.showToast({
                            icon: 'none',
                            title: '查询记录失败'
                        })
                    }
                })
        }
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
        if (!this.data.searching) {
            console.log("触底触底");
            const nextItems = this.onQuery(this.data.pageNum + 1);
            this.setData({
                pageNum: this.data.pageNum + 1,
                items: [...this.data.items,...nextItems]|| [],
            });
        } else {

        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
    }
})