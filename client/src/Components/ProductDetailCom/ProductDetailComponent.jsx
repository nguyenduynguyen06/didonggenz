import React, { useState, useEffect } from "react"
import { Button, Col, Image, Row, Table, Rate } from 'antd'
import {
    WrapperStyleColImage,
    WrapperStyleImageSmall,
    WrapperStyleImageBig,
    WrapperStyleNameProduct,
    WrapperStyleTextSell,
    WrapperPriceTextProduct,
    WrapperPriceProduct,
    WrapperQuantityProduct,
    WrapperInputNumber,
    WrapperPropTable,
    WrapperDetail,
    WrapperPolicy,
} from "./style"
import { PlusOutlined, MinusOutlined, RetweetOutlined, PropertySafetyOutlined, DropboxOutlined,GiftOutlined } from '@ant-design/icons'
import ButtonComponent from "../ButtonComponent/ButtonComponent"
import ProductDescription from "./productdesscription"
import CommentBox from "./commentcomponent"
import axios from "axios"
import { NavLink, useParams } from "react-router-dom"
import './button.css'
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Rating from "./ratecomponent"
import SuggestProduct from "./suggestproductcomponent"
import ProductSale from "./productsale"


const { Column, ColumnGroup } = Table;

const ProductDetailComponents = () => {

    const [productDetails, setProductDetails] = useState(null);
    const { productName, memory } = useParams();
    const [selectedColor, setSelectedColor] = useState({});
    const [selectedSold, setSelectedSold] = useState({});
    const [selectedMemories, setSelectedMemories] = useState({});
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        appendDots: (dots) => (
            <ul style={{ position: 'absolute', bottom: '5px', left: '50%', transform: 'translateX(-50%)', listStyle: 'none', padding: '0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {dots}
            </ul>)
    };

    useEffect(() => {
        if (memory !== `undefined`) {
            axios.get(`${process.env.REACT_APP_API_URL}/product/getDetails/${productName}/${memory}`)
                .then((response) => {
                    const productDetails = response.data.data;
                    setProductDetails(productDetails);

                    const defaultMemory = memory;

                    const initialMemories = {
                        [productDetails._id]: defaultMemory
                    };

                    setSelectedMemories(initialMemories);


                    if (productDetails && productDetails.variant) {
                        productDetails.variant.forEach((variant) => {
                            if (variant.memory === defaultMemory && variant.attributes && variant.attributes.length > 0) {
                                const defaultColor = variant.attributes[0].color;
                                setSelectedColor((prevSelected) => ({
                                    ...prevSelected,
                                    [variant._id]: defaultColor,
                                }));


                                const selectedAttribute = variant.attributes.find((attribute) => attribute.color === defaultColor);
                                if (selectedAttribute) {
                                    setSelectedSold((prevSelected) => ({
                                        ...prevSelected,
                                        [variant._id]: selectedAttribute.sold,
                                    }));
                                }
                            }
                        });
                    }
                })
                .catch((error) => {
                    console.error('Error fetching product details:', error);
                });
        } else {
            axios.get(`${process.env.REACT_APP_API_URL}/product/getDetails/${productName}/${memory}`)
                .then((response) => {
                    const productDetails = response.data.data;
                    setProductDetails(productDetails);

                    const initialMemories = {
                        [productDetails._id]: productDetails.variant[0].memory
                    };

                    setSelectedMemories(initialMemories);


                    if (productDetails && productDetails.variant) {
                        productDetails.variant.forEach((variant) => {
                            if (variant.memory === productDetails.variant[0].memory && variant.attributes && variant.attributes.length > 0) {
                                const defaultColor = variant.attributes[0].color;
                                setSelectedColor((prevSelected) => ({
                                    ...prevSelected,
                                    [variant._id]: defaultColor,
                                }));


                                const selectedAttribute = variant.attributes.find((attribute) => attribute.color === defaultColor);
                                if (selectedAttribute) {
                                    setSelectedSold((prevSelected) => ({
                                        ...prevSelected,
                                        [variant._id]: selectedAttribute.sold,
                                    }));
                                }
                            }
                        });
                    }
                })
                .catch((error) => {
                    console.error('Error fetching product details:', error);
                });
        }
    }, [productName, memory]);



    const [quantity, setQuantity] = useState(1); // Đặt giá trị ban đầu là 3

    const handleDecreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleIncreaseQuantity = () => {

        setQuantity(quantity + 1);
    };
    const handleChange = (value) => {
        setQuantity(value);
    };


    const dataSource = productDetails && productDetails.properties
        ? Object.keys(productDetails.properties).map((propertyKey) => ({
            key: propertyKey,
            prop: propertyKey,
            info: productDetails.properties[propertyKey] || 'N/A',
        }))
        : [];
    if (memory !== `undefined`) {
        dataSource.unshift({
            key: '0',
            prop: 'Dung lượng lưu trữ',
            info: memory,
        });
    }
    const handleMemoryClick = (newMemory) => {
        const newUrl = `/product/${productName}/${newMemory}`;
        window.location.href = newUrl
    };

    return (
        <WrapperDetail>
            <Row style={{ padding: '15px 12px' }}>
                {productDetails ? (
                    memory !== `undefined` ? (
                        <div style={{ display: "flex", gap: '20px' }}>
                            <WrapperStyleNameProduct style={{ fontWeight: 'bold' }}>
                                {productDetails.name} {memory}
                            </WrapperStyleNameProduct>
                            <Rate disabled allowHalf defaultValue={4} />
                            <span style={{ fontSize: 16, paddingTop: 6 }}>{4}</span>
                        </div>

                    ) : (
                        <div>
                            <WrapperStyleNameProduct style={{ fontWeight: 'bold' }}>{productDetails.name}</WrapperStyleNameProduct>
                        </div>
                    )
                ) : (
                    <p>Loading...</p>
                )}
            </Row>
            <Row style={{ padding: '16px', background: '#fff', borderRadius: '4px' }}>
                <Col span={14} style={{ border: '1px solid #e5e5e5', padding: '8px' }}>
                    <Slider {...sliderSettings} className="slider" style={{ border: '1px solid #ccc', borderRadius: '4px' }}>
                        {productDetails && productDetails.thumnails.map((thumbnail, index) => (
                            <WrapperStyleImageBig key={index}>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <Image src={thumbnail} alt={`Thumbnail ${index}`} className="slider-image" />
                                </div>
                            </WrapperStyleImageBig>
                        ))}
                    </Slider>
                    <Row style={{ marginTop: '10px', paddingTop: '10px', justifyContent: 'flex-start', border: '1px solid #ccc', borderRadius: '4px' }}>
                        {productDetails && productDetails.variant && selectedMemories[productDetails._id] ? (
                            productDetails.variant
                                .filter((variant) => variant.memory === selectedMemories[productDetails._id])
                                .map((variant) =>
                                    variant.attributes ? (
                                        variant.attributes.map((attribute, attributeIndex) => (
                                            <WrapperStyleColImage key={attributeIndex} span={3} >
                                                <WrapperStyleImageSmall src={attribute.pictures} alt={`Attribute ${attributeIndex}`} preview={false} />
                                            </WrapperStyleColImage>
                                        ))
                                    ) : null
                                )
                        ) : null}
                    </Row>
                    <hr></hr>
                    <WrapperPolicy>
                        <div className="policy_intuitive cate42 scenarioNomal">
                            <div className="policy">

                                <ul className="policy__list">
                                    <li>
                                        <RetweetOutlined style={{ fontSize: '30px', left: 0, position: 'absolute', top: '18px' }}></RetweetOutlined>
                                        <p>
                                            1 đổi 1 trong&nbsp;
                                            <b>7 ngày&nbsp;</b>đối với sản phẩm là điện thoại và trong thời gian bảo hành đối với sản phẩm là phụ kiện&nbsp;
                                            <a href="/" title="Chính sách dổi trả">Xem chi tiết</a>
                                        </p>
                                    </li>
                                    {productDetails && productDetails.warrantyPeriod ? (
                                        <li data-field="IsSameBHAndDT">
                                            <PropertySafetyOutlined style={{ fontSize: '30px', left: 0, position: 'absolute', top: '18px' }}></PropertySafetyOutlined>
                                            <p>Bảo hành chính hãng điện thoại&nbsp;
                                                <b>{productDetails.warrantyPeriod} tháng</b> tại các trung tâm bảo hành hãng&nbsp;
                                                <a href="/" title="Chính sách bảo hành">Xem chính sách bảo hành</a>
                                            </p>
                                        </li>
                                    ) : (
                                        <li data-field="IsSameBHAndDT">
                                            <PropertySafetyOutlined style={{ fontSize: '30px', left: 0, position: 'absolute', top: '18px' }}></PropertySafetyOutlined>
                                            <p> Không bảo hành
                                            </p>
                                        </li>
                                    )}
                                    {productDetails && productDetails.include ? (
                                        <li>
                                            <DropboxOutlined style={{ fontSize: '30px', left: 0, position: 'absolute', top: '18px' }}></DropboxOutlined>
                                            <p>Bộ sản phẩm gồm Bộ sản phẩm gồm: {productDetails.include} </p>
                                        </li>
                                    ) : null}
                                </ul>

                            </div>
                        </div>
                    </WrapperPolicy>
                </Col>
                <Col span={10} style={{ paddingLeft: '10px' }}>
                    <div style={{ padding: '0 0 10px' }}>
                        {productDetails?.variant.map((variant) => (
                            variant?.memory && (
                                <NavLink to={`/product/${productName}/${variant.memory}`}>
                                <Button
                                    className={` memory-button ${variant?.memory === selectedMemories[productDetails._id] ? 'selected' : ''}`}
                                    onClick={() => {
                                        setSelectedMemories((prevSelected) => ({
                                            ...prevSelected,
                                            [productDetails._id]: variant?.memory,
                                        }));
                                    }}
                                    style={{ padding: '5px 5px', marginInlineEnd: '5px' }}>                  
                                    {variant?.memory}
                                </Button>
                                </NavLink>
                            )
                        ))}
                    </div>
                    <div >
                        {productDetails?.variant.map((variant) => {
                            if (variant.attributes && variant.attributes.length > 0) {
                                const colors = variant.attributes.map((attribute) => attribute.color);
                                const uniqueColors = [...new Set(colors)];
                                if (variant.memory === selectedMemories[productDetails._id]) {
                                    return (
                                        <div style={{ padding: '10xp' }} key={variant._id}>
                                            {uniqueColors.map((color, index) => (
                                                <Button
                                                    key={index}
                                                    className={`memory-button ${color === selectedColor[variant._id] ? 'selected' : ''
                                                        }`}
                                                    onClick={() => {
                                                        setSelectedColor((prevSelected) => ({
                                                            ...prevSelected,
                                                            [variant._id]: color,
                                                        }));
                                                        const selectedAttribute = variant.attributes.find(
                                                            (attribute) => attribute.color === color
                                                        );
                                                        if (selectedAttribute) {
                                                            setSelectedSold((prevSelected) => ({
                                                                ...prevSelected,
                                                                [variant._id]: selectedAttribute.sold,
                                                            }));
                                                            console.log('selectedSold', selectedSold[variant._id])
                                                        } else {
                                                            setSelectedSold((prevSelected) => ({
                                                                ...prevSelected,
                                                                [variant._id]: 'N/A',
                                                            }));
                                                        }
                                                    }}
                                                    style={{ padding: '5px 5px', marginInlineEnd: '5px' }}
                                                >
                                                    {color}
                                                </Button>
                                            ))}
                                            <WrapperStyleTextSell>
                                                <p>Đã bán: {selectedSold[variant._id]}</p>
                                            </WrapperStyleTextSell>
                                        </div>
                                    );
                                }
                            }
                            return null;
                        })}
                    </div>

                    {productDetails ? (
                        <WrapperPriceProduct>
                            <WrapperPriceProduct style={{ color: '#000', textDecoration: 'line-through', height: '20px' }}>
                                {productDetails?.variant.find((variant) => variant.memory === selectedMemories[productDetails._id])?.oldPrice?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                            </WrapperPriceProduct>
                            <WrapperPriceTextProduct>
                                {productDetails?.variant.find((variant) => variant.memory === selectedMemories[productDetails._id])?.newPrice?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                            </WrapperPriceTextProduct>
                        </WrapperPriceProduct>
                    ) : (
                        <p>Loading...</p>
                    )}

                    <div style={{ margin: '10px 0 20px', padding: '10px 0', borderTop: '1px solid #e5e5e5', borderBottom: '1px solid #e5e5e5' }}>
                        <div style={{ marginBottom: '10px' }}>Số lượng:</div>
                        <WrapperQuantityProduct>
                            <button
                                style={{ border: 'none', background: 'transparent' }}
                                onClick={handleDecreaseQuantity}>
                                <MinusOutlined style={{ color: '#000', fontSize: '20px' }} />
                            </button>
                            <WrapperInputNumber
                                type="number"
                                value={quantity}
                                onChange={handleChange}
                                size="small"
                                style={{ width: '60px' }}
                                upHandler={null}
                                downHandler={null}
                            />
                            <button
                                style={{ border: 'none', background: 'transparent' }}
                                onClick={handleIncreaseQuantity}>
                                <PlusOutlined style={{ color: '#000', fontSize: '20px' }} />
                            </button>
                        </WrapperQuantityProduct>
                    </div >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <ButtonComponent
                            bordered={false}
                            size={40}
                            styleButton={{
                                background: 'rgb(225,57,69)',
                                height: '48px',
                                width: '220px',
                                border: 'none',
                                borderRadius: '4px'
                            }}
                            textButton={'Mua ngay'}
                            styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}>
                        </ButtonComponent>
                        <ButtonComponent
                            bordered={false}
                            size={40}
                            styleButton={{
                                background: '#fff',
                                height: '48px',
                                width: '220px',
                                border: '1px solid rgb(13,92,182)',
                                borderRadius: '4px'
                            }}
                            textButton={'Thêm vào giỏ'}
                            styleTextButton={{ color: 'rgb(13,92,182)', fontSize: '15px' }}>
                        </ButtonComponent>
                    </div>
                    <br></br>
                    <div style={{ height: '600px',  textAlign: 'justify'}}>
                        {productDetails &&  productDetails.promotion ? (
                            <div style={{fontSize:'20px'}}> 
                            <div style={{fontSize:'40px',color:'red'}}> <GiftOutlined /> Khuyến mãi </div>
                            <div>(chỉ áp dụng tại cửa hàng)</div> 
                            <ProductSale promotion={productDetails.promotion} />
                            </div>
                        ) : (
                            null
                        )}
                    </div>
                </Col>
            </Row>

            <hr className="my-4" />
            <Row style={{ padding: '16px', background: '#fff', borderRadius: '4px' }}>
                <Col span={16} style={{ border: '1px solid #e5e5e5', padding: '10px', borderRadius: '4px' }}>
                    <h3>Mô tả sản phẩm</h3>
                    <div style={{ height: '600px', overflowY: 'scroll', textAlign: 'justify' }}>
                        {productDetails ? (
                            <ProductDescription description={productDetails.desc} />
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>
                </Col>
                <Col span={8} style={{ paddingLeft: '10px', textAlign: 'center' }}>
                    <WrapperPropTable dataSource={dataSource} pagination={false}>
                        <ColumnGroup title="Thông số kỹ thuật">
                            <Column dataIndex="prop" key="prop" />
                            <Column dataIndex="info" key="info" />
                        </ColumnGroup>
                    </WrapperPropTable>
                </Col>
            </Row>
            <hr className="my-4" />
            {memory !== "undefined" && (
                <Row>
                    <SuggestProduct></SuggestProduct>
                </Row>
            )}
            <hr className="my-4" />
            <Row>
                <Rating></Rating>
            </Row>
            <hr className="my-4" />
            <Row >
                <CommentBox />
            </Row>
            <hr className="my-4" />
        </WrapperDetail>
    )
}

export default ProductDetailComponents;