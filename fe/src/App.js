import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {routes} from './routes'; 
import CardProductComponent from './components/CardProductComponent/CardProductComponent';
import ProductDetailPage from './pages/ProductDetailPage/ProductDetailPage';
import Info from './components/ProductDetail/Info/Info';
import HeaderComponent from './components/HeaderComponent/HeaderComponent'
import SearchPage from './pages/SearchPage/SearchPage';
import DefaultComponent from './components/Layout/Layout';
import Layout from 'antd/es/layout/layout';

function App() {

  return (
    <div>
      <Router>
        <Routes>
          {routes.map((route) => {
            const Page = route.page;
            const Layout = route.isShowHeader ? DefaultComponent : Fragment;
            return (
              <Route key={route.path} path={route.path} element={
                <Layout>
                  <Page/>
                </Layout>
              }/>
            )
          })}
        </Routes>
      </Router>
    </div>
    
  )
}
export default App;