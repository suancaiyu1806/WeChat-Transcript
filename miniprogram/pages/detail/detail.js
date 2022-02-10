// pages/detail/detail.js
Page({

    /**
     * 页面的初始数据
     */

    data: {
        isEdit: true,
        itemInfo: {
            customer: {
                text: '客户',
                value: ''
            },
            product: {
                text: '产品',
                value: ''
            },
            specification: {
                text: '规格',
                value: ''
            },
            purchase_price: {
                text: '进价',
                value: ''
            },
            unit_price: {
                text: '单价',
                value: ''
            },
            selling_price: {
                text: '售价',
                value: ''
            },
            wholesale_price: {
                text: '批发价',
                value: ''
            },
        },
        labels: [
            "customer",
            "product",
            "specification",
            "purchase_price",
            "unit_price",
            "selling_price",
            "wholesale_price",
        ]
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