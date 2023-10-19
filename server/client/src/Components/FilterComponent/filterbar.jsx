import React, { useState } from 'react';
import { DownOutlined , FallOutlined ,RiseOutlined} from '@ant-design/icons';
import { Button, Checkbox, Dropdown,Menu, Space } from 'antd';
import { WrapperFilterList } from './style';
import {  NavLink, useLocation, useParams } from 'react-router-dom';
const FilterBar = () => {
    const location = useLocation();
    const { nameCategory, nameBrand } = useParams();
  
    const isFilterPage = location.pathname.startsWith(`/lowtoHigh`);
    const isFilterPage1 = location.pathname.startsWith(`/hightoLow`);
    let pathToUse;
    if (location.pathname.startsWith('/lowtoHigh')) {
      pathToUse = '/lowtoHigh';
    } else if (location.pathname.startsWith('/hightoLow')) {
      pathToUse = '/hightoLow';
    }
    else if (location.pathname.startsWith('/type')) {
        pathToUse = '/lowtoHigh';
    }
    const hasNameBrand = nameBrand ? `/${nameBrand}` : '';
    const menu1 = (
        <Menu>
            <Menu.Item key="1">     
            <NavLink
            to={{
                pathname: `${pathToUse}/${nameCategory}${hasNameBrand}`,
                search: '?minPrice=0&maxPrice=2000000',
            }}
            >
            Dưới 2 triệu
            </NavLink>
            </Menu.Item>
            <Menu.Item key="2">
                <NavLink
                to={{
                    pathname: `${pathToUse}/${nameCategory}${hasNameBrand}`,
                    search: '?minPrice=2000000&maxPrice=4000000',
                }}
                >
                Từ 2 đến 4 triệu
                </NavLink>
                </Menu.Item>
            <Menu.Item key="3">
            <NavLink
                to={{
                    pathname: `${pathToUse}/${nameCategory}${hasNameBrand}`,
                    search: '?minPrice=4000000&maxPrice=7000000',
                }}
                >
                Từ 4 đến 7 triệu
                </NavLink>
                </Menu.Item>
            <Menu.Item key="4">
            <NavLink
                to={{
                    pathname: `${pathToUse}/${nameCategory}${hasNameBrand}`,
                    search: '?minPrice=7000000&maxPrice=13000000',
                }}
                >
                Từ 7 đến 13 triệu
                </NavLink></Menu.Item>
            <Menu.Item key="5">
            <NavLink
                to={{
                    pathname: `${pathToUse}/${nameCategory}${hasNameBrand}`,
                    search: '?minPrice=13000000&maxPrice=20000000',
                }}
                >
               Từ 13 đến 20 triệu
                </NavLink></Menu.Item>
            <Menu.Item key="6">
            <NavLink
                to={{
                    pathname: `${pathToUse}/${nameCategory}${hasNameBrand}`,
                    search: '?minPrice=20000000&maxPrice=9999999999999',
                }}
                >
               Trên 20 triệu
                </NavLink></Menu.Item>
        </Menu>
    );

    const menu2 = (
        <Menu>
            <Menu.Item key="5">
            <NavLink
                to={{
                    pathname: `${pathToUse}/${nameCategory}${hasNameBrand}`,
                    search: '?selectedMemory=32GB',
                }}
                >
               32GB
                </NavLink>
                </Menu.Item>
            <Menu.Item key="6">
            <NavLink
                to={{
                    pathname: `${pathToUse}/${nameCategory}${hasNameBrand}`,
                    search: '?selectedMemory=64GB',
                }}
                >
               64GB
                </NavLink></Menu.Item>
            <Menu.Item key="7">
            <NavLink
                to={{
                    pathname: `${pathToUse}/${nameCategory}${hasNameBrand}`,
                    search: '?selectedMemory=128GB',
                }}
                >
               128GB
            </NavLink></Menu.Item>
            <Menu.Item key="8">
            <NavLink
                to={{
                    pathname: `${pathToUse}/${nameCategory}${hasNameBrand}`,
                    search: '?selectedMemory=256GB',
                }}
                >
               256GB
            </NavLink></Menu.Item>
            <Menu.Item key="9">
            <NavLink
                to={{
                    pathname: `${pathToUse}/${nameCategory}${hasNameBrand}`,
                    search: '?selectedMemory=512GB',
                }}
                >
               512GB
            </NavLink></Menu.Item>
            <Menu.Item key="10">
            <NavLink
                to={{
                    pathname: `${pathToUse}/${nameCategory}${hasNameBrand}`,
                    search: '?selectedMemory=1TB',
                }}
                >
               1TB
            </NavLink></Menu.Item>
        </Menu>
    );
    const menu3 = (
        <Menu>
            <Menu.Item key="13">5 sao</Menu.Item>
            <Menu.Item key="14">4 sao</Menu.Item>
            <Menu.Item key="15">3 sao</Menu.Item>
            <Menu.Item key="16">2 sao</Menu.Item>
            <Menu.Item key="17">1 sao</Menu.Item>

        </Menu>
    );
   return (
        <WrapperFilterList>
            <NavLink to= {`/hightoLow/${nameCategory}${hasNameBrand}`}>
            <Button style={{ display: 'inline-flex', alignItems: 'center' }} className={isFilterPage1 ? 'memory-button selected' : 'memory-button'}>
            <FallOutlined style={{ verticalAlign: 'middle', marginRight: '5px' }}/>Giá Cao - Thấp</Button></NavLink>
            
            <NavLink to= {`/lowtoHigh/${nameCategory}${hasNameBrand}`} ><Button style={{ display: 'inline-flex', alignItems: 'center' }} className={isFilterPage ? 'memory-button selected' : 'memory-button'}> 
            <RiseOutlined style={{ verticalAlign: 'middle', marginRight: '5px' }}/>Giá Thấp - Cao</Button></NavLink>

            <Dropdown overlay={menu1} placement="bottomLeft">
                <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                    Giá <DownOutlined />
                </a>
            </Dropdown>
            <Dropdown overlay={menu2} placement="bottomLeft">
                <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                    Bộ nhớ <DownOutlined />
                </a>
            </Dropdown>
            <div style={{ display: 'flex', alignItems: 'center' }}>
        <Dropdown overlay={menu3} placement="bottomLeft">
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            Số sao <DownOutlined />
          </a>
        </Dropdown>
        <NavLink  to={{
                    pathname: `${pathToUse}/${nameCategory}${hasNameBrand}`,
                    search: '?includeOldPrice=true',
                }} ><Button style={{ marginLeft: '10px' }}>Giảm giá</Button></NavLink>
      </div>
        </WrapperFilterList>
    )
}

export default FilterBar;
