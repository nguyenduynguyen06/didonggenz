import React, { useState, useEffect } from 'react'
import { Card } from 'antd';
import { CardWrapper } from './style';
import axios from 'axios';
import { Link, NavLink } from 'react-router-dom';

const gridStyle = {
  width: '20%',
  textAlign: 'center',
  fontSize: 'auto',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '5px',
  minHeight: '185px',
  height: 'auto',
};
const Category = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {

    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/category/getAll`);
        setCategories(response.data.data);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách danh mục:', error);
      }
    };
    fetchCategories();
  }, []);
  return (
    <div>
      <div style={{padding: '10px', backgroundImage: 'linear-gradient(to right, #5170ff,  #ff66c4)', borderRadius:'6px 6px 0 0'}}>
      <span style={{ fontSize: '24px', color: '#fff', fontWeight: 600, textTransform: 'uppercase' }} >Danh mục</span>
      </div>
      <CardWrapper >
        {categories.filter((category) => category.isHide === false).map((category) => (      
          <Card.Grid
            key={category._id}
            style={{ ...gridStyle, height: '100px',backgroundImage: 'linear-gradient(to right, #94b9ff,  #cdffd8)' }}
            >
            <NavLink to={`/lowtoHigh/${category.name}`}>
            <img src={category.picture} className='img-fluid rounded' alt='' />
            <p>{category.name}</p>
            </NavLink>
          </Card.Grid>
        ))}
      </CardWrapper>
    </div>

  )
}

export default Category