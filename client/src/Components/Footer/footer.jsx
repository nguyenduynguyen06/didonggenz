import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import { useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();

  // Kiểm tra xem đường dẫn có chứa "/not-found" hay không
  const isNotFoundPage = location.pathname.includes('/not-found');

  if (isNotFoundPage) {
    // Trả về null nếu là trang "NotFoundPage" (ẩn footer)
    return null;
  }
  return (
    <div>
      <MDBFooter bgColor='light' className='text-center text-lg-start text-muted'>
        <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
          <div className='me-5 d-none d-lg-block'>
            <span style={{ color: 'gray', fontWeight: 'bold' }}>Hãy liên hệ với chúng tôi qua:</span>
          </div>
          <div>
            <a href='https://www.facebook.com/profile.php?id=100012134081325' className='me-4 text-reset'>
              <MDBIcon fab icon="facebook-f" />
            </a>
            <a href='https://www.facebook.com/quangduwon.le' className='me-4 text-reset'>
              <MDBIcon fab icon="google" />
            </a>
            <a href='https://www.instagram.com/le.qdwg/' className='me-4 text-reset'>
              <MDBIcon fab icon="instagram" />
            </a>
            <a href='' className='me-4 text-reset'>
              <MDBIcon fab icon="github" />
            </a>
          </div>
        </section>
        <section className=''>
          <MDBContainer className='text-center text-md-start mt-5'>
            <MDBRow className='mt-3'>
              <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
                <h6 className='text-uppercase fw-bold mb-4'>
                  <MDBIcon icon="gem" className="me-3" />
                  DIDONGGENZ
                </h6>
                <p>
                  "Tận hưởng sự đột phá với DidongGenz - Hành trình vượt bậc vào thế giới công nghệ di động của chúng tôi!"
                </p>
              </MDBCol>

              <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
                <h6 className='text-uppercase fw-bold mb-4'>Sản phẩm</h6>
                <div style={{ display: 'grid' }}>
                <a href='http://localhost:3000/type/%C4%90i%E1%BB%87n%20tho%E1%BA%A1i' className='text-reset'>
                  Điện thoại
                </a>
                <a href='http://localhost:3000/type/%E1%BB%90p%20l%C6%B0ng' className='text-reset'>
                  Ốp lưng
                </a>

                <a href='http://localhost:3000/type/C%C3%A1p%20s%E1%BA%A1c' className='text-reset'>
                  Cáp sạc
                </a>
                <a href='http://localhost:3000/type/S%E1%BA%A1c%20d%E1%BB%B1%20ph%C3%B2ng' className='text-reset'>
                  Sạc dự phòng
                </a>
                <a href='http://localhost:3000/type/Tai%20nghe' className='text-reset'>Tai nghe</a>
                </div>
              </MDBCol>

              <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
                <h6 className='text-uppercase fw-bold mb-4'>Useful links</h6>
                <div style={{ display: 'grid' }}>
                  <a href='#!' className='text-reset'>Pricing</a>
                  <a href='#!' className='text-reset'>Settings</a>
                  <a href='#!' className='text-reset'>Orders</a>
                  <a href='#!' className='text-reset'>Help</a>
                </div>
              </MDBCol>

              <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
                <h6 className='text-uppercase fw-bold mb-4'>Liên hệ</h6>
                <p>
                  <MDBIcon icon="home" className="me-2" />
                  Số 1, Võ Văn Ngân, Đại học Sư phạm Kỹ thuật, thành phố Thủ Đức, Hồ Chí Minh, Việt Nam
                </p>
                <p>
                  <MDBIcon icon="envelope" className="me-3" />
                  quangduongle333@gmail.com
                </p>
                <p>
                  <MDBIcon icon="phone" className="me-3" /> + 01 234 567 88
                </p>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>

        <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
          © 2023 Copyright:
          <a className='text-reset fw-bold' href='/'>
            DiDongGenZ.com
          </a>
        </div>
      </MDBFooter>
    </div >
  )
}

export default Footer