import React from "react";
import { WrapperContent, WrapperTextPrice, WrapperTextValue } from "./style";
import { Checkbox, Rate } from 'antd';
import { Link } from "react-router-dom";


const CateList = () => {
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
            default:
                return {}
        }
    }
    return (
        <div style={{backgroundColor:'#fff', padding:'10px'}}>
            <WrapperContent>
                {renderContent('text', ['Điện thoại', 'Ốp lưng', 'Cáp sạc', 'Pin dự phòng', 'Tai nghe'])}
            </WrapperContent>           
        </div>
    )
}

export default CateList;