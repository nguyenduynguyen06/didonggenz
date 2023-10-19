import AdminHomePage from "../pages/Admin/AdminPage";
import HomePage from "../pages/HomePage/homepages";
import Profilepage from "../pages/Profile/profilepage";
import NotFoundPage from "../pages/notfoundpage";
import OrderPage from "../pages/oders";
import ProductDetail from "../pages/ProductDetail/productdetail";
import TypeProductPage from "../pages/ProductTypePage/producttypepage";
import CartPage from "../pages/CartPage/CartPage";
import FilterProductPage from "../pages/ProductTypePage/productfilterpage";
export const routes = [
    {
        path:'/',
        page: HomePage,
    },
    {
        path:'/order',
        page: OrderPage,
        isShowHeader : true
    },
    {
        path:'*',
        page: NotFoundPage
    },
    {
        path:'/admin',
        page: AdminHomePage
    },
    {
        path:'/profile',
        page: Profilepage,
        isShowHeader : true
    },
    {
        path:'/pdd',
        page: ProductDetail,
        isShowHeader: true
    },
    {
        path:'/type/:nameCategory',
        page: TypeProductPage,
    },
    {
        path:'/type/:nameCategory/:nameBrand',
        page: TypeProductPage,
    },
    {
        path:'/type',
        page: TypeProductPage,
    },
    {
        path:'/product/:productName/:memory',
        page: ProductDetail,
        isShowHeader: true
    },
    {
        path:'/cart',
        page: CartPage,
        isShowHeader: true
    },
    {
        path:'/lowtoHigh/:nameCategory/:nameBrand',
        page: FilterProductPage,
    },
    {
        path:'/lowtoHigh/:nameCategory',
        page: FilterProductPage,
    },
    {
        path:'/highToLow/:nameCategory/:nameBrand',
        page: FilterProductPage,
    },
    {
        path:'/highToLow/:nameCategory',
        page: FilterProductPage,
    },
]