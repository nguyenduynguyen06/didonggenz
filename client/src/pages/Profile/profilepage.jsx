import React, { useEffect, useState  } from 'react';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBListGroupItem,
  MDBCardTitle,
  MDBCardLink,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
} from 'mdb-react-ui-kit';
import { Card, Modal } from 'antd';
import UpdateUser from './updateUser';
import ChangePassword from './changepass'
import axios from 'axios';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import { useSelector } from "react-redux";


const Profilepage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" })
}, [])
  const user = useSelector((state)=> state.user)
    const [centredModal1, setCentredModal1] = useState(false);
    const [centredModal2, setCentredModal2] = useState(false);

    const toggleShow1 = () => setCentredModal1(!centredModal1);
    const toggleShow2 = () => setCentredModal2(!centredModal2);

    function checkFile(file) {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        message.error('Bạn chỉ có thể tải lên tệp tin JPG/PNG!');
      }
      return isJpgOrPng;
    }
    const props = {
      name: 'image',
      action: `${process.env.REACT_APP_API_URL}/uploadUser/${user._id}`,
      onChange(info) {
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully.`);
          window.location.reload();
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
      beforeUpload: checkFile,
    };
  return (
    <section style={{ backgroundColor: '#eee' }}>
    <MDBContainer className="py-5">

      <MDBRow>
        <MDBCol lg="4">
          <MDBCard className="mb-4">
            <MDBCardBody className="text-center">
                            <img
                  src={user.avatar}
                  alt='avatar'
                  className="rounded-circle"
                  style={{ width: '150px' }}
                />
            
                 <div className="text-muted mb-1"></div>
                 <Upload {...props}>
                 <MDBBtn style={{ backgroundColor: '#E8E8E8' , color: "black"}}  > <UploadOutlined/> Ảnh đại diện</MDBBtn>
                 </Upload>
              <div className="text-muted mb-1"></div>
              <div className="d-flex justify-content-center mb-2">
              <MDBBtn onClick={toggleShow1} style={{backgroundColor: "#FF3300",border: '2px solid black'}}>Cập nhật thông tin</MDBBtn>
              <MDBBtn onClick={toggleShow2} className="ms-1" style={{ border: '2px solid #FF3300', color: 'red',backgroundColor:'#F5F5F5' }}>Đổi mật khẩu</MDBBtn>
              </div>
            </MDBCardBody>
          </MDBCard>
          <Card title="Voucher hiện có">
          <MDBCard style={{ maxWidth: '540px' }}>
            <MDBCardTitle className="ms-1"> Khuyến mãi 30%</MDBCardTitle>
              <MDBListGroupItem className="ms-1">Mô tả: Sử dụng cho việc giảm giá 30% sản phẩm </MDBListGroupItem>
            <MDBListGroupItem className="ms-1">Ngày áp dụng: 20/10/2023</MDBListGroupItem>
            <MDBListGroupItem className="ms-1">Ngày hết hạn: 21/10/2023</MDBListGroupItem>
          <MDBListGroupItem className="ms-1">Trạng thái: Còn hạn</MDBListGroupItem>
          </MDBCard>
          </Card>
        </MDBCol>
        <MDBCol lg="8">
          <MDBCard className="mb-4">
            <MDBCardBody>
              <MDBRow>
                <MDBCol sm="3">
                  <MDBCardText>Họ và Tên</MDBCardText>
                </MDBCol>
                <MDBCol sm="9">
                  <MDBCardText className="text-muted">{user.fullName}</MDBCardText>
                </MDBCol>
              </MDBRow>
              <hr />
              <MDBRow>
                <MDBCol sm="3">
                  <MDBCardText>Email</MDBCardText>
                </MDBCol>
                <MDBCol sm="9">
                  <MDBCardText className="text-muted">{user.email}</MDBCardText>
                </MDBCol>
              </MDBRow>
              <hr />
              <MDBRow>
                <MDBCol sm="3">
                  <MDBCardText>Số điện thoại</MDBCardText>
                </MDBCol>
                <MDBCol sm="9">
                  <MDBCardText className="text-muted">{user.phone_number}</MDBCardText>
                </MDBCol>
              </MDBRow>
              <hr />
              <MDBRow>
                <MDBCol sm="3">
                  <MDBCardText>Ngày sinh</MDBCardText>
                </MDBCol>
                <MDBCol sm="9">
                  <MDBCardText className="text-muted">{user.birthDay}</MDBCardText>
                </MDBCol>
              </MDBRow>
              <hr />
              <MDBRow>
                <MDBCol sm="3">
                  <MDBCardText>Địa chỉ</MDBCardText>
                </MDBCol>
                <MDBCol sm="9">
                  <MDBCardText className="text-muted">{user.addRess}</MDBCardText>
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBCard>
    
          <MDBRow>
            <MDBCol sm="20">
              <MDBCard className="mb-4 mb-md-0">
              <Card title="Đơn hàng đã mua">
                    
                    <MDBCard style={{ maxWidth: '540px' }}>
                    <MDBRow className='g-0'>
                        <MDBCol md='4'>
                        <MDBCardImage src='https://cdn.tgdd.vn/Products/Images/42/289700/iphone-14-pro-max-den-thumb-600x600.jpg' alt='...' fluid />
                        </MDBCol>
                        <MDBCol md='7'>
                        <MDBCardBody>
                        <MDBCardTitle>Iphone 14 ProMax 256GB</MDBCardTitle>
                        <MDBListGroupItem>Chính hãng VN(A)</MDBListGroupItem>
                        <MDBListGroupItem style={{color: 'red', fontWeight:'bolder',fontSize:'20px'}}>36.600.000 đ</MDBListGroupItem>
                        <MDBListGroupItem >Địa chỉ: Hồ Chí Minh</MDBListGroupItem>
                        <MDBListGroupItem >Trạng thái: Đã giao</MDBListGroupItem>
                       
                        </MDBCardBody>
                        </MDBCol>
                        <MDBCol> <MDBCardLink>More</MDBCardLink></MDBCol>
                    </MDBRow>
                    </MDBCard>
                        
                    </Card>
                    <Card >
                    <MDBCard style={{ maxWidth: '540px' }}>
                    <MDBRow className='g-0'>
                        
                        <MDBCol md='4'>
                        <MDBCardImage src='https://cdn.tgdd.vn/Products/Images/42/289700/iphone-14-pro-max-den-thumb-600x600.jpg' alt='...' fluid />
                        </MDBCol>
                        <MDBCol md='7'>
                        <MDBCardBody>
                        <MDBCardTitle>Iphone 14 ProMax 256GB</MDBCardTitle>
                        <MDBListGroupItem>Chính hãng VN(A)</MDBListGroupItem>
                        <MDBListGroupItem style={{color: 'red', fontWeight:'bolder',fontSize:'20px'}}>36.600.000 đ</MDBListGroupItem>
                        <MDBListGroupItem >Địa chỉ: Hồ Chí Minh</MDBListGroupItem>
                        <MDBListGroupItem >Trạng thái: Đã giao</MDBListGroupItem>
                       
                        </MDBCardBody>
                        </MDBCol>
                        <MDBCol> <MDBCardLink>More</MDBCardLink></MDBCol>
                    </MDBRow>
                    </MDBCard>
                        
                    </Card>
              </MDBCard>
            </MDBCol>

           
          </MDBRow>
        </MDBCol>
      </MDBRow>
    </MDBContainer>




    <Modal 
        visible={centredModal1}
        onCancel={toggleShow1}
        footer ={null}>

        <MDBModalDialog size='xl'>
          <MDBModalContent>
            <UpdateUser></UpdateUser>
          </MDBModalContent>
        </MDBModalDialog>
      </Modal>
      <Modal 
        visible={centredModal2}
        onCancel={toggleShow2}
        footer ={null}>
        <MDBModalDialog size='xl'>
          <MDBModalContent>
            <ChangePassword></ChangePassword>
          </MDBModalContent>
        </MDBModalDialog>
      </Modal>
  </section>
  )
}

export default Profilepage