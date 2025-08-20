import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import "./Layout.scss";

const Layout: React.FC = () => {
  return (
    <div className="layout">
      <Header />
      <main className="layout__main">
        <div className="container">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
