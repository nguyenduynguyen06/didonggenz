import React, { useState, useEffect } from "react";
import {  Switch, Table, Image, Upload, Button, message, Modal, Alert} from 'antd';
import axios from "axios";
import 'react-quill/dist/quill.snow.css';
import { UploadOutlined,DeleteOutlined } from '@ant-design/icons';



const TableBrand = () => {
    const [brandData, setbrandData] = useState([]); 
    const [isDeleteBrand, setDeleteBrand] = useState(false); 
    const [currentBrandId, setCurrentBrandId] = useState(null);
    const columns = [
      {
        title: 'Tên thương hiệu',
        dataIndex: 'name',
      },
      {
        title: 'Hình ảnh',
        dataIndex: 'picture',
        render: (picture) => (
          <Image src={picture} width={100} height={100} /> 
        ),
      },
      {
        title: 'Thay đổi ảnh',
        render: (record) => {
            const props = {
                name: 'image',
                action: `${process.env.REACT_APP_API_URL}/uploadBrand/${record._id}`,
                headers: {
                  authorization: 'authorization-text',
                },
                accept: '.jpg, .jpeg, .png',
                beforeUpload: (file) => {
                  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
                  if (!isJpgOrPng) {
                    message.error('Chỉ cho phép tải lên tệp JPG hoặc PNG!');
                  }
                  return isJpgOrPng;
                },
                onChange(info) {
                  if (info.file.status === 'done') {
                    message.success(`${info.file.name} file uploaded successfully`);
                    updateBrandData(record._id, info.file.response.imageUrl);
                  } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                  }
                }
              };
              const updateBrandData = (brandId, newImageUrl) => {
                const updatedData = brandData.map((item) =>
                  item._id === brandId ? { ...item, picture: newImageUrl } : item
                );
                setbrandData(updatedData);
              };
            return (
            <Upload {...props} >
            <Button icon={<UploadOutlined />}>Ảnh</Button>
          </Upload>
            )
        }
      },
      
      {
        title: 'Ẩn/Hiện',
        dataIndex: 'isHide',
        render: (isHide, record) => {
            return (
              <div>
                <Switch
                  checked={!isHide}
                  onChange={(checked) => handleSwitchChange(checked, record._id)}
                />
              </div>
            );
          },
      },
      {
        title: 'Danh mục',
        dataIndex: 'categoryId',
        render: category => category.name,
      },
      {
        title: 'Xoá',
        render: (record) => {
            return (
              <div>
             <a onClick={() => {setDeleteBrand(true); setCurrentBrandId(record._id)}}> <DeleteOutlined/></a> 
             <Modal
          title="Xác nhận xoá thương hiệu"
          visible={isDeleteBrand}
          onOk={() => {
            handleDeleteBrand(currentBrandId);
            setDeleteBrand(false); 
          }}
          onCancel={() => setDeleteBrand(false)} 
        >
          <p>Bạn có chắc chắn muốn xoá thương hiệu {record.name} này?</p>
        </Modal>
              </div>
            );
          },
      },
    ];
  
    useEffect(() => {
      axios
        .get(`${process.env.REACT_APP_API_URL}/brand/getBrand`)
        .then((response) => {
            setbrandData(response.data.data); 
        })
        .catch((error) => {
          console.error('Lỗi khi gọi API: ', error);
        });
    }, []);
    const handleSwitchChange = (checked, brandId) => {
        const newIsHide = !checked; 
        axios
          .put(`${process.env.REACT_APP_API_URL}/brand/updateBrand/${brandId}`, { isHide: newIsHide })
          .then((response) => {
            const updatedData = brandData.map((item) =>
              item._id === brandId ? { ...item, isHide: newIsHide } : item
            );
            setbrandData(updatedData);
          })
          .catch((error) => {
            console.error('Lỗi khi cập nhật trạng thái: ', error);
          });
      };
      const handleDeleteBrand = (brandId) => {
        axios
          .delete(`${process.env.REACT_APP_API_URL}/brand/delete/${brandId}`)
          .then((response) => {
            if (response.data.success) {
              const updatedData = brandData.filter((item) => item._id !== brandId);
              setbrandData(updatedData);
              message.success('Xóa thương hiệu thành công');
            } else {
              message.error('Lỗi khi xóa thương hiệu');
            }
          })
          .catch((error) => {
            console.error('Lỗi khi gọi API xóa thương hiệu: ', error);
            message.error('Lỗi khi xóa thương hiệu');
          });
      };
    return (
      <div>
           <Alert
            message="Lưu ý: Không được xoá những thương hiệu đang hiện vì nó đang chứa các sản phẩm, nếu xoá sẽ bị lỗi, chỉ xoá những thương hiệu lỗi nếu quá trình thêm bị sai"
            type="warning"
            showIcon
            style={{ marginBottom: '16px',background:'#FFFF99' }}
          />
        <Table columns={columns} dataSource={brandData} /> 
      </div>
    );
  };
  
  export default TableBrand;