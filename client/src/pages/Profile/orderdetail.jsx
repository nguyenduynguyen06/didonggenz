import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Col, Modal, Row, message } from "antd";
import ReviewModal from "./review";
import { ArrowLeftOutlined } from "@ant-design/icons"
import { WrapperDetailOrder } from "./order/style";
import Header from "../../Components/Header/header";
import { MDBBtn, MDBModalContent, MDBModalDialog } from "mdb-react-ui-kit";
import moment from 'moment';
import { useSelector } from "react-redux";

const OrderDetail = () => {
    const { orderCode } = useParams();
    const user = useSelector((state)=> state.user)
    const [completeOrder, setCompleteOrder] = useState(false); 
    const [cancelOrder, setCancelOrder] = useState(false); 
    const [centredModal1, setCentredModal1] = useState(false);
    const [currentProductId, setCurrentProductId] = useState(null);
    const toggleShow1 = () => setCentredModal1(!centredModal1);
    const handleReviewClick = (productId) => {
        toggleShow1();
        setCurrentProductId(productId);
    };    
    const [orderDetails, setOrderDetails] = useState(null);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/order/oderDetails/${orderCode}?userId=${user._id}`)
          .then((response) => {
            setOrderDetails(response.data.data)
          })
          .catch((error) => {
            console.error('Lỗi khi gọi API: ', error);
          });
      }, [orderCode]);
      const updateOrderDetails = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/order/oderDetails/${orderCode}?userId=${user._id}`)
          .then((response) => {
            setOrderDetails(response.data.data)
          })
          .catch((error) => {
            console.error('Lỗi khi gọi API: ', error);
          });
      };
      
    const goBack = () => {
        window.history.back();
    };
    const handleCompleteOrder = async (orderCode ) => {
        try {
          const response = await axios.put(`${process.env.REACT_APP_API_URL}/order/completeOrderUser/${orderCode}?userId=${user._id}`);
          if (response.data.success) {
            message.success('Hoàn thành đơn hàng thành công');
            window.history.back();
          }
        } catch (error) {
          console.error('Lỗi khi xác nhận đơn hàng:', error);
          message.error('Đã xảy ra lỗi khi xác nhận đơn hàng');
        }
      }; 
      const handleCancelOrder = async (orderCode ) => {
        try {
          const response = await axios.put(`${process.env.REACT_APP_API_URL}/order/cancel/${orderCode}?userId=${user._id}`);
          if (response.data.success) {
            message.success('Huỷ đơn hàng thành công');
            window.history.back();
          }
        } catch (error) {
          console.error('Lỗi khi xác nhận đơn hàng:', error);
          message.error('Đã xảy ra lỗi khi xác nhận đơn hàng');
        }
      }; 
      
    return (
        <div>
            <Header></Header>
            <br></br>
            <WrapperDetailOrder>
                <Col style={{ width: '20%', paddingLeft: '10px', overflow: 'hidden' }}>
                </Col>
                <Col style={{ width: '60%', paddingLeft: '10px', paddingRight: '10px' }}>
                    <div>
                        <div className="nav">
                            <button className="btn-back" onClick={goBack}>
                                <ArrowLeftOutlined />&nbsp;Quay lại
                            </button>
                            <h5 style={{ textAlign: 'center', textTransform: 'uppercase' }}>Thông tin đơn hàng</h5>
                            <h5 style={{ textAlign: 'center', color: 'transparent'}}> nothinghere  </h5>
                        </div>
                        {orderDetails && (
                            <div>
                                <div style={{ background: '#14d9c5', fontWeight: 600, color: '#fff', border: '1px solid #efefef', borderRadius: '4px', display: 'flex', padding: '12px 10px 0 10px' }}>
                                    <p>Tình trạng đơn hàng:&nbsp;
                                        <span>{orderDetails.status}</span>
                                    </p>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', padding: '10px', border: '1px solid #efefef', borderRadius: '4px' }}>
                                    <label style={{ margin: '0 0 5px 0', fontWeight: 600 }}>Địa chỉ nhận hàng:</label>
                                    <p style={{ margin: 0 }}>{orderDetails.userName}</p>
                                    <p style={{ margin: 0 }}>{orderDetails.userPhone}</p>
                                    <p style={{ margin: 0 }}>{orderDetails.address}</p>
                                </div>
                                {orderDetails.items.map((item, index) => (
                                <div style={{ display: 'flex', flexDirection: 'column', padding: '10px', gap: '10px', border: '1px solid #efefef', borderRadius: '4px' }}>
                                        <div key={index} style={{ padding: '10px', border: '1px solid #ccc' }} className='pre-order'>
                                            <Row style={{ height: 'auto' }}>
                                                <Col span={3} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                    <img  className='img-product' src={item.pictures} style={{ height: 'auto', width: '100%' }} alt={`Product ${index + 1}`} />
                                                </Col>
                                                <Col span={21} style={{ padding: '0 0 0 10px' }}>
                                                    <div style={{ width: '100%' }}>
                                                        <a href="/" className="pdname" style={{ margin: 0, color: '#000' }}>{item.product.name} {item.memory}</a>
                                                    </div>
                                                    <div>
                                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                            <p style={{ margin: 0 }}>Phân loại:&nbsp;<span>{item.color}</span></p>
                                                            <div>
                                                                <p style={{ margin: 0 }}>{new Intl.NumberFormat('vi-VN', {style: 'currency',currency: 'VND'}).format(item.price)}   </p>
                                                                <p style={{ margin: 0, textAlign: 'right' }}>x<span>{item.quantity}</span></p>
                                                            </div>

                                                            {orderDetails.completeDate && (
                                                                <div>
                                                                    <p style={{ margin: 0 }}>Hạn bảo hành: </p>
                                                                    <p style={{ margin: 0 }}>
                                                                    {item.change.dateChange ? (
                                                                        moment(item.change.dateChange, 'DD/MM/YYYY HH:mm:ss')
                                                                        .add(item.product.warrantyPeriod, 'months')
                                                                        .format('DD-MM-YYYY')
                                                                    ) : (
                                                                        moment(orderDetails.completeDate, 'DD/MM/YYYY HH:mm:ss')
                                                                        .add(item.product.warrantyPeriod, 'months')
                                                                        .format('DD-MM-YYYY')
                                                                    )}
                                                                    </p>
                                                                </div>
                                                                )}
                                                        {orderDetails && orderDetails.status === "Đã hoàn thành" ? (
                                                            item.rated ? (
                                                                <span style={{ color: "#ff3300" }}>Đã đánh giá</span>
                                                            ) : (
                                                                <a style={{ color: "#ff3300" }} onClick={() => handleReviewClick(item.product._id)}> Đánh giá</a>
                                                            )
                                                        ) : null}
                                                        </div>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                </div>
                                     ))}
                                <p style={{ textAlign: 'right', padding: '10px', background: '#fff', border: '1px solid #ff3300', borderRadius: '4px', fontWeight: 600 }}>
                                    Thành tiền:&nbsp;<span style={{ color: "#ff3300" }}>{new Intl.NumberFormat('vi-VN', {style: 'currency',currency: 'VND'}).format(orderDetails.totalPay)}</span>
                                </p>
                                <div style={{ padding: '10px', border: '1px solid #efefef', borderRadius: '4px' }}>
                                    <h6 style={{ margin: '0 0 5px 0' }}>Phương thức thanh toán:</h6>
                                    <p>{orderDetails.paymentMethod}</p>
                                </div>
                                <div style={{ padding: '10px', background: '#fff', border: '1px solid #efefef', borderRadius: '4px' }}>
                                    <p>Mã đơn hàng:&nbsp;<span>{orderDetails.orderCode}</span></p>
                                    <p>Thời gian đặt hàng:&nbsp; <span>{orderDetails.createDate}</span></p>
                                    <p>Thời gian hoàn thành đơn hàng:&nbsp; <span>{orderDetails?.completeDate}</span></p>
                                </div>
                            </div>
                        )}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                         {orderDetails && (orderDetails.status === "Chờ xác nhận" || orderDetails.status === "Đơn hàng đang được chuẩn bị") && (
                                <MDBBtn style={{ backgroundColor: "#8c52ff", width: '49%' }} onClick={() => setCancelOrder(true)}>Yêu cầu hủy/trả hàng</MDBBtn>
                          )}
                        {orderDetails && orderDetails.status === "Đơn hàng đang được giao" && (
                            <MDBBtn style={{ color: '#8c52ff', backgroundColor: '#FFF', width: '49%' }}   onClick={() => setCompleteOrder(true)}>Đã nhận được hàng</MDBBtn>
                        )}
                             <Modal
         title="Hoàn thành đơn hàng"
         visible={completeOrder}
         onOk={() => {
            handleCompleteOrder(orderCode)
            setCompleteOrder(false); 
         }}
         onCancel={() => setCompleteOrder(false)} 
       >
       <p>Bạn có chắc chắn muốn hoàn thành đơn hàng này</p>
       </Modal>
       <Modal
         title="Huỷ đơn hàng"
         visible={cancelOrder}
         onOk={() => {
            handleCancelOrder(orderCode)
            setCancelOrder(false); 
         }}
         onCancel={() => setCancelOrder(false)} 
       >
       <p>Bạn có chắc chắn muốn huỷ đơn hàng này</p>
       </Modal>
                    </div>
                    <Modal
                        visible={centredModal1}
                        onCancel={toggleShow1}
                        footer={null}>
                        <MDBModalDialog size='xl'>
                        <MDBModalContent>
                         <ReviewModal productId={currentProductId} onClose={() => {toggleShow1();updateOrderDetails();}}orderCode={orderCode}></ReviewModal>
                        </MDBModalContent>
                        </MDBModalDialog>
                        </Modal>
                </Col>
                <Col style={{ width: '20%', paddingLeft: '10px', overflow: 'hidden' }}>
                </Col>
            </WrapperDetailOrder>
        </div>
    );
}

export default OrderDetail;
