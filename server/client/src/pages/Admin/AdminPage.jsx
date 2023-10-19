import React, { useEffect, useState } from 'react';
import { AppstoreOutlined, UserOutlined,UnorderedListOutlined,QqOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { getItem} from './utils';
import Header from '../../Components/Header/header';
import AdminProduct from '../../Components/admin/AdminProduct/AdminProduct';
import AdminUser from '../../Components/admin/AdminUser/AdminUser';
import { useSelector } from 'react-redux';
import NewProduct from '../../Components/admin/AdminProduct/NewProduct';
import AdminCategory from '../../Components/admin/AdminCategory/AdminCategory';
import NewCategory from '../../Components/admin/AdminCategory/NewCategory';
import AdminBrand from '../../Components/admin/AdminBrand/AdminBrand';
import NotFoundPage from '../notfoundpage';
import NewBrand from '../../Components/admin/AdminBrand/NewBrand';
import AdminComment from '../../Components/admin/AdminComment/AdminComment';

const AdminHomePage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" })
}, [])
  const [keySelected, setKeySelected] = useState('');

  const renderPage = (key) => {
    switch(key) {
      case 'users':
        return(
          <AdminUser/>
        )
      case 'products':
          return (
            <AdminProduct/>
          )
        case 'addProduct':
          return(
            <div><NewProduct/></div>
          )
        case 'categorys':
            return(
              <div><AdminCategory/></div>
            )
        case 'addcategory':
              return(
                <div><NewCategory/></div>
              )   
        case 'brands':
              return(
                  <div><AdminBrand/></div>
              )   
        case 'addbrand':
              return(
               <div><NewBrand/></div>
              )   
        case 'comments':
              return(
                <div><AdminComment/></div>
                )        
      default:
        return <></>
    }
  }


  
  const items = [

    getItem('Dashboard', 'dashboard', <UserOutlined />),
    getItem('Người dùng', 'users', <UserOutlined />),
    getItem('Sản phẩm', 'sub1',<AppstoreOutlined />, [
      getItem('Danh sách sản phẩm', 'products'),
      getItem('Thêm sản phẩm', 'addProduct'),
    ]),
    getItem('Danh mục', 'category',<UnorderedListOutlined />, [
      getItem('Danh sách danh mục', 'categorys'),
      getItem('Thêm danh mục', 'addcategory'),
    ]),
    getItem('Thương hiệu', 'brand',<QqOutlined />, [
      getItem('Danh sách thương hiệu', 'brands'),
      getItem('Thêm thương hiệu', 'addbrand'),
    ]),
    getItem('Bình luận', 'comments', <UserOutlined />),
  ];

  const user = useSelector((state)=> state.user)
  if (user && user.role_id == 1) {
    const handleOnClick = ({key}) => {
      setKeySelected(key)}
    return (
      <>
        <Header isHiddenSearch isHiddenCart/>
        <div style={{display: 'flex'}}>          
        <Menu
          mode="inline"
          style={{
            width: 256,
            boxShadow: '1px 2px 1px #ccc',
            height: '100vh',
          }}
          items={items}
          onClick={handleOnClick}
        />
        <div style={{flex: 1, padding: '15px'}}>
          {renderPage(keySelected)}
        </div>
      </div>
    </>);
  } else {
    return (
      <div>
       <NotFoundPage/>
      </div>
    );
  }
}

export default AdminHomePage;
