const User = require('../user/user.model');
const Order = require('../order/order.model');
const Product = require('../product/product.model');

const dashboard = async (req, res) => {
    const totalUsers = await User.countDocuments({ role: 'user' });
    const totalOrders = await Order.countDocuments();
    const totalProducts = await Product.countDocuments();
    res.status(200).json(
        {
            success: true,
            message: 'Extra dashboard',
            data: {
                totalUsers: totalUsers,
                totalOrders: totalOrders,
                totalProducts: totalProducts,
            }
        }
    );
};


module.exports = {
    dashboard,
};