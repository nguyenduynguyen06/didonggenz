import { Col, Image, InputNumber, Row, Table } from "antd";
import styled from "styled-components";
import ButtonComponent from "../../Components/ButtonComponent/ButtonComponent";
import Slider from 'react-slick';


export const WrapperStyleImageBig = styled.div`
display: flex;
justify-contents: center;
    .slider-image {
        display: block;
        object-fit: contain;
        max-width: 100%;
        height: 400px;
    }
    .slider-image img{
        width: auto;
        height: 400px;
    }
`
export const WrapperStyleImageSmall = styled(Image)`
    height: 100px;
    width: 100px;
`

export const WrapperStyleColImage = styled(Col)`
    flex-basis: unset;
    display: flex;
`
export const WrapperStyleNameProduct = styled.h1`
    color: rgb(36,36,36);
    font-size: 24px;
    font-weight: 300;
    line-height: 32px;
    word-break: break-word;
`
export const WrapperStyleTextSell = styled.div`
    p {
    padding: 20px 0 0 0;
    font-size: 15px;
    line-height: 0px;
    color: rgb(120, 120, 120);
    }
`
export const WrapperPriceProduct = styled.span`
    background: rgb(250, 250, 250);
    border-radius: 4px;
    font-size: 20px;



`
export const WrapperPriceTextProduct = styled.span`
    font-size: 32px;
    line-height: 40px;
    margin-right: 8px;
    font-weight: 500;
    padding: 10px;
    margin-top: 10px;
    color: #ff3300
`

export const WrapperAddressProduct = styled.div`
    span.address{
        text-decoration: underline;
        font-size: 15px;
        line-height: 24px;
        font-weight: 500;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsisl;
    };
    span.change-address{
        color: rgb(11,116,229);
        font-size:  16px;
        line-height: 24px;
        font-weight: 500;
    }
`
export const WrapperQuantityProduct = styled.div`
    display: flex;
    gap: 4px;
    align-items: center;
    border-radius: 4px;
    border: 1px solid #ccc;
    width: 120px;

    .ant-input-number-handler-wrap {
        display: none;
      }
`

export const WrapperInputNumber = styled(InputNumber)`
    &.ant-input-number.ant-input-number-sm {
        width: 40px;
        border-top: none;
        border-bottom: none;
        &.ant-input-number-handler-wrap {
            display: none !important;
        }
    }
`

export const WrapperPropTable = styled(Table)`
    max-height: 500px; /* Đặt chiều cao tối đa của bảng */
    overflow-y: scroll; /* Kích h
`
export const WrapperSeeMore = styled.div`
    padding-top: 30px;
    color: #0492c2;
`
export const WrapperDesc = styled.div`
    .product-description {
        word-wrap: break-word;
        overflow-wrap: break-word;
    }
    .product-image {
        max-width: 100%;
        height: auto;
        width: auto;
      }
`

export const WrapperButton = styled(Col)`
      .btn {
        background: #fff;
        color: #ff3300;
        border: 1px solid #ff3300;
      }
      .btn:hover {
        background: #ff3300;
        color: #fff;
      }
      
`
export const WrapperTextBox = styled(Col)`
      .textbox {
        border-radius: 5px;
        border: 1px solid #ccc;
        transition: .5s ease-in-out;
        padding: 10px;
    }
`
export const WrapperInfo = styled(Row)`
    .nameinput {
        border-radius: 5px;
        border: none;
        transition: .5s ease-in-out;
        margin-right: 20px;
        padding: 10px;
        box-shadow: 0 1px 2px 0 rgba(60,64,67,.1), 0 2px 6px 2px rgba(60,64,67,.15);
        width: auto;
        
    }
    .label {
        font-size: 14px;
    }
    .checkbox{
        margin-left: 7px;
        box-shadow: 0 1px 2px 0 rgba(60,64,67,.1), 0 2px 6px 2px rgba(60,64,67,.15);

    }
`
export const WrapperComment = styled(Row)`
    .singlecmt .name{
        margin-bottom:0px;
        color: #ff3300;
        font-weight: '700'
    }
    .singlecmt .content{
        font-size: 15px;
        margin-bottom:2px;
        font-style: italic;
    }
    .singlecmt button{
        background: white;
        border: none;
        margin-left:10px;
        
    }
`
export const WrapperCommentNew = styled.div`
    .comment-container {
        background-color: #f9fafb;
        border-radius: 10px;
        box-shadow: 0 1px 2px 0 rgba(60,64,67,.1), 0 2px 6px 2px rgba(60,64,67,.15);
        margin-top: 15px;
        padding: 10px;
        width: 100%;
    }
    .error-msg {
        color: red;
        font-size: 14px;
        margin-top: 4px;
      }
    .comment-form{
        display: block;
    }
    .comment-container .comment-form-content {
        width: 100%;
        display: flex;
        justify-content: space-between;
    }
    .comment-container .textarea-comment {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
        position: relative;
        width: 100%;
    }
    .comment-container .textarea-comment .icon-img {
        left: 10px;
        top: 10%;
        position: absolute;
        z-index: 1;
    }
    .comment-container .textarea-comment .icon-img img{
        height: auto;
        max-width: 100%;
    }
    .comment-container .textarea-comment .textarea {
        border: 0;
        border-radius: 10px;
        box-shadow: 0 0 10px 0 rgba(60,64,67,.1), 0 2px 6px 2px rgba(60,64,67,.15);
        min-width: 0!important;
        padding-left: 85px;
        width: calc(100%-80px);
    }
    .textarea:not([rows]) {
        max-height: 40em;
        min-height: 8em;
    }
    .textarea {
        display: block;
        max-width: 100%;
        padding: calc(.75em - 1px);
        resize: vertical;
        vertical-align: top;
        position: relative;
        line-height:1.5;
        font-size: 1rem;
        font-family: sans-serif!important;
    }
    .btn-send {
        background-color: #ff3300;
        border: 0;
        color: #fff;
        gap: 5px;
        width: 100px;
        cursor: pointer;
        justify-content: center;
        padding: calc(.5em - 1px) 1em;
        text-align: center;
        white-space: nowrap;
        align-items: center;
        line-height: 1.5;
        display: inline-flex;
        font-size: 1rem;
        font-family: sans-serif!important;
        height: 40px;
        border-radius: 5px;
        margin-left: 20px;
    }
    
    .comment-container .block-comment-list {
        display: block;
    }
    .comment-container .list-comment{
        display: block;
    }
    .box-cmt {
        margin-bottom: 15px;
        display: block;
    }
    .cmt-inf {
        display: flex;
        justify-content: space-between;
        margin-bottom: 15px;
        margin-top: 10px;
    }
    .box-inf{
        align-items: center;
        display: flex;  
    }
    .box-inf .box-inf-avt span{
        background-color: #4f5675;
        color: #fff;
        align-items: center;
        border-radius: 50%;
        display: flex;
        font-size: 16px;
        font-weight: 700;
        height: 25px;
        justify-content: center;
        margin: 0 5px 0 0;
        text-transform: capitalize;
        width: 25px;
    }

    .box-inf .box-inf-name {
        font-size: 14px;
        font-weight: 700;
        line-height: 2;
        margin: 0;
        text-transform: capitalize;
    }
    .cmt-quest {
        background: #fff;
        border-radius: 10px;
        box-shadow: 0 1px 2px 0 rgba(60,64,67,.1), 0 2px 6px 2px rgba(60,64,67,.15);
        margin-left: auto;
        overflow: hidden;
        padding: 10px;
        width: calc(100% - 25px);
        display: block;
    }
    .cmt-quest .content{
        font-size: 13px;
        margin: 0;
        font-family: sans-serif!important;
    }
    .btn-rep {
        align-items: center;
        background-color: transparent;
        border: 0;
        color: #ff3300;
        cursor: pointer;
        display: flex;
        font-size: 14px;
        line-height: 1;
        margin-left: auto;
        margin-top: 10px;
        -webkit-text-decoration: none;
        text-decoration: none;
    }
    .cmt-rep {
        margin-left: auto;
        margin-top: 15px;
        width: calc(100% - 25px);
    }
`
export const WrapperDetail = styled.div`
    .slider {
        height: 400px; /* Đặt chiều cao cố định cho slider ở đây */
        overflow: hidden;
        align-items: center;
        justify-contents: center;
    }
    
`
export const WrapperPolicy = styled(Row)` 
    .policy_intuitive {
        border: 1px solid #e0e0e0;
        border-radius: 5px;
        margin-bottom: 25px;
    }
    .policy {
        margin: 20px 16px 0 16px;
        padding: 12px 0;
    }
    .policy__list{
        display: flex;
        flex-wrap: wrap;
        list-style: none;
    }
    .policy__list li{
        padding-right: 20px;
        border-bottom: 1px solid #f1f1f1;
        position: relative;
        padding: 12px 0 12px 35px;
        width: 50%;
        display: inline-block;
    }
    .policy__list p{
        line-height: 20px;
        padding-left: 5px;
    }
`
export const WrapperRate = styled.div`
width: 100%;
    .boxReview{
        border-radius: 10px;
        box-shadow: 0 1px 2px 0 rgba(60,64,67,.1), 0 2px 6px 2px rgba(60,64,67,.15);
        margin-bottom: 15px;
        padding: 1rem;
        width: 66%;
        background: #fff;
    }
    .title.is-6 {    
        font-size: 1rem;
    }
    .boxReview .boxReview-review {
    border-bottom: 1px solid #e5e7eb;
    height: auto;
    margin-bottom: 20px;
    overflow: hidden;
    padding-bottom: 20px;
    display: flex!important;
    width: 100%;

}
.boxReview .boxReview-review .boxReview-score{
    border-right: 1px solid #e5e7eb;
    flex-direction: column;
    margin-right: 5%;
    width: 40%;
    display:flex;
    align-items: center!important;
    justify-content: center!important;
}
    .title{
        font-size: 1.5rem;
    }
    .boxReview .boxReview-review .boxReview-score .boxReview-score__count{
            color: #0c53b7;
        cursor: pointer;
        text-decoration: underline;
    }
    .boxReview .boxReview-review .boxReview-star{
        flex-direction: column;
        width: 100%;
        display: flex;
        justify-content: space-evenly!important;
    }
    .star-icon{
        fill: #FFD700
    }
    .rating-level{
        display: flex!important;
        align-items: center!important;
        justify-content: space-evenly!important;
    }
    .boxReview-star progress{
        border-radius: 5px;
        height: 8px;
        width: 70%;
    }
      
      progress::-moz-progress-bar {
        background: #ccc;
      }
      
      progress::-webkit-progress-value {
        background: #5f2b89;
      }
      
      progress::-webkit-progress-bar {
        background: #ccc;
      }
      
    .boxReview .box-review-filter{
        margin-top: 10px;
    }
    .box-review-filter .title{
        font-size: 20px;
        margin-bottom: 10px;
        font-weight: 600;
    }
    
    .filter-container {
        gap: 10px;
        margin-bottom: 10px;
        overflow: auto;
        width: 100%;
        display: flex;!important;
    }
    .filter-item.active{
        background-color: #5f2b89;
        border: none;

    }
    .filter-item.active a{
        color: #fff;
        
    }
    .filter-item{
        align-items: center;
    background-color: #fff;
    border: 1px solid #637381;
    border-radius: 15px;
    color: #637381;
    cursor: pointer;
    display: flex;
    font-size: 14px;
    gap: 10px;
    padding: 3px 12px;
    white-space: nowrap;
    }
    .boxReview-comment {
        margin: 30px 0 15px;
        width: 100%;
    }
    .boxReview-comment-item {
        border-bottom: 1px solid rgba(145,158,171,.239);
        margin-bottom: 15px;
        padding-bottom: 15px;
    }
    .avt img{
        width: 60px;
        height: 60px;
    }
    .block-info__name{
        align-items: center;
        display: flex;
        gap: 15px;
    }
    .date-time{
        align-items: center;
        color: #707070;
        display: flex;
        font-size: 12px;
        gap: 5px;
        padding-top: 3px;
        text-align: right;
    }
    .boxReview-comment-item-review {
        margin-left: 40px;
        padding: 10px 15px 0 0;
        width: calc(100% - 40px);
    }
    .item-review-rating {
        align-items: center;
        flex-wrap: wrap;
        font-size: 12px;
        display: flex;
        gap: 10px;
        align-items: center;
    }
    .item-review-comment {
        font-size: 12px;
        margin-top: 15px;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
    }
    .comment-content {
        width: 100%;
    }
    .boxReview-comment-item-review {
        margin-left: 40px;
        padding: 10px 15px 0 0;
        width: calc(100% - 40px);
    }
    .boxReview-comment-item {
        border-bottom: 1px solid rgba(145,158,171,.239);
        margin-bottom: 15px;
        padding-bottom: 15px;
    }
    .img-rate{
        width: 100%;
        height: 100%;
      }
      .img-rate img{
        width: 100px;
        height: auto;
      }
`


export const WrapperSlider = styled(Slider)`
    width: 100%;
    background: #fff;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    align-items: center;
    justify-content: space-between; 
    overflow: hidden;
    gap: 6px;
    border-radius: 0 0 8px 8px;
    padding: 10px;
    .box {
        background: #fff;
        text-align: center;
        transition: .3s ease-in-out;
        max-width: 100%;
        width: auto;
    }
   .card {
    width: 100%;
    }

  .card .image {
    width:100%;
    backgroud: #f9f9f9;
    margin: 20px auto;
    position: relative;
  }



  .card .image img {
    width:180px;
    transition: .3s ease-in-out;
    cursor: pointer;
  }
  .memory-button.selected {
    border: 1px solid #00BFFF	;
  }
  .card .desc {
    width: 100%;
    margin: auto;
    line-height: 3;
    height: 11em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal
  }

  .card .desc h1 {
    font-size: 15px;
    text-transform: uppercase;
  }

  .card .desc p {
    font-size: 12px;
  }

  .card span {
    font-size: 15px;
  }
  .box .btn,
  .box .card .image::before {
    background: #ff3300;
  }

    .box .card p {
    color: #ff3300;
    font-size: 15px;
  }

  @media screen and (max-width: 998px) {
    padding: 0 3rem;
    justify-content: center;

    .card .image {
      width: 50%
    }
  }

  @media screen and (max-width: 1000px) {
      grid-template-columns: repeat(auto-fit, minmax(100px, 200px));
      padding: 5rem 3rem;
      column-gap: 6px;
    .card .image img {
      width:90px;
      transition: .3s ease-in-out;
      cursor: pointer;
    }
`


