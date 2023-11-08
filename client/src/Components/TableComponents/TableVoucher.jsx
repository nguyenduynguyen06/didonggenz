import React, { useState, useEffect } from "react";
import {  Switch, Table, Image, Upload, Button, message, Modal, Alert} from 'antd';
import axios from "axios";
import 'react-quill/dist/quill.snow.css';
import { UploadOutlined,DeleteOutlined } from '@ant-design/icons';
import { useSelector } from "react-redux";



const TableVoucher = () => {
  const user = useSelector((state)=> state.user)
  const headers = {
    token: `Bearers ${user.access_token}`,
};
    const [voucherData, setvoucherData] = useState([]); 
    const [isDeleteVoucher, setDeleteVoucher] = useState(false); 
    const [currentVoucherId, setCurrentVoucherId] = useState(null);
    const columns = [
      {
        title: 'Tên voucher',
        dataIndex: 'name',
      },
      {
        title: 'Mã khuyến mãi',
        dataIndex: 'code',
      },
      {
        title: 'Ngày bắt đầu',
        dataIndex: 'startDate',
      },
      {
        title: 'Ngày kết thúc',
        dataIndex: 'endDate',
      },
      {
        title: 'Số lượng',
        dataIndex: 'quantity',
      },
      {
        title: '% khuyến mãi',
        dataIndex: 'discount',
        render: discount => `${(discount * 100)}%` 
      },
      {
        title: 'Xoá',
        render: (record) => {
            return (
              <div>
             <a onClick={() => {setDeleteVoucher(true); setCurrentVoucherId(record._id)}}> <DeleteOutlined/></a> 
             <Modal
          title="Xác nhận xoá voucher"
          visible={isDeleteVoucher}
          onOk={() => {
            handleDeleteVoucher(currentVoucherId);
            setDeleteVoucher(false); 
          }}
          onCancel={() => setDeleteVoucher(false)} 
        >
          <p>Bạn có chắc chắn muốn xoá voucher có mã {record.code} này?</p>
        </Modal>
              </div>
            );
          },
      },
    ];
  
    useEffect(() => {
      axios
        .get(`${process.env.REACT_APP_API_URL}/voucher/getVoucher`,{headers})
        .then((response) => {
            setvoucherData(response.data.data); 
        })
        .catch((error) => {
          console.error('Lỗi khi gọi API: ', error);
        });
    }, []);
      const handleDeleteVoucher = (voucherId) => {
        axios
          .delete(`${process.env.REACT_APP_API_URL}/voucher/deleteVoucher/${voucherId}`,{headers})
          .then((response) => {
            if (response.data.success) {
              const updatedData = voucherData.filter((item) => item._id !== voucherId);
              setvoucherData(updatedData);
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
        <Table columns={columns} dataSource={voucherData} /> 
      </div>
    );
  };
  
  export default TableVoucher;