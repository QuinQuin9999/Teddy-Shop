import HomePage from "../pages/HomePage/HomePage";
import ProductDetailPage from "../pages/ProductDetailPage/ProductDetailPage";
import SearchPage from "../pages/SearchPage/SearchPage";
import CategoryPage from "../pages/CategoryPage/CategoryPage";

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
      path: "/category/:href",
      page: CategoryPage,
      isShowHeader: true,
    },
]