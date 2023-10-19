import React from "react";
import { WrapperContent, WrapperTextPrice, WrapperTextValue } from "./style";
import { Checkbox, Rate } from 'antd';
import { Link } from "react-router-dom";


const NavBarComponent = () => {
    const onChange = () => { }
    const renderContent = (type, options) => {
        switch (type) {
            case 'text':
                return options.map((option) => {
                    return (
                        <Link to={`/type/${option}`} key={option}>
                        <WrapperTextValue >{option}</WrapperTextValue>
                        </Link>
                    )
                })
            case 'checkbox':
                return (
                    <Checkbox.Group style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }} onChange={onChange}>
                        {options.map((option) => {
                            return (
                                <Checkbox style={{ marginLeft: 0 }} value={option.value}>{option.label}</Checkbox>
                            )
                        })}
                    </Checkbox.Group>
                )
            case 'star':
                return options.map((option) => {
                    return (
                        <div style={{ display: 'flex', gap: '4px' }}>
                            <Rate style={{ fontSize: '12px' }} disabled defaultValue={option} />
                            <span>{`${option} sao`}</span>
                        </div>
                    )
                }
                )
            case 'price':
                return options.map((option) => {
                    return (
                        <WrapperTextPrice>{option}</WrapperTextPrice>
                    )
                }
                )
            default:
                return {}
        }
    }

    return (
        <div style={{backgroundColor:'#fff'}}>
            <p style={{fontSize: '17px', fontWeight: 'bold'}}>Danh mục</p>
            <WrapperContent>
                {renderContent('text', ['Điện thoại', 'Ốp lưng', 'Cáp sạc', 'Pin dự phòng', 'Tai nghe'])}
            </WrapperContent>
            <hr></hr>
            <p style={{fontSize: '17px', fontWeight: 'bold'}}>Bộ nhớ</p>
            <WrapperContent>
                {renderContent('checkbox', [
                    { value: 'A', label: '128GB' },
                    { value: 'B', label: '256GB' },
                    { value: 'C', label: '512GB' },
                ])}
            </WrapperContent>
            <hr></hr>
            <p style={{fontSize: '17px', fontWeight: 'bold'}}>Đánh giá</p>
            <WrapperContent>
                {renderContent('star', [2, 3, 4])}
            </WrapperContent>
            <hr></hr>
            <p style={{fontSize: '17px', fontWeight: 'bold'}}>Mức giá</p>
            <WrapperContent>
                {renderContent('price', [
                    'Dưới 3 triệu',
                    'Từ 3-5 triệu',
                    'Trên 5 triệu'
                ])}
            </WrapperContent>
        </div>
    )
}

export default NavBarComponent;