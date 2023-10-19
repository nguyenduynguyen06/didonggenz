import React, { useState, useEffect } from 'react';
import { WrapperButtonMore, WrapperCard } from '../styled';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

function AccessoryHomePage() {
  const [products, setProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState(7);

  useEffect(() => {
    getCategoryByName();
  }, []);

  const getCategoryByName = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/category/getAll`);
      const allCategories = res.data.data;
      const phoneCategory = allCategories.find((cat) => cat.name === 'Điện thoại');
      const phoneCategoryId = phoneCategory ? phoneCategory._id : null;
      const otherCategories = allCategories.filter((cat) => cat._id !== phoneCategoryId);
      const productPromises = otherCategories.map((category) => {
        return axios.get(`${process.env.REACT_APP_API_URL}/product/getIdByCategory/${category._id}`);
      });
      const productsData = await Promise.all(productPromises);
      const allProducts = productsData.flatMap((response) => response.data.data);
      setProducts(allProducts);
    } catch (error) {
      console.error('Lỗi:', error);
    }
  };
  


  const handleShowMoreClick = () => {
    setVisibleProducts(visibleProducts + 5);
  };

  const containerStyle = {
    maxHeight: 'none'
  };

  const buttonStyle = {
    border: '1px solid #ff3300',
    color: '#ff3300',
    width: '240px',
    height: '38px',
    borderRadius: '4px',
    fontWeight: 500,
  };

  const buttonHoverStyle = {
    backgroundColor: '#ff3300',
    color: 'white',
    width: '240px',
    height: '38px',
    borderRadius: '4px',
    fontWeight: 500,
  };

  const [isButtonHovered, setIsButtonHovered] = useState(false);

  return (
    <WrapperCard>
      <img className='imgtt' src="..\..\image\banneracc.png" style={{ width: '100%' }} alt='title'></img>
      <div className='mainContainerAcc' style={containerStyle}>
        {products.filter((product) => product.isHide === false).slice(0, visibleProducts).map((product) => (
          <div className='box' key={product._id}>
            <div className='card' >
            <NavLink className="image" to={`/product/${product.name}/undefined`}>
                <img src={product.thumnails[0]} />
              </NavLink>
              <div className='desc'>
                <h1>{product?.name}</h1>
                <div>
                  <div style={{ margin: 0 }}>
                    <p style={{ fontWeight: 700, height: '20px' }}>
                      {product?.variant[0]?.newPrice?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                  </div>
                  <div style={{}}>
                    <p style={{ color: '#000', textDecoration: 'line-through', height: '20px' }}>{product?.variant[0]?.oldPrice?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {visibleProducts < products.length && (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
          <WrapperButtonMore
            textButton="Xem thêm"
            type="outline"
            styleButton={isButtonHovered ? buttonHoverStyle : buttonStyle}
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={() => setIsButtonHovered(false)}
            onClick={handleShowMoreClick}
          >
          </WrapperButtonMore>
        </div>)}
    </WrapperCard>
  );
}

export default AccessoryHomePage;
