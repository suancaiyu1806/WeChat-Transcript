// pages/item/item.js
Component({
    /**
     * 组件属性
     */
    properties: {
        customer: String,
        product: String,
        specification: String,
        purchase_price: String,
        unit_price: String,
        selling_price: String,
        wholesale_price: String,
    },
    
    /**
     * 组件的初始数据
     */
    data: {
        tran_purchase_price: [],
        tran_unit_price: [],
        tran_selling_price: [],
        tran_wholesale_price: [],
    },

    lifetimes: {
        attached: function () {
          this.setData({
            tran_purchase_price: this.properties.purchase_price.split(" "),
            tran_unit_price: this.properties.unit_price.split(" "),
            tran_selling_price: this.properties.selling_price.split(" "),
            tran_wholesale_price: this.properties.wholesale_price.split(" "),
          });
        },
      },
})