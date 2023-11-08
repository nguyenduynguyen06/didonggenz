import React, { useState, useEffect, useRef } from 'react';
import { WrapperButtonMore, WrapperCard } from '../styled';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { Rate } from 'antd';

function AccessoryHomePage() {
  const [products, setProducts] = useState([]);
  const [cardsToShow, setCardsToShow] = useState();
  const mainContainerRef = useRef(null);

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
      <img className='imgtt' src="..\..\image\banneracc.png" style={{ width: '100%' }} alt='title'></img>
      <div className='mainContainerAcc' ref={mainContainerRef} style={{ alignItems: 'center', justifyContent: 'center' }}>
        {products.filter((product) => product.isHide === false).slice(0, cardsToShow).map((product) => (
          <div className='box' key={product._id}>
            <div className='card' >
              <NavLink className="image" to={`/product/${product.name}/undefined`}>
                <img src={product.thumnails[0]} />
              </NavLink>
              <div className='desc' >
                <div style={{ height: '3em' }}>
                  <h1 style={{ padding: 3 }}>{product?.name}</h1>
                </div>
                <div>
                  {product?.ratings.length > 0 ? (
                    <div style={{ display: "flex", gap: '0', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', margin: 0 }}>
                      <Rate style={{ margin: 0 }} disabled allowHalf value={calculateAverageRating(product.ratings)} />
                      <span style={{ margin: 0, height: '25px', fontSize: '13px' }}>Lượt đánh giá: {calculateTotalRatings(product)}</span>
                    </div>
                  ) : (
                    null
                  )}
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
            }}          >
          </WrapperButtonMore>
        </div>)}
    </WrapperCard>
  );
}

export default AccessoryHomePage;
