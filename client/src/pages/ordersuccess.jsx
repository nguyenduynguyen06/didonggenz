import React from 'react';
import { CheckCircleOutlined } from '@ant-design/icons';
import { Button, Row } from 'antd';

const OrderSuccess = () => {
    

    return (
        <div className='container' style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Row style={{ alignItems: 'center' }}>
                <CheckCircleOutlined style={{ color: 'green', fontSize: '4rem' }} />
            </Row>
            <p style={{fontSize: '2.5rem', color: '#ff3300'}}>Đặt hàng thành công!</p>
            <p style={{fontSize: '1.25rem'}}>Chúng tôi sẽ liên hệ Quý khách để xác nhận đơn hàng trong thời gian sớm nhất!Có thể xem chi tiết đơn hàng ở email hoặc nhấp vào nút dưới</p>
            <Row style={{display: 'flex', gap: '20px'}}>
                <Button href='/profile' size='large'>Xem chi tiết đơn hàng</Button>
                <Button href='/' style={{background: "#8c52ff", color: '#fff'}} size='large'> Tiếp tục mua hàng
                </Button>
            </Row>
        </div>
    );
}

export default OrderSuccess;
