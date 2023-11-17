import { Button, Input, Radio, Space } from 'antd'
import React, { useState } from 'react'
import { WrapperWarranty } from './style';

const WarrantySearch = () => {
    const [value, setValue] = useState(1);
    const onChange = (e) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };
    const tableCellStyle = {
        border: '1px solid #ddd',
        padding: '8px',
        textAlign: 'left',
    };


    return (
        <WrapperWarranty>
            <div className='title'>
                <p>Tra cứu thông tin bảo hành</p>
            </div>
            <div className='radio-box'>
                <Radio.Group onChange={onChange} value={value} >
                    <Radio value={1}>Tra cứu theo số điện thoại</Radio>
                </Radio.Group>
            </div>
            <div className='input-box'>
                <Space.Compact  style={{width:'60%'}}>
                    <Input placeholder="Vui lòng nhập số điện thoại để tra cứu" />
                    <Button type="primary">KIỂM TRA</Button>
                </Space.Compact>
            </div>
            {/*Có kết quả mới hiện bảng*/}
            <div className='table'>
                <table style={{ fontSize: '15px', width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th style={tableCellStyle}>Tên sản phẩm</th>
                            <th style={tableCellStyle}>Bộ nhớ</th>
                            <th style={tableCellStyle}>Màu</th>
                            <th style={tableCellStyle}>Số lượng</th>
                            <th style={tableCellStyle}>Hạn bảo hành</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr >
                            <td style={tableCellStyle}>text</td>
                            <td style={tableCellStyle}>A</td>
                            <td style={tableCellStyle}>A</td>
                            <td style={tableCellStyle}>A</td>
                            <td style={tableCellStyle}>01/09/2002</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </WrapperWarranty>
    )
}
export default WarrantySearch