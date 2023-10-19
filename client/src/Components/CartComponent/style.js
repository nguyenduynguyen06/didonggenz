import styled from "styled-components";
import {InputNumber} from "antd";

export const HeaderWrapper = styled.div`
.header-wrapper {
    display: flex;
    align-items: center;
    background: #fff;
    border-bottom: 1px solid rgba(0,0,0,.09);
    height: 6.25rem;
    width: 100%;

}
.header-container {
    margin-right: auto;
    margin-left: auto;
    width: 100%;
    display: flex;
    align-items: space-around;
}
.cart-page-header {
    padding-left: 1.125rem;
    display: flex;
    flex: 1;
}
.cart-page-logo {
    text-decoration: none;
    color: rgba(0,0,0,.87);
    display: block;
    display: flex;
    align-items: flex-end;
}
.logo-icon {
    background-position: 50%;
    background-size: cover;
    background-repeat: no-repeat;
    width: 8.125rem;
    height: 2.875rem;
    cursor: pointer;
    fill: #8c52ff;
}
.logo-icon img{
    padding-top: 10%;
    width: 100%;
    height: auto;
}
.cart-page-logo {
    text-decoration: none;
    color: rgba(0,0,0,.87);
    display: block;
    display: flex;
    align-items: flex-end;
}
.cart-page-name {
    margin-left: 0.9375rem;
    border-left: 0.0625rem solid #8c52ff;
    color: #8c52ff;
    font-size: 1.25rem;
    line-height: 1.875rem;
    height: 1.875rem;
    padding-left: 0.9375rem;
    margin-bottom: 0.0625rem;
    text-transform: capitalize;
}
.cart-page-searchbar {
    width: 38.8125rem;
    position: relative;
    display: flex;
  align-items: center;
}
.search-bar {
    --focus-indicator-spacing: 3px;
    display: flex;
    align-items: stretch;
    justify-content: space-between;
    height: 2.5rem;
    box-sizing: border-box;
    padding: 0.1875rem;
    border-radius: 2px;
    flex: 1;
    background: #fff;
    padding-right: 30px;
}
.search-bar button{
    background-color: #8c52ff;
  color: white;
}
`
export const WrapperCartList = styled.div`
    .header-list{
        display: flex;
        align-items: center;
        box-shadow: 0 1px 1px 0 rgba(0,0,0,.05);
        border-radius: 0.125rem;
        overflow: hidden;
        border-radius: 3px;
        height: 55px;
        font-size: 14px;
        background: #fff;
        margin-bottom: 12px;
        color: #888;
        padding: 0 20px;
    }
    .checkbox{
        padding: 0 12px 0 20px;
        display: flex;
        flex-direction: row-reverse;
        min-width: 58px;
        box-sizing: border-box;
        user-select: none;
        max-width: 400px;
    }
    .product{
        color: rgba(0,0,0,.8);
        width: 46.27949%;
        margin-left: 20px;
    }
    .dongia{
        text-align: center;
        width: 15.88022%;
    }
    .quantity{
        width: 15.4265%;
        text-align: center;
    }
    .amount{
        width: 10.43557%;
        text-align: center;
    }
    .action{
        width: 12.70417%;
        text-align: center;
    }
    .content-list {
        position: relative;
        margin-top: 0;
        padding: 16px 0;
        text-decoration: none;
        color: rgba(0,0,0,.87);
        display: block;
    }
    .listitem {
        margin-top: 0;
        padding: 16px 0;
    }
    .item {
        display: flex;
        align-items: center;
    }   
    .item-check-box{
        padding: 0 20px 0 0px;
        display: flex;
        flex-direction: row-reverse;
        min-width: 58px;
        box-sizing: border-box;
        user-select: none;
        max-width: 400px;
    }
    .item-product {
        display: flex;
        width: 29.03811%;
        box-sizing: border-box;
        position: relative;
        flex-direction: row;
    }
    .item-image {
        cursor: pointer;
    }
    .item-name {
        line-height: 16px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        font-size: 14px;
    }
    .space {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 17.24138%;
    }
    .item-dongia {
        flex-direction: column;
        width: 15.88022%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .item-quantity{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        width: 15.4265%;
    }
    .item-action {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 10.43557%;
    }
    .item-action button{
        border: none;
        background: #fff;
        color: #ee4d2d;
    }
`
export const WrapperQuantityProduct = styled.div`
    display: flex;
    gap: 4px;
    align-items: center;
    border-radius: 4px;
    border: 1px solid #ccc;
    width: 120px;
`
export const WrapperInputNumber = styled(InputNumber)`
    &.ant-input-number.ant-input-number-sm {
        width: 40px;
        border-top: none;
        border-bottom: none;
        &.ant-input-number-handler-wrap {
            display: none !important;
        }
    }
`
