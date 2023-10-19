import styled from "styled-components"
export const WrapperBrandList = styled.div`
    *, :after, :before{
        box-sizing: inherit;
    }

    @media screen and (max-width: 540px) {
        .brand-content {
            overflow-x: auto;
        }
        .brand-content .list-brand {
            flex-wrap: nowrap;
        }
    }
    .brand-content .list-brand {
        display: flex;
        flex-wrap: wrap;
    }
    .brand-content .list-brand .list-brand-item{
        align-item: center;
        border: 1px solid #ccc;
        border-radius: 4px;
        display: flex;
        height: 34px;
        align-content: center;
        justify-content: center;
        margin: 10px 10px 10px 10px;
        padding: 7px 4px;

    }
    .brand-content .list-brand .list-brand-item a{
        color: #ff3300;
        cursor: pointer;
    }
    .brand-content .list-brand .list-brand-item .brand-img {
        height: 20px;
        max-width: none;
        padding-left: 20px;
        padding-right: 20px;
    }
    .brand-content .list-brand .list-brand-item .brand-img img{
        height: auto;
        max-width: 100%;
    }
    .brand-content .list-brand .list-brand-item.bordered {
        border: 1px solid #FE3300;
      }
`