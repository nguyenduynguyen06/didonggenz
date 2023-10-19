import React, { useState } from 'react';
import { Rate } from 'antd';
import { WrapperRate } from './style';
const Rating = () => {
    return (
        <WrapperRate>
            <div className='boxReview'>
                <h2 className='title is-6'>Đánh giá và nhận xét</h2>
                <div className='boxReview-review is-flex'>
                    <div className='boxReview-score is-flex is-justify-content-center is-align-items-center has-product'>
                        <p className='title is-4 m-0 p-0'>4.9/5</p>
                        <div className='item-star'>
                            <Rate disabled allowHalf defaultValue={4} />
                        </div>
                        <p className='boxReview-score__count'>
                            <strong>65</strong> đánh giá
                        </p>
                    </div>
                    <div className='boxReview-star is-flex is-justify-content-space-evenly has-product'>
                        <div className='rating-level is-flex is-align-items-center is-justify-content-space-evenly'>
                            <div className='star-count is-flex is-align-items-center'>
                                <span className='has-text-weight-bold'>5</span>
                                <svg class="star-icon" xmlns="http://www.w3.org/2000/svg" height="15" viewBox="0 10 100 100">
                                    <polygon points="50,10 61.8,35.9 88.5,39.1 69.1,60.9 75,86 50,72 25,86 30.9,60.9 11.5,39.1 38.2,35.9" />
                                </svg>
                            </div>
                            <progress max='65' className='progress is-small m-0' value={58}></progress>
                            <span className='is-size-7'>58 đánh giá</span>
                        </div>
                        <div className='rating-level is-flex is-align-items-center is-justify-content-space-evenly'>
                            <div className='star-count is-flex is-align-items-center'>
                                <span className='has-text-weight-bold'>4</span>
                                <svg class="star-icon" xmlns="http://www.w3.org/2000/svg" height="15" viewBox="0 10 100 100">
                                    <polygon points="50,10 61.8,35.9 88.5,39.1 69.1,60.9 75,86 50,72 25,86 30.9,60.9 11.5,39.1 38.2,35.9" />
                                </svg>
                            </div>
                            <progress max='65' className='progress is-small m-0' value={7}></progress>
                            <span className='is-size-7'>7 đánh giá</span>
                        </div>
                        <div className='rating-level is-flex is-align-items-center is-justify-content-space-evenly'>
                            <div className='star-count is-flex is-align-items-center'>
                                <span className='has-text-weight-bold'>3</span>
                                <svg class="star-icon" xmlns="http://www.w3.org/2000/svg" height="15" viewBox="0 10 100 100">
                                    <polygon points="50,10 61.8,35.9 88.5,39.1 69.1,60.9 75,86 50,72 25,86 30.9,60.9 11.5,39.1 38.2,35.9" />
                                </svg>
                            </div>
                            <progress max='65' className='progress is-small m-0' value={0}></progress>
                            <span className='is-size-7'>0 đánh giá</span>
                        </div>
                        <div className='rating-level is-flex is-align-items-center is-justify-content-space-evenly'>
                            <div className='star-count is-flex is-align-items-center'>
                                <span className='has-text-weight-bold'>2</span>
                                <svg class="star-icon" xmlns="http://www.w3.org/2000/svg" height="15" viewBox="0 10 100 100">
                                    <polygon points="50,10 61.8,35.9 88.5,39.1 69.1,60.9 75,86 50,72 25,86 30.9,60.9 11.5,39.1 38.2,35.9" />
                                </svg>
                            </div>
                            <progress max='65' className='progress is-small m-0' value={0}></progress>
                            <span className='is-size-7'>0 đánh giá</span>
                        </div>
                        <div className='rating-level is-flex is-align-items-center is-justify-content-space-evenly'>
                            <div className='star-count is-flex is-align-items-center'>
                                <span className='has-text-weight-bold'>1</span>
                                <svg class="star-icon" xmlns="http://www.w3.org/2000/svg" height="15" viewBox="0 10 100 100">
                                    <polygon points="50,10 61.8,35.9 88.5,39.1 69.1,60.9 75,86 50,72 25,86 30.9,60.9 11.5,39.1 38.2,35.9" />
                                </svg>
                            </div>
                            <progress max='65' className='progress is-small m-0' value={0} ></progress>
                            <span className='is-size-7'>0 đánh giá</span>
                        </div>
                    </div>
                </div>
                <div className='box-review-filter'>
                    <div className='title is-6' >Lọc theo</div>
                    <div className='filter-container is-flex'>
                        <div className='filter-item active'>
                            <a href='' color='white'>Tất cả</a>
                        </div>
                        <div className='filter-item'>Có hình ảnh</div>
                        <div className='filter-item'>Đã mua hàng</div>
                    </div>
                    <div className='filter-container is-flex'>
                        <div className='filter-item star'>
                            <span className='has-text-weight-bold'>1</span>
                            <svg class="star-icon" xmlns="http://www.w3.org/2000/svg" height="15" viewBox="0 10 100 100">
                                <polygon points="50,10 61.8,35.9 88.5,39.1 69.1,60.9 75,86 50,72 25,86 30.9,60.9 11.5,39.1 38.2,35.9" />
                            </svg>
                        </div>
                        <div className='filter-item star'>
                            <span className='has-text-weight-bold'>2</span>
                            <svg class="star-icon" xmlns="http://www.w3.org/2000/svg" height="15" viewBox="0 10 100 100">
                                <polygon points="50,10 61.8,35.9 88.5,39.1 69.1,60.9 75,86 50,72 25,86 30.9,60.9 11.5,39.1 38.2,35.9" />
                            </svg>
                        </div>
                        <div className='filter-item star'>
                            <span className='has-text-weight-bold'>3</span>
                            <svg class="star-icon" xmlns="http://www.w3.org/2000/svg" height="15" viewBox="0 10 100 100">
                                <polygon points="50,10 61.8,35.9 88.5,39.1 69.1,60.9 75,86 50,72 25,86 30.9,60.9 11.5,39.1 38.2,35.9" />
                            </svg>
                        </div>
                        <div className='filter-item star'>
                            <span className='has-text-weight-bold'>4</span>
                            <svg class="star-icon" xmlns="http://www.w3.org/2000/svg" height="15" viewBox="0 10 100 100">
                                <polygon points="50,10 61.8,35.9 88.5,39.1 69.1,60.9 75,86 50,72 25,86 30.9,60.9 11.5,39.1 38.2,35.9" />
                            </svg>
                        </div>
                        <div className='filter-item star'>
                            <span className='has-text-weight-bold'>5</span>
                            <svg class="star-icon" xmlns="http://www.w3.org/2000/svg" height="15" viewBox="0 10 100 100">
                                <polygon points="50,10 61.8,35.9 88.5,39.1 69.1,60.9 75,86 50,72 25,86 30.9,60.9 11.5,39.1 38.2,35.9" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div className='boxReview-comment'>
                    <div className='boxReview-comment-item'>
                        <div className='boxReview-comment-item-title' style={{ display: 'flex' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <div>
                                    <img className='avt'></img>
                                </div>
                                <div className='block-info' style={{ display: 'flex', columnGap: '50px' }}>
                                    <div className='block-info__name'>
                                        <span className='name' style={{ fontSize: '15px', fontWeight: 600 }}>Lê Quang Dương</span>
                                    </div>
                                    <p className='date-time' style={{ display: 'flex', marginTop: '15px' }}>
                                        <div className='icon-clock' style={{ display: 'flex' }}></div>
                                        6/10/2023 21:37
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className='boxReview-comment-item-review'>
                            <div className='item-review-rating'>
                                <div className='item-review-rating__star'>
                                    <Rate disabled allowHalf defaultValue={4} style={{ fontSize: '16px', alignItems: 'center', display: 'flex' }} />
                                </div>
                            </div>
                            <div className='item-review-comment'>
                                <div className='comment-content'>
                                    <p style={{ maxWidth: '100%' }}>
                                        Quá đẹp và mãn nhãn
                                    </p>
                                    <div style={{ display: 'flex', gap: '10px'}} className='img-rate'>
                                        <img src='../../image/logo.png'></img>
                                        <img src='../../image/logo.png'></img>
                                        <img src='../../image/logo.png'></img>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* xóa đoạn ở dưới khi ghép*/}
                    <div className='boxReview-comment-item'>
                        <div className='boxReview-comment-item-title' style={{ display: 'flex' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <div>
                                    <img className='avt'></img>
                                </div>
                                <div className='block-info' style={{ display: 'flex', columnGap: '50px' }}>
                                    <div className='block-info__name'>
                                        <span className='name' style={{ fontSize: '15px', fontWeight: 600 }}>Lê Quang Dương</span>
                                    </div>
                                    <p className='date-time' style={{ display: 'flex', marginTop: '15px' }}>
                                        <div className='icon-clock' style={{ display: 'flex' }}></div>
                                        6/10/2023 21:37
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className='boxReview-comment-item-review'>
                            <div className='item-review-rating'>
                                <div className='item-review-rating__star'>
                                    <Rate disabled allowHalf defaultValue={4} style={{ fontSize: '16px', alignItems: 'center', display: 'flex' }} />
                                </div>
                            </div>
                            <div className='item-review-comment'>
                                <div className='comment-content' style={{ width: '100%' }}>
                                    <p style={{ maxWidth: '100%' }}>
                                        Quá đẹp và mãn nhãn
                                    </p>
                                    <div style={{ display: 'flex', gap: '10px'}} className='img-rate'>
                                        <img src='../../image/logo.png'></img>
                                        <img src='../../image/logo.png'></img>
                                        <img src='../../image/logo.png'></img>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Xóa tới đây */}
                </div>
            </div>
        </WrapperRate >
    );
}
export default Rating;