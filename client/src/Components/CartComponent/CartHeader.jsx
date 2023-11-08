// src/CartComponent/CartItem.js
import Search from 'antd/es/input/Search';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { HeaderWrapper } from './style';

function CartHeader({ product, removeFromCart }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const handleSearch = (query) => {
    setSearchQuery(query);
  };
  useEffect(() => {
    if (searchQuery.trim() !== '') {
      axios.get(`${process.env.REACT_APP_API_URL}/product/searchProduct?keyword=${searchQuery}`)
        .then((response) => {
          setSearchResults(response.data.data);
        })
        .catch((error) => {
          console.error('Error searching products:', error);
        });
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);
  return (
    <HeaderWrapper>
      <div className="header-wrapper">
        <div className='header-container'>
          <div className='cart-page-header'>
            <a className='cart-page-logo' href='#'>
              <div viewBox="0 0 192 65" className='logo-icon'>
                <img src='../../image/didong2.png' />
              </div>
              <div className='cart-page-name'>Giỏ hàng</div>
            </a>
          </div>
        </div>
      </div>
    </HeaderWrapper>

  );
}

export default CartHeader;
