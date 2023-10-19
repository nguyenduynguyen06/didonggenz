const Cart = require('../Model/CartModel');
const Product = require('../Model/ProductModel');
const ProductVariant = require('../Model/ProductVariantModel');

const addToCart = async (req, res) => {
  try {
    const { userId, productId, productVariantId, quantity } = req.body;


    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, error: 'Sản phẩm không tồn tại' });
    }
    const {name} = product

    const productVariant = await ProductVariant.findById(productVariantId);
    if (!productVariant) {
      return res.status(404).json({ success: false, error: 'Sản phẩm biến thể không tồn tại' });
    }
    const { memory, color, price } = productVariant;
    const subtotal = price * quantity;
    const cartItem = new Cart({
      user: userId,
      product: productId,
      productVariant: productVariantId,
      name: name,
      memory,
      color,
      price,
      quantity,
      subtotal,
    });
    await cartItem.save();
    res.status(201).json({ success: true, data: cartItem });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { addToCart };
