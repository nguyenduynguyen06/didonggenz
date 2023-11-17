const Cart = require('../Model/CartModel');
const Product = require('../Model/ProductModel');
const ProductVariant = require('../Model/ProductVariantModel');

const addToCart = async (req, res) => {
  try {
    const { userId, productName, SKU, quantity } = req.query;
    if(!userId){
      return res.status(200).json({message: 'Vui lòng đăng nhập để tiếp tục'})
    }
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({
        user: userId,
        items: [],
      });
    }
    const product = await Product.findOne({ name: productName });
    if (!product) {
      return res.status(404).json({ success: false, error: 'Sản phẩm không tồn tại' });
    }
    const productVariant = await ProductVariant.findOne({
      'attributes.sku': SKU
    });
    if (!productVariant) {
      return res.status(404).json({ success: false, error: 'Sản phẩm biến thể không tồn tại' });
    }
    let color = ''; 
    let matchingPictures = null;
 
    for (const attribute of productVariant.attributes) {
      if (attribute.sku === SKU) {
        color = attribute.color;
        matchingPictures = attribute.pictures;
        if (attribute.quantity < quantity) {
          return res.status(400).json({ success: false, error: 'Số lượng vượt quá giới hạn trong kho' });
        }
        break;
      }
    }
  let matchingItem = null;
  for (const item of cart.items) {
    if (
      item.product.toString() === product._id.toString() &&
      item.productVariant._id.toString() === productVariant._id.toString() &&
      item.color.toString() === color
    ) {
      matchingItem = item;
      break;
    }
  }
  if (matchingItem) {
    const newQuantity = Number(matchingItem.quantity) + Number(quantity);
    
    
    if (newQuantity <= 3) {
      matchingItem.quantity = newQuantity;
      matchingItem.subtotal = Number(matchingItem.subtotal) + (productVariant.newPrice * quantity);
    } else {
      return res.status(400).json({ success: false, error: 'Số lượng vượt quá giới hạn (3)' });
    }
  } else {
    if (quantity <= 3) { 
      const price = productVariant.newPrice;
      const subtotal = price * quantity;
      cart.items.push({
        product: product._id,
        productVariant: productVariant,
        price: productVariant.newPrice,
        color: color,
        memory: productVariant?.memory,
        pictures: matchingPictures,
        quantity,
        subtotal,
      });
    } else {
      return res.status(400).json({ success: false, error: 'Số lượng vượt quá giới hạn (3)' });
    }
  }
  
    await cart.save();
    res.status(201).json({ success: true, data: cart });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
const deleteCartItem = async (req, res) => {
  const userId = req.params.userId; 
  const cartItemId = req.params.cartItemId; 
  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ success: false, error: 'Giỏ hàng không tồn tại' });
    }
    const itemIndex = cart.items.findIndex((item) => item._id.toString() === cartItemId);
    if (itemIndex === -1) {
      return res.status(404).json({ success: false, error: 'Mục giỏ hàng không tồn tại' });
    }
    cart.items.splice(itemIndex, 1);
    await cart.save();
    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
const updateCartItemQuantity = async (req, res) => {
  const userId = req.params.userId; 
  const cartItemId = req.params.cartItemId; 
  const { quantity } = req.body; 

  try {

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ success: false, error: 'Giỏ hàng không tồn tại' });
    }
    const item = cart.items.find((item) => item._id.toString() === cartItemId);
    if (!item) {
      return res.status(404).json({ success: false, error: 'Mục giỏ hàng không tồn tại' });
    }
    const productVariant = await ProductVariant.findById(item.productVariant);
    item.quantity = quantity;
    item.subtotal = productVariant.newPrice * quantity;
    await cart.save();
    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
const getCartItemsByUserId = async (req, res) => {
  const userId = req.params.userId; 
  try {
    const cart = await Cart.findOne({ user: userId }).populate({
      path: 'items',
      populate: {
        path: 'product',
      }
    }).populate({
      path: 'items',
      populate: {
        path: 'productVariant',
      }
    });
    if (!cart) {
      return res.status(404).json({ success: false, error: 'Giỏ hàng của người dùng không tồn tại' });
    }
    res.status(200).json({ success: true, data: cart.items });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { addToCart,deleteCartItem,updateCartItemQuantity,getCartItemsByUserId };
