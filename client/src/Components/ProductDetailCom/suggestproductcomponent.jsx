import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { WrapperSlider } from './style';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { RightCircleFilled, LeftCircleFilled } from '@ant-design/icons'

function SuggestProduct() {
    const [products, setProducts] = useState([]);
    const [visibleProducts, setVisibleProducts] = useState();
    const CustomPrevArrow = (props) => (
        <div {...props} className="custom-prev-arrow" style={{ width: '5%', cursor: 'pointer', position: 'absolute', paddingLeft: '10px', zIndex: '1' }}>
            <LeftCircleFilled style={{ fontSize: '30px' }}/>
        </div>
    );

    const CustomNextArrow = (props) => (
        <div {...props} className="custom-next-arrow" style={{ width: '5%', cursor: 'pointer', position: 'absolute', zIndex: '1', paddingLeft: '10px', right: 0 }}>
            <RightCircleFilled style={{ fontSize: '30px' }} />
        </div>
    );
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5, // Hiển thị 5 sản phẩm trên mỗi slide
        slidesToScroll: 3, // Trượt qua 5 sản phẩm khi bấm "Next"
        prevArrow: <CustomPrevArrow />, // Thêm nút "prev" tùy chỉnh
        nextArrow: <CustomNextArrow />, // Thêm nút "next" tùy chỉnh

    };


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
    const handleCardClick = (product) => {
        const url = `/product/${product.name}/undefined`;
        window.location.href = url;
    };

    const containerStyle = {
        maxHeight: 'none'
    };


    return (
        <WrapperSlider {...settings}>
            {products.filter((product) => product.isHide === false).slice(0, visibleProducts).map((product) => (
                <div className='box' key={product._id}>
                    <div className='card' onClick={() => handleCardClick(product)} style={{ cursor: 'pointer' }}>
                        <div className='image' onClick={() => handleCardClick(product)} style={{ display: 'flex', justifyContent: 'center'}}>
                            <img src={product.thumnails[0]} />
                        </div>
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
        </WrapperSlider>
    );
}

export default SuggestProduct;
