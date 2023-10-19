import React, { useState, useEffect } from 'react';
import { WrapperButtonMore, WrapperCard } from '../styled';
import axios from 'axios';
import { Button } from 'antd';
import ButtonComponent from '../../../Components/ButtonComponent/ButtonComponent';
import { Link, NavLink } from 'react-router-dom';
function ProductHomePage() {
  const [products, setProducts] = useState([]);
  const [selectedMemories, setSelectedMemories] = useState({});
  const [visibleProducts, setVisibleProducts] = useState(7);

  useEffect(() => {
    getCategoryByName();
  }, []);

  const getCategoryByName = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/category/getAll`);
      const categories = res.data.data;
      const categoryName = 'Điện thoại';
      const category = categories.find((cat) => cat.name === categoryName);
      if (!category) {
        console.error('Không tìm thấy danh mục');
        return;
      }
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/product/getIdByCategory/${category._id}`
      );
      const productsData = response.data.data;
      setProducts(productsData);
      const initialMemories = {};
      productsData.forEach((product) => {
        initialMemories[product._id] = product.variant[0]?.memory;
      });
      setSelectedMemories(initialMemories);
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
      <img className='imgtt' src="..\..\image\bannerpd.jpg" style={{width: '100%'}} alt='title'></img>
      <div className='mainContainer' style={containerStyle}>
        {products.filter((product) => product.isHide === false).slice(0, visibleProducts).map((product) => (
          <div className='box' key={product._id}>
            <div className='card'>
            <NavLink className="image" to={`/product/${product.name}/${selectedMemories[product._id]}`}>
                <img src={product.thumnails[0]} />
                     </NavLink>
              <div className='desc'>
                <h1>{product?.name}</h1>
                <div>
                  {product?.variant.map((variant) => (
                    <Button
                      className={` memory-button ${variant.memory === selectedMemories[product._id] ? 'selected' : ''}`}
                      onClick={() => {
                        setSelectedMemories((prevSelected) => ({
                          ...prevSelected,
                          [product._id]: variant.memory,
                        }));
                      }}
                      style={{ padding: '5px 5px', marginInlineEnd: '5px' }}
                    >
                      {variant.memory}
                    </Button>
                  ))}
                  <div style={{ margin: 0 }}>
                    <p style={{ fontWeight: 700, height: '20px' }}>
                      {product?.variant.find((variant) => variant.memory === selectedMemories[product._id])?.newPrice?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                  </div>
                  <div style={{}}>
                    <p style={{ color: '#000', textDecoration: 'line-through', height: '20px' }}>{product?.variant.find((variant) => variant.memory === selectedMemories[product._id])?.oldPrice?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
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

export default ProductHomePage;
