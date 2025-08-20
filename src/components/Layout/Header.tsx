import { FolderOpen, Home } from "lucide-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.scss";

const Header: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/projects", label: "Projects", icon: FolderOpen },
  ];

  return (
    <header className="header">
      <div className="container">
        <div className="header__content">
          <Link to="/" className="header__logo">
            <img src="public\favicons\android-chrome-192x192.png"></img>
          </Link>

          <nav className="header__nav">
            <ul className="header__nav-list">
              {navItems.map(({ path, label, icon: Icon }) => (
                <li key={path} className="header__nav-item">
                  <Link
                    to={path}
                    className={`header__nav-link ${
                      location.pathname === path
                        ? "header__nav-link--active"
                        : ""
                    }`}
                  >
                    <Icon size={18} />
                    <span>{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
