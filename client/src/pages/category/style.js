import styled from "styled-components";
import Card from "antd/es/card/Card";

export const CardWrapper = styled(Card)`

  
  p {
      font-size: 17px;
      margin-bottom: 15px;
      color: #000;
      font-weight: 500;

  }
  .centered-grid {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .img-fluid {
      padding-top: 20px;
      width: 50%;
      height: auto;
    }
  .img-fluid img{
      width: 150px;
      height: 150px;
} 
`