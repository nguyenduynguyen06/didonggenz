// src/CartComponent/CartList.js
import React, { useState } from 'react';
import { Space, Table, Button, Input } from 'antd';
import { DeleteOutlined } from '@ant-design/icons'

function CartList() {
  const columns = [
    {
      title: 'Sản phẩm',
      dataIndex: 'product',
      render: (text, record) => (
        <div>
          <img src={record.image} alt={record.product} style={{ width: '50px', marginRight: '10px' }} />
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: 'Thuộc tính',
      dataIndex: 'attribute',
    },
    {
      title: 'Đơn giá',
      dataIndex: 'dongia',
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      render: (text, record, index) => (
        <div>
          <Button type="primary" size='medium' style={{ background: 'transparent', border: '1px solid #ccc', color: '#000', boxShadow: 'none', borderRadius: '0px' }} onClick={() => handleDecreaseQuantity(index)}>-</Button>
          <Input
            type="number"
            value={quantities[index]}
            style={{ width: '50px' }}
            onChange={(e) => handleQuantityChange(index, parseInt(e.target.value, 10))}
          />
          <Button type="primary" size='medium' style={{ background: 'transparent', border: '1px solid #ccc', color: '#000', boxShadow: 'none', borderRadius: '0px' }} onClick={() => handleIncreaseQuantity(index)}>+</Button>
        </div>
      ),
    },
    {
      title: 'Số tiền',
      dataIndex: 'amount',
      render: (text, record, index) => {
        const price = parseFloat(record.dongia);
        const qty = quantities[index];
        const totalAmount = price * qty;
        return totalAmount;
      },
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: () => (
        <Space size="middle">
          <Button type="primary" danger>
            <DeleteOutlined />
          </Button>
        </Space>
      ),
    },
  ];
  const data = [];
  for (let i = 1; i <= 10; i++) {
    data.push({
      key: i,
      product: 'Iphone',
      attribute: 'White 126GB',
      dongia: `22200000`,
      quantity: `2`,
      amount: `44400000`,
    });
  }
  const [quantities, setQuantities] = useState(data.map(() => 2)); // Số lượng mặc định
  const handleQuantityChange = (index, value) => {
    const updatedQuantities = [...quantities];
    updatedQuantities[index] = value;
    setQuantities(updatedQuantities);
  };


  const handleIncreaseQuantity = (index) => {
    const updatedQuantities = [...quantities];
    updatedQuantities[index] += 1;
    setQuantities(updatedQuantities);
  };

  const handleDecreaseQuantity = (index) => {
    const updatedQuantities = [...quantities];
    if (updatedQuantities[index] > 1) {
      updatedQuantities[index] -= 1;
      setQuantities(updatedQuantities);
    }
  };



  const defaultExpandable = {
    expandedRowRender: (record) => <p>{record.description}</p>,
  };
  const defaultTitle = () => 'Here is title';
  const defaultFooter = () => 'Here is footer';
  const [showHeader, setShowHeader] = useState(true);
  const [showfooter, setShowFooter] = useState(true);
  const [showTitle, setShowTitle] = useState(false);
  const [rowSelection, setRowSelection] = useState({});
  const [hasData, setHasData] = useState(true);
  const [bottom, setBottom] = useState('bottomRight');
  const [ellipsis, setEllipsis] = useState(false);
  const [yScroll, setYScroll] = useState(false);
  const [xScroll, setXScroll] = useState();

  const scroll = {};
  if (yScroll) {
    scroll.y = 240;
  }
  if (xScroll) {
    scroll.x = '100vw';
  }
  const tableColumns = columns.map((item) => ({
    ...item,
    ellipsis,
  }));
  if (xScroll === 'fixed') {
    tableColumns[0].fixed = true;
    tableColumns[tableColumns.length - 1].fixed = 'right';
  }
  const tableProps = {
    title: showTitle ? defaultTitle : undefined,
    showHeader,
    footer: showfooter ? defaultFooter : undefined,
    rowSelection,
  };

  return (
    <>
      <Table
        {...tableProps}
        pagination={{
          position: [bottom],
        }}
        columns={tableColumns}
        dataSource={hasData ? data : []}
        scroll={scroll}
      />
    </>
  );
}

export default CartList;
