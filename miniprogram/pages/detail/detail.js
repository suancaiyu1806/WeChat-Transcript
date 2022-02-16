// pages/detail/detail.js
Page({

    /**
     * 页面的初始数据
     */

    data: {
        isEdit: true,
        itemId: '',
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
        this.setData({
            isEdit: options.isEdit === 'true',
            itemId: options.itemId,
        });
        if (options.itemId) {
            console.log(options.itemId);
            const db = wx.cloud.database();
            db.collection('items')
                .where({ _id: options.itemId })
                .get({
                    success: res => {
                        this.data.labels.map(item => {
                            this.setData({
                                [`itemInfo.${item}.value`]: res.data?.[0][item],
                            })
                        });
                    },
                    fail: err => {
                        wx.showToast({
                            icon: 'none',
                            title: '查询记录失败'
                        });
                    }
                });
        };
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
     * 自定义函数
     */
    toBack() {
        wx.redirectTo({
            url: '../search/search',
        })
    },
    onChange(e) {
        this.setData({
            [`itemInfo.${e.currentTarget.id}.value`]: e.detail.value,
        });
    },
    onCreate() {
        if (!this.data.itemInfo.product.value) {
            wx.showToast({
                icon: 'error',
                title: '产品名不能为空'
            });
            return;
        } else if (!this.data.itemInfo.customer.value) {
            wx.showToast({
                icon: 'error',
                title: '客户不能为空'
            });
            return;
        }
        const db = wx.cloud.database();
        db.collection('items').add({
            data: {
                customer: this.data.itemInfo.customer.value,
                product: this.data.itemInfo.product.value,
                specification: this.data.itemInfo.specification.value,
                purchase_price: this.data.itemInfo.purchase_price.value,
                unit_price: this.data.itemInfo.unit_price.value,
                selling_price: this.data.itemInfo.selling_price.value,
                wholesale_price: this.data.itemInfo.wholesale_price.value,
            }
        }).then(() => {
            wx.showToast({
                icon: 'success',
                title: '添加成功'
            });
            setTimeout(() => {
                wx.redirectTo({
                    url: '../search/search',
                })
            }, 300)
        });
    },
    onEdit() {
        if (!this.data.itemInfo.product.value) {
            wx.showToast({
                icon: 'error',
                title: '产品名不能为空'
            });
            return;
        } else if (!this.data.itemInfo.customer.value) {
            wx.showToast({
                icon: 'error',
                title: '客户不能为空'
            });
            return;
        }
        const db = wx.cloud.database();
        db.collection('items')
            .where({ _id: this.data.itemId })
            .update(
                {
                    data: {
                        customer: this.data.itemInfo.customer.value,
                        product: this.data.itemInfo.product.value,
                        specification: this.data.itemInfo.specification.value,
                        purchase_price: this.data.itemInfo.purchase_price.value,
                        unit_price: this.data.itemInfo.unit_price.value,
                        selling_price: this.data.itemInfo.selling_price.value,
                        wholesale_price: this.data.itemInfo.wholesale_price.value,
                    }
                }
            )
            .then(() => {
                wx.showToast({
                    icon: 'success',
                    title: '修改成功'
                });
                setTimeout(() => {
                    wx.redirectTo({
                        url: '../search/search',
                    })
                }, 300)
            })
    },
    onDelete() {
        const db = wx.cloud.database();
        const itemId = this.data.itemId;
        wx.showModal({
            title: '确认删除？',
            success(res) {
                if (res.confirm) {
                    console.log('用户点击确定');
                    db.collection('items')
                        .doc(itemId)
                        .remove({
                            success: res => {
                                wx.showToast({
                                    icon: 'success',
                                    title: '删除成功'
                                });
                                setTimeout(() => {
                                    wx.redirectTo({
                                        url: '../search/search',
                                    })
                                }, 300)
                            },
                            fail: err => {
                                wx.showToast({
                                    icon: 'error',
                                    title: '删除失败'
                                });
                            }
                        });
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
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