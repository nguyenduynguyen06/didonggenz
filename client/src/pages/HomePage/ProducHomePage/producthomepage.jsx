import React, { useState, useEffect, useRef } from 'react';
import { WrapperButtonMore, WrapperCard } from '../styled';
import axios from 'axios';
import { Button, FloatButton, Rate } from 'antd';
import { Link, NavLink } from 'react-router-dom';
import { CustomerServiceOutlined } from '@ant-design/icons';

function ProductHomePage() {
  const [products, setProducts] = useState([]);
  const [selectedMemories, setSelectedMemories] = useState({});
  const [cardsToShow, setCardsToShow] = useState();
  const mainContainerRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/category/getAll`);
        const categories = res.data.data;
        const categoryName = 'Điện thoại';
        const category = categories.find((cat) => cat.name === categoryName);
        if (!category) {
          console.error('Không tìm thấy danh mục');
          return;
        }
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/product/getIdByCategory/${category._id}`);
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
    fetchData();
  }, []);

  const calculateCardsPerRow = () => {
    const mainContainer = mainContainerRef.current;
    if (!mainContainer) return;

    const containerWidth = mainContainer.offsetWidth;
    const cardWidth = 200; // Width of each card

    return Math.floor(containerWidth / cardWidth); // Calculate the number of cards per row
  };
  useEffect(() => {
    const mainContainer = mainContainerRef.current;
    if (!mainContainer) return;

    const containerWidth = mainContainer.offsetWidth;
    const cardWidth = 200; // Width of each card

    const cardsPerRow = Math.floor(containerWidth / cardWidth); // Calculate the number of cards per row
    setCardsToShow(cardsPerRow); // Set the number of cards to show initially
  }, [mainContainerRef]);

  const calculateTotalRatings = (product) => {
    if (!product || !product.ratings) {
      return 0;
    }

    return product.ratings.length;
  }

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

  const cardsPerRow = calculateCardsPerRow(); // Calculate the number of cards per row

  const hasMoreProducts = products.length > cardsToShow;
  const calculateAverageRating = (product) => {
    if (product.length === 0) {
      return 0;
    }

    const totalRating = product.reduce((total, item) => total + item.rating, 0);
    return totalRating / product.length;
  }
  return (
    <WrapperCard>
      <img className='imgtt' src="..\..\image\bannerpd.jpg" style={{ width: '100%' }} alt='title'></img>
      <div className='mainContainer' ref={mainContainerRef} style={{ alignItems: 'center', justifyContent: 'center' }}>
        {products
          .filter((product) => product.isHide === false)
          .slice(0, cardsToShow)
          .map((product) => (
            <div className='box' key={product._id} style={{ display: 'flex' }}>
              <div className='card'>
                <NavLink className="image" to={`/product/${product.name}/${selectedMemories[product._id]}`}>
                  <img src={product.thumnails[0]} />
                </NavLink>
                <div className='desc'>
                  <div style={{ height: '3em' }}>
                    <h1 style={{ padding: 3 }}>{product?.name}</h1>
                  </div>
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
                    {product?.ratings.length > 0 ? (
                      <div style={{ display: "flex", gap: '0', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', margin: 0 }}>
                        <Rate style={{ margin: 0 }} disabled allowHalf value={calculateAverageRating(product.ratings)} />
                        <span style={{ margin: 0, height: '25px', fontSize: '13px' }}>Lượt đánh giá: {calculateTotalRatings(product)}</span>
                      </div>
                    ) : (
                      null
                    )}
                    <div style={{ margin: 0 }}>
                      <p style={{ fontWeight: 700, height: '20px', margin: 0 }}>
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
      {hasMoreProducts && (

        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
          <WrapperButtonMore
            textButton="Xem thêm"
            type="outline"
            styleButton={isButtonHovered ? buttonHoverStyle : buttonStyle}
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={() => setIsButtonHovered(false)}
            onClick={() => {
              setCardsToShow(cardsToShow + cardsPerRow); // Increase the number of cards to show
            }}
          >
            Xem thêm
          </WrapperButtonMore>
        </div>
      )}
      <FloatButton.Group shape="circle" style={{ right: 24 }}>
        <FloatButton
          shape="circle"
          type="primary"
          style={{
            right: 94,
          }}
          icon={<CustomerServiceOutlined />}
        />
        <FloatButton.BackTop />
      </FloatButton.Group>
    </WrapperCard>
  );
}

export default ProductHomePage;
