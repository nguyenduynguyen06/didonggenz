const ProductVariant = require('../Model/ProductVariantModel'); 
const Product = require('../Model/ProductModel'); 


const addProductVariant = async (req, res) => {
  try {
    const parentProductName = req.params.id;
    const parentProduct = await Product.findById(parentProductName);
    if (!parentProduct) {
      return res.status(404).json({ success: false, error: 'Không tìm thấy sản phẩm chính' });
    }
    const { memory, imPrice, oldPrice, newPrice, attributes } = req.body;
    const productVariant = new ProductVariant({
      productName: parentProductName,
      memory,
      imPrice,
      oldPrice,
      newPrice,
      attributes,
    });
    const newProductVariant = await productVariant.save();
    parentProduct.variant.push(newProductVariant._id);
    await parentProduct.save();
    res.status(201).json({ success: true, data: newProductVariant });
  } catch (error) {
    res.status(500).json({ success: false,  error });
  }
};
const addAttributes = async (req, res) => {
  try {
    const productVariantId = req.params.id; 
    const { attributes } = req.body; 
    const productVariant = await ProductVariant.findById(productVariantId);
    if (!productVariant) {
      return res.status(404).json({ success: false, error: 'Không tìm thấy sản phẩm biến thể' });
    }
    productVariant.attributes.push(...attributes); 
    const updatedProductVariant = await productVariant.save();
    res.status(200).json({ success: true, data: updatedProductVariant });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};




const deleteProductVariant = async (req, res) => {
  try {
    const productVariantId = req.params.id;
    if (productVariantId) {
      const productVariant = await ProductVariant.findById(productVariantId);
      if (!productVariant) {
        return res.status(401).json({ err: 'Biến thể sản phẩm không tồn tại' });
      }
      await ProductVariant.findByIdAndDelete(productVariantId);
      const parentProductId = productVariant.productName;
      const parentProduct = await Product.findById(parentProductId);
      if (parentProduct) {
        parentProduct.variant = parentProduct.variant.filter(
          (variant) => variant.toString() !== productVariantId
        );
        await parentProduct.save();
      }
      res.status(200).json({ success: true, message: 'Biến thể đã được xóa thành công' });
    } else {
      return res.status(401).json({ msg: 'Không tìm thấy ID' });
    }
  } catch (error) {
    return res.status(500).json({ msg: 'Lỗi Server' });
  }
};

const updateProductVariant = async (req, res) => {
  try {
    const productVariantId = req.params.id;
    const data = req.body;
    const updateData = {};
    if (data.memory !== undefined) {
      updateData.memory = data.memory;
    }
    if (data.imPrice !== undefined) {
      updateData.imPrice = data.imPrice;
    }
    if (data.oldPrice !== undefined) {
      updateData.oldPrice = data.oldPrice;
    }
    if (data.newPrice !== undefined) {
      updateData.newPrice = data.newPrice;
    }
    const updatedProduct = await ProductVariant.findByIdAndUpdate(productVariantId, updateData);
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
const deleteAttributes = async (req, res) => {
  try {
    const variantId = req.params.id;
    const attributeIdToRemove = req.params.attributeIdToRemove; 
    const productVariant = await ProductVariant.findById(variantId);
    if (!productVariant) {
      return res.status(404).json({ success: false, error: 'Biến thể không tồn tại' });
    }
    productVariant.attributes = productVariant.attributes.filter(
      (attribute) => attribute !== attributeIdToRemove
    );
    await productVariant.save();

    res.status(200).json({ success: true, message: 'Xóa thuộc tính khỏi biến thể thành công' });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};


module.exports = { addProductVariant,deleteProductVariant,updateProductVariant,addAttributes,deleteAttributes };
