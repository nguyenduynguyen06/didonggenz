import styled from "styled-components";
import { Button, Row } from "antd";

export const WrapperTab = styled.div`
    .tab-buttons {
        width:100%;
        display: flex;
        flex-direction: row;
    }
    .active{
        background: #8c52ff;
        color: #fff;
    }
`
export const WrapperBtn = styled(Button)`
    display: flex;
    flex-direction: column;
    width: 16.66%;
    align-items: center;
    justify-content: center;
    white-space: wrap;
    overflow: hidden;
    text-overflow: ellipsis;
`

export const WrapperDetailOrder = styled(Row)`
 .nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #fff;
        gap: 10px;
        left: 0;
        margin-bottom: 10px;
        padding: 5px 15px 10px;
        position: sticky;
        top: 0;
        width: 100%;
        z-index: 10;
        flex-wrap: wrap;
        list-style: none;
    }
    .btn-back {
        border: none;
        background: transparent;
    }
    .img-product img{
        width: 100px;
        height: 100px;
    }
`