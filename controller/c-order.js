const user = require('../models/m-user');
const products = require('../models/m-products');
const order = require('../models/m-order');

exports.postOrder = async (req, res, next) => {
    const d = req.body;
    if (!d) return res.status(201).json({ status: false, message: "Missing data" });

    user.findOne({ _id: d.userid })
        .then(async data => {
            let arr = data.cart.items;
            let add = data.address.items;
            var today = new Date();
            var ddd = today.getDate();
            var mmm = today.getMonth() + 1;
            var yy = today.getFullYear();
            var tday = ddd + '/' + mmm + '/' + yy;
            var someDate = new Date();
            var numberOfDaysToAdd = 6;
            someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
            var dd = someDate.getDate();
            var mm = someDate.getMonth() + 1;
            var y = someDate.getFullYear();
            var a;
            for (let n of add) {
                if (n._id == d.addressid) {
                    a = n;
                }
            }
            var someFormattedDate = dd + '/' + mm + '/' + y;
            for (let n of arr) {
                let s = " ";
                if (n.size) {
                    s = n.size;
                }
                const pro = await products.findOne({_id:n.product});
                let Order = new order({
                    userId: d.userid,
                    product: n._id,
                    store: n.storeId,
                    payment: n.price,
                    quantity: n.quantity,
                    size: s,
                    color: n.color,
                    placeDate: tday,
                    deliverDate: someFormattedDate,
                    amount: n.price,
                    type: a.type,
                    street: a.street,
                    landmark: a.landmark,
                    city: a.city,
                    state: a.state,
                    pincode: a.pincode,
                    phoneNumber: data.phoneNumber,
                    store: pro.storeId
                });
                await Order.save();
            }
            return data.clearCart();
        })
        .then(result => {
            res.status(200).json({ message: "order placed successfully" });
        }).catch(err => { console.log(err) });
}

exports.orderAddressUpdate = (req, res, next) => {
    const oid = req.body.inputOrderid;
    const d = req.body;
    if (!oid) return res.status(201).json({ message: "Provide proper details" });
    order.findOne({ _id: oid })
        .then(data => {
            var uid = data.userId;
            user.findOne({ _id: uid })
                .then(async result => {
                    let add = result.address.items;
                    let a;
                    for (let n of add) {
                        if (n._id == d.addressid) {
                            a = n;
                        }
                    }
                    data.type = a.type;
                    data.street = a.street;
                    data.landmark = a.landmark;
                    data.city = a.city;
                    data.state = a.state;
                    data.pincode = a.pincode;
                    data.save()
                        .then(ans => {
                            res.status(200).json({
                                status: true
                            })
                        }).catch(err => { console.log(err) });
                }).catch(err => { console.log(err) });
        }).catch(err => { console.log(err) });
}

exports.orderCancel = (req, res, next) => {
    const oid = req.body.inputOrderid;
    const status = req.body.inputStatus;
    if (!oid) return res.status(201).json({ message: "Provide proper detailss" });
    order.findOne({ _id: oid })
        .then(data => {
            var today = new Date();
            var ddd = today.getDate();
            var mmm = today.getMonth() + 1;
            var yy = today.getFullYear();
            var tday = ddd + '/' + mmm + '/' + yy;
            if(tday == data.deliverDate){
                return res.status(201).json({ message: "You can't cancel the order on the delivery date" });
            }
            data.is_cancel = status;
            data.save()
                .then(result => {
                    res.status(200).json({ status: true });
                }).catch(err => { console.log(err) });
        }).catch(err => { console.log(err) });
}

exports.postUpdateOrderStatus = (req, res, next) => {
    const oid = req.body.inputOrderid;
    const status = req.body.inputStatus;
    if (!oid) return res.status(201).json({ message: "Provide proper details" });
    if (!status) return res.status(201).json({ message: "Provide proper details" });
    order.findOne({ _id: oid })
        .then(data => {
            data.status = status;
            data.save()
                .then(result => {
                    res.status(200).json({ status: true });
                }).catch(err => { console.log(err) });
        }).catch(err => { console.log(err) });
}

exports.getOrder = (req, res, next) => {
    const uid = req.body.inputUserId;
    const sid = req.body.inputStoreId;
    if (!uid && !sid) return res.status(201).json({ message: "Provide proper details" });

    if (uid) {
        order.find({ userId: uid })
            .then(data => {
                res.status(200).json({
                    data: data
                })
            }).catch(err => { console.log(err) });
    } else {
        order.find({ store: sid })
            .then(data => {
                res.status(200).json({
                    data: data
                })
            }).catch(err => { console.log(err) });
    }
}