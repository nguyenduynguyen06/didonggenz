import React, { useEffect, useState } from 'react';
import { Col, Row, Segmented } from 'antd';
import Tab from './tab';
import Header from '../../../Components/Header/header';


const Orders = () => {
    return (
        <div>
            <Header></Header>
            <br></br>
            <Row>
                <Col style={{ width: '5%', paddingLeft: '10px', overflow: 'hidden' }}></Col>
                <Col style={{ width: '89%', paddingLeft: '10px', paddingRight: '10px' }}>
                    <Tab />
                </Col>
                <Col style={{ width: '5%', paddingLeft: '10px', overflow: 'hidden' }}></Col>
            </Row>
        </div>

    )
}

export default Orders