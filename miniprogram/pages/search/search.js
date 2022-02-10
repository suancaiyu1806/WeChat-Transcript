// pages/search/search.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        
        items: [{
            id:'',
            customer: '榕城 B07--15252552155',
            product: '某年某日0添蔗糖乳茶白桃乌龙（港式原味）',
            specification: '1*24',
            purchase_price: '64',
            unit_price: '64 64 64 64 64',
            selling_price: '64',
            wholesale_price:'64 64',
        }],
        localSchools: [],
        searching: false,
    },

    onSearch() {
        this.data.value.length > 1 ?
            this.onQuery(this.data.value) : '';
        console.log('搜索' + this.data.value);
    },


    onQuery() {
        let queryItems = [];
        let reg = new RegExp(this.data.value);
    
        this.setData({
          items: []
        })
    
        this.setData({
          searching:true
        })
    
        this.data.localItems.map(item => {
          if (reg.test(item.name)) {
            queryItems.push(item);
          }
        })
    
        this.setData({
            items: queryItems
        })
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