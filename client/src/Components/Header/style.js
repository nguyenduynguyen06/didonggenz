import styled from "styled-components";

export const WrapperSuperHeader = styled.div`
width: 100%;

  .header-container {
    padding: 30px;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    background-image: linear-gradient(to bottom, #004aad,  #cb6ce6);
    align-item:center;
    justify-content: space-around;
    list-style: none;
    background-size: cover;
    gap: 20px;
  }

  .ant-image {
    display: flex;
    position: relative;
    align-self: center;
    cursor: pointer;
    left: 10px;
  }
`


export const WrapperHeader = styled.div`

`;
// export const Search = styled(Search)`
//   .ant-input-search-button {
//     background: #FF3300;
//     display: grid;
//     place-items: center;
//   }
// `;


export const WrapperHeaderImage = styled.div`
.logo img{
  border-radius: 2px;
  width: 162px;
  height: 50px;
}
`;
export const WrapperSearch = styled.div`
  display: flex;
  width: 500px;
`
export const WrapperHeaderAccount = styled.div`
    // margin: 0 50px;
    display : flex;
    align-items: center;
    color: #fff;
    gap: 10px;
    white-space: wrap;
    position: end;
    
    
    
    button.custom-button:hover {
        background-color: #0056b3; /* Màu xanh đậm khi hover */
    }
    .popup {
        position: relative;
        display: inline-block;
        cursor: pointer;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }
`
export const WrapperHeaderProduct = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: flex-start;
    color: #fff;
    font-size: 12px; /* Đặt kích thước chữ là 14px */
    font-weight: bold; /* Đặt độ đậm cho chữ */
    height: 30px;
    // display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 10px;
`;
export const CustomButton = styled.button`
  background-color: #CC0000;
  display: grid;
  place-items: center;
`;


export const WrapperForget = styled.div`
/* CSS cho container chung */
.forget-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 70vh;
}

/* CSS cho form */
.forget-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  width: 100%;
}

.forget-form label {
  margin: 10px 0;
  font-weight: bold;
}

.forget-form input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.forget-form button {
  margin-top: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
}

/* CSS cho thông báo */
.confirmation-message {
  margin: 20px 0;
  font-weight: bold;
}

/* CSS cho nút "Quay lại" */
.back-button {
  background-color: #dc3545;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
}
`

export const WrapperCartButton = styled.div`
button.custom-button {
  background-image: linear-gradient(to bottom, #ff914d,  #ffde59);
  color: #000; 
  padding: 10px 20px; /* Kích thước nút */
  border: none; /* Loại bỏ đường viền */
  border-radius: 5px; /* Bo góc nút */
  cursor: pointer; /* Biến con trỏ thành bàn tay khi hover */
  font-size: 16px; /* Kích thước chữ */
  position: static;
  display : flex;
}
`