import HomePage from "../pages/HomePage/HomePage";
import ProductDetailPage from "../pages/ProductDetailPage/ProductDetailPage";
import SearchPage from "../pages/SearchPage/SearchPage";

import CartPage from "../pages/CartPage/CartPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import SignIn from "../pages/Sign-in/SignIn";
import Register from "../pages/Register/Register";
import UserPage from '../pages/UserPage/UserPage';
import ForgotPassword from '../pages/ForgotPassword/ForgotPassword'
import AdminPage from '../pages/AdminPage/AdminPage'
import AdminUser from '../components/AdminUser/AdminUser'
import CollectionPage from '../pages/CollectionPage/CollectionPage'
import ProductListByCategoryPage from "../pages/ProductListByCategoryPage/ProductListByCategoryPage";

export const routes = [
    {
      path: "/",
      page: HomePage,
      isShowHeader: true,
    },
    {
      path: "/ProductDetail/:id",
      page: ProductDetailPage,
      isShowHeader: true,
    },
    {
      path: "/search",
      page: SearchPage,
      isShowHeader: true,
    },
    {
      path: "/cart",
      page: CartPage,
      isShowHeader: true,
    },
    {
      path: "*",
      page: NotFoundPage,
      isShowHeader: false,
    },
    {
      path: "/SignIn",
      page: SignIn,
      isShowHeader: true,
    },
    {
      path: "/Register",
      page: Register,
      isShowHeader: true,
    },
    {
      path: "/UserPage",
      page: UserPage,
      isShowHeader: true,
    },
    {
      path: '/ForgotPassword',
      page: ForgotPassword,
      isShowHeader: true,
    },
    {
      path: '/system/admin',
      page: AdminPage,
      isShowHeader: true,
    },
    {
      path: '/AdminUser',
      page: AdminUser
    },
    {
      path: "/collection/:id",
      page: CollectionPage,
      isShowHeader: true,
    },
    {
      path: "/category/:category",
      page: ProductListByCategoryPage,
      isShowHeader: true,
    }
]