import { Row } from "antd";
import styled from "styled-components";
import ButtonComponent from "../../Components/ButtonComponent/ButtonComponent";

export const WrapperHomePage = styled(Row)`

width: 100%;
height:100%;
overflow: hidden;
overflow-x: hidden
font-family: Palatino, sans-serif;
`

export const WrapperNa = styled.div`
display: flex;
    align-items: center;
    gap: 10px;
    justify-content: flex-start;
    color: #fff;
    font-size: 12px; 
    font-weight: bold; 
    height: 40px;
`

export const CardContainer = styled.div`
//   width: 100%; /* Chiều rộng tùy thuộc vào phần tử cha */
//   padding-top: 100%; /* Tỉ lệ 4:3 */
  position: relative;
  display: flex;

`;

export const CardContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

`;

export const WrapperCard = styled.div`
  *{
    margin: 0;
    padding: 0;
  }
  .imgtt {
    border-radius: 8px 8px 0 0;
  }
  .title {
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    font-size: 24px;
    color: #fff;
    padding: 10px;
    text-transform: uppercase;
    font-family:Helvetica, Arial,  sans-serif;
    text-align: center;
    border-radius: 4px;
  }
  .mainContainer {
    width:100%;
    background-image: linear-gradient(to left, #FE9100,  #F29600);
    display: grid;
    grid-template-columns: repeat(7, minmax(200px, 1rem));
    align-items: center;
    row-gap: 20px;
    overflow: hidden;
    padding: 20px;
    column-gap: 20px;
    border-radius: 0 0 8px 8px;
  }
  .mainContainerAcc {
    width:100%;
    background-image: linear-gradient(to left, #5f2b89,  #5f2b89);
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1rem));
    align-items: center;
    justify-content: space-between; 
    row-gap: 20px;
    overflow: hidden;
    padding: 20px;
    column-gap: 12px;
    border-radius: 0 0 8px 8px;
  }

  .box {
    background: #fff;
    text-align: center;
    transition: .3s ease-in-out;
    max-width: 100%;
    width: auto;
  }

   .box:hover {
    box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
    transform: scale(1.05);
  }

   .card {
    // padding: 15px 15px 0;
    width: 100%;
  }

  .card .image {
    width:100%;
    backgroud: #f9f9f9;
    margin: 20px auto;
    position: relative;
  }

  // .card .image::before {
  //   content: "";
  //   position: absolute;
  //   width: 10px;
  //   height: 10px;
  //   botton: 8px;
  //   left: 10px;
  //   border-radius: 50%;
  //   background-color: red;
  // }

  .card .image:hover img {
    transform: scale(1.1);
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

  .btn {
    width: 100%;
    padding: 12px 33px;
    margin-top: 15px;
    border: none;
    color: #fff;
    font-weight: 600;
    text-transform: uppercase;
    cursor: pointer;
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
    .mainContainer{
      padding: 0 3rem;
      justify-content: center;
    }

    .card .image {
      width: 50%
    }
  }

  @media screen and (max-width: 1000px) {
    .mainContainer {
      grid-template-columns: repeat(auto-fit, minmax(100px, 200px));
      padding: 5rem 3rem;
      column-gap: 6px;
    }
    .card .image img {
      width:90px;
      transition: .3s ease-in-out;
      cursor: pointer;
    }
    .mainContainer .box:hover {
      box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
      transform: scale(1);
    }
    .card .image:hover img {
      transform: scale(1.3);
    }
  }

  button#show-more {
    background: #fff;
    color: #ff3300;
    padding: 10px 20px;
    cursor: pointer;
    margin: 0 auto;
    display: block;
    transition: .3s ease-in-out;
    border-radius: 5%;
    font-size:15px;
    border: 1px #000;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  }
  
  button#show-more:hover {
    background: #ff3300;
    color: #fff;
    border:none
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  }
`

export const WrapperButtonMore = styled(ButtonComponent)`
  &:hover {
    color:#fff;
    background: #ff3300
    span {
      color: #fff;
    }
  }
  width: 100%;
  text-align: center;
`