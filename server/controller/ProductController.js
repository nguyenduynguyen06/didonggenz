const Product = require('../Model/ProductModel');
const Brand = require('../Model/BrandModel');
const Category = require('../Model/CategoryModel');
const ProductVariant = require('../Model/ProductVariantModel');
const { format } = require('date-fns');
const addProduct = async (req, res) => {
  try {
    const { name, desc, warrantyPeriod,brandName, categoryName, properties,thumnails,include} = req.body;
    const releaseTimeInput = req.body.releaseTime; 
    const formattedReleaseTime = format(new Date(releaseTimeInput), 'dd/MM/yyyy'); 
    const brand = await Brand.findOne({ name: brandName });
    if (!brand) {
      return res.status(404).json({ success: false, error: 'Brand không tồn tại' });
    }
    const category = await Category.findOne({ name: categoryName });
    if (!category) {
      return res.status(404).json({ success: false, error: 'Category không tồn tại' });
    }
    const product = new Product({
      name,
      desc,
      releaseTime: formattedReleaseTime,
      warrantyPeriod,
      brand: brand._id,
      category: category._id,
      isHide: true,
      isOutOfStock: false,
      properties,
      thumnails,
      include
    });
    const newProduct = await product.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


const getProductByBrandId = async (req, res) => {
  try {
    const brandId = req.params.brandId; 
    const products = await Product.find({ brand: brandId }).populate('variant');
    return res.status(200).json({
      data: products
    });
  } catch (error) {
    console.error('Lỗi:', error);
    return res.status(500).json({ msg: 'Lỗi Server' });
  }
};
const getProductsByCategoryAndBrand = async (req, res) => {
  try {
    const categoryId = req.params.categoryId; 
    const brandId = req.params.brandId; 
    const products = await Product.find({ category: categoryId, brand: brandId }).populate('variant');
    return res.status(200).json({
      data: products
    });
  } catch (error) {
    console.error('Lỗi:', error);
    return res.status(500).json({ msg: 'Lỗi Server' });
  }
};

const getProductsByCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId; 
    
    const products = await Product.find({ category: categoryId }).populate('variant');

    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error('Lỗi:', error);
    res.status(500).json({ success: false, error: 'Lỗi Server' });
  }
};


const editProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const data = req.body;
    const updateData = {};
    if (data.brandName) {
      const brand = await Brand.findOne({ name: data.brandName });
      if (!brand) {
        return res.status(404).json({ success: false, error: 'Brand không tồn tại' });
      }
      updateData.brand = brand._id;
    }
    if (data.categoryName) {
      const category = await Category.findOne({ name: data.categoryName });
      if (!category) {
        return res.status(404).json({ success: false, error: 'Category không tồn tại' });
      }
      updateData.category = category._id;
    }
    if (data.name) {
      updateData.name = data.name;
    }
    if (data.desc) {
      updateData.desc = data.desc;
    }
    if (data.releaseTime) {
      const releaseTimeInput = data.releaseTime; 
      const formattedReleaseTime = format(new Date(releaseTimeInput), 'dd/MM/yyyy'); 
      updateData.releaseTime = formattedReleaseTime;
    }
    if (data.warrantyPeriod) {
      updateData.warrantyPeriod = data.warrantyPeriod;
    }
    if (data.properties) {
      updateData.properties = data.properties;
    }
    if (data.thumnails) {
      updateData.thumnails = data.thumnails;
    }
    if (data.include) {
      updateData.include = data.include;
    }
    if (data.isHide !== undefined) {
      updateData.isHide = data.isHide;
    }
    if (data.promotion) {
      updateData.promotion = data.promotion;
    }
    const updatedProduct = await Product.findByIdAndUpdate(productId, updateData);
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    return res.status(500).json({ msg: 'Lỗi Server' });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    if (productId) {
      const product = await Product.findOne({ _id: productId });
      if (!product) {
        return res.status(401).json({ err: 'Sản phẩm không tồn tại' });
      }
      const variants = product.variant;
      for (const variantId of variants) {
        await ProductVariant.findByIdAndDelete(variantId);
      }

      await Product.findByIdAndDelete(productId);

      res.status(200).json({ success: true, message: 'Sản phẩm và các biến thể đã được xóa thành công' });
    } else {
      return res.status(401).json({ msg: 'Không tìm thấy ID' });
    }
  } catch (error) {
    return res.status(500).json({ msg: 'Lỗi Server' });
  }
};
const searchProducts = async (req, res) => {
  try {
    const keyword = req.query.keyword;
    const regex = new RegExp(keyword, 'i'); 
    const products = await Product.find({
      name: { $regex: regex }, 
    }).populate('brand').populate('category').populate({
      path: 'variant',
      populate: {
        path: 'attributes',
      },
    });
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error('Lỗi:', error);
    res.status(500).json({ success: false, error: 'Lỗi Server' });
  }
};
const detailsProduct = async (req, res) => {
  try {
    const { name, memory } = req.params; 
    const products = await Product.findOne({ name })
      .populate('brand')
      .populate('category')
      .populate({
        path: 'variant', 
        populate: {
          path: 'attributes',
        },
      });
    if (!products) {
      return res.status(404).json({ success: false, error: 'Sản phẩm không tồn tại' });
    }

    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error('Lỗi:', error);
    res.status(500).json({ success: false, error: 'Lỗi Server' });
  }
};

const getAllProduct = async (req, res) => {
  try {
    const products = await Product.find()
    .populate('brand') 
    .populate('category')
    .populate({
      path: 'variant',
      populate: {
        path: 'attributes',
      },
    });
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error('Lỗi:', error);
    res.status(500).json({ success: false, error: 'Lỗi Server' });
  }
}

const filterProductsByCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const minPrice = parseFloat(req.query.minPrice) || 0;
    const maxPrice = parseFloat(req.query.maxPrice) || Number.MAX_VALUE;
    const includeOldPrice = req.query.includeOldPrice === 'true';
    const selectedMemory = req.query.selectedMemory;

    let matchCondition = {
      newPrice: {
        $gte: minPrice,
        $lte: maxPrice,
      },
    };

    if (includeOldPrice) {
      matchCondition.$or = [{ oldPrice: { $exists: true } }];
    }

    if (selectedMemory) {
      matchCondition.$and = [
        {
          $or: [
            { memory: selectedMemory },
            { memory: { $exists: false } },
          ],
        },
      ];
    }

    const products = await Product.find({ category: categoryId })
      .populate('variant', null, matchCondition)
      .populate('brand')
      .populate('category');

    let filteredProducts = products.filter((product) =>
      product.variant.some((variant) =>
        variant.newPrice >= minPrice && variant.newPrice <= maxPrice
      )
    );

    const sortMode = req.query.sort || 'lowToHigh';
    if (sortMode === 'highToLow') {
      filteredProducts = filteredProducts.sort((a, b) => {
        const priceA = a.variant[0].newPrice;
        const priceB = b.variant[0].newPrice;
        return priceB - priceA;
      });
    } else {
      filteredProducts = filteredProducts.sort((a, b) => {
        const priceA = a.variant[0].newPrice;
        const priceB = b.variant[0].newPrice;
        return priceA - priceB;
      });
    }

    res.status(200).json({
      success: true,
      data: filteredProducts,
    });
  } catch (error) {
    console.error('Lỗi:', error);
    res.status(500).json({ success: false, error: 'Lỗi Server' });
  }
};
const filterProductsByCategoryandBrand = async (req, res) => {
  try {
    const categoryId = req.params.categoryId; 
    const brandId = req.params.brandId; 
    const minPrice = parseFloat(req.query.minPrice) || 0;
    const maxPrice = parseFloat(req.query.maxPrice) || Number.MAX_VALUE;
    const includeOldPrice = req.query.includeOldPrice === 'true';
    const selectedMemory = req.query.selectedMemory;

    let matchCondition = {
      newPrice: {
        $gte: minPrice,
        $lte: maxPrice,
      },
    };

    if (includeOldPrice) {
      matchCondition.$or = [{ oldPrice: { $exists: true } }];
    }

    if (selectedMemory) {
      matchCondition.$and = [
        {
          $or: [
            { memory: selectedMemory },
            { memory: { $exists: false } },
          ],
        },
      ];
    }

    const products = await Product.find({ category: categoryId, brand: brandId  })
      .populate('variant', null, matchCondition)
      .populate('brand')
      .populate('category');

    let filteredProducts = products.filter((product) =>
      product.variant.some((variant) =>
        variant.newPrice >= minPrice && variant.newPrice <= maxPrice
      )
    );

    const sortMode = req.query.sort || 'lowToHigh';
    if (sortMode === 'highToLow') {
      filteredProducts = filteredProducts.sort((a, b) => {
        const priceA = a.variant[0].newPrice;
        const priceB = b.variant[0].newPrice;
        return priceB - priceA;
      });
    } else {
      filteredProducts = filteredProducts.sort((a, b) => {
        const priceA = a.variant[0].newPrice;
        const priceB = b.variant[0].newPrice;
        return priceA - priceB;
      });
    }

    res.status(200).json({
      success: true,
      data: filteredProducts,
    });
  } catch (error) {
    console.error('Lỗi:', error);
    res.status(500).json({ success: false, error: 'Lỗi Server' });
  }
};



module.exports = { addProduct,getProductByBrandId,getProductsByCategory,editProduct,deleteProduct,searchProducts,getAllProduct,getProductsByCategoryAndBrand ,detailsProduct,filterProductsByCategory,filterProductsByCategoryandBrand};
