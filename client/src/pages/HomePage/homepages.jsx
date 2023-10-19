import React, { useEffect } from "react";
import { WrapperHomePage } from "./styled";
import { Col, Row } from 'antd'
import Category from '../category/category'
import Slide from "../../Components/Slider/Slide"
import Imagebanner from "./imagebanner";
import ProductHomePage from "./ProducHomePage/producthomepage";
import AccessoryHomePage from "./ProducHomePage/accessoryHomePage";
import Header from "../../Components/Header/header";

const HomePage = () => {
  useEffect(()=>{
    window.scrollTo({top:0,behavior: "instant"})
},[])
  return (
    <div className="home-container">
      <Header></Header>
      <br></br>
      <WrapperHomePage>
        <Col style={{ width: '5%', paddingLeft: '10px', overflow: 'hidden' }}>
        </Col>
        <Col style={{ width: '89%', paddingLeft: '10px', paddingRight: '10px' }}>
          <div >
            <Slide />
          </div>
          <br /> <br />
          <Category></Category>
          <br /><br />
          <ProductHomePage></ProductHomePage>
          <br></br>
          <AccessoryHomePage></AccessoryHomePage>
        </Col>
        <Col style={{ width: '5%', overflow: 'hidden', paddingRight: '20px' }}>
          {/* <Imagebanner>
              </Imagebanner> */}
        </Col>
      </WrapperHomePage>
    </div>

  );
}
export default HomePage