import React from 'react';
import HeaderComponent from '../HeaderComponent/HeaderComponent';
import FooterComponent from '../FooterComponent/FooterComponent';

const Layout = ({ children }) => {
    return (
        <div style={{position:"relative"}}>
            {/* <AppHeader/> */}
            <HeaderComponent/>
            <div>{children}</div>
            <FooterComponent />
        </div>
    );
};

export default Layout;
