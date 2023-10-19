import React, { useEffect } from "react";
import NavBarComponent from "../../Components/NavBarComponent/navbarcomponent";
import CardComponent from "../../Components/CardComponent/CardComponent";
import { Col, Row } from 'antd'
import ListBrand from "../../Components/ListBrandComponent/ListBrandComponent";
import Header from "../../Components/Header/header";
import FilterCard from "../../Components/CardComponent/filtercard";
import { FilterBAndW } from "@mui/icons-material";
import Slide from "../../Components/Slider/Slide"
import FilterBar from "../../Components/FilterComponent/filterbar";
import CateList from "../../Components/FilterComponent/catelist";
import { WrapperType } from "./style";


const FilterProductPage = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" })
    }, [])
    return (
        <WrapperType>
            <Row>
                <Header />
            </Row>
            <Row>
                <Col style={{ width: '5%', paddingLeft: '10px', overflow: 'hidden' }}>
                </Col>
                <Col style={{ width: '89%', paddingLeft: '10px', paddingRight: '10px' }}>
                    <Row>
                        <br></br>
                        <Slide ></Slide>
                        <br></br>
                        <CateList />
                        <br></br>
                        <ListBrand />
                        <br></br>
                        <FilterBar />
                        <br></br>
                    </Row>
                    <Row style={{ background: '#fff', marginRight: '10px', padding: '10px', borderRadius: '6px' }}>
                        <Col span={24}>
                            <FilterCard />
                        </Col>
                    </Row>
                    <br></br>
                </Col>
                <Col style={{ width: '5%', paddingLeft: '10px', overflow: 'hidden' }}>
                </Col>
            </Row>
        </WrapperType>

    )
}

export default FilterProductPage;