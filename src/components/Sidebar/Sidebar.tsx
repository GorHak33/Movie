import "./Sidebar.less";
import SearchIcon from "/assets/icons/SearchIcon.png";
import MovieIcon from "/assets/icons/MovieIcon.png";
import GenresIcon from "/assets/icons/GenresIcon.png";
import HomeIcon from "/assets/icons/HomeIcon.png";
import WatchLaterIcon from "/assets/icons/WatchLaterIcon.png";
import Icon from "/assets/icons/Icon.png";
import { Avatar, Layout, Menu } from "antd";
import avatarPic from "/assets/avatar.jpg";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const { Sider } = Layout;

  const menuItems = [
    { icon: SearchIcon, label: "Search", path: "/search" },
    { icon: HomeIcon, label: "Home", path: "/" },
    { icon: Icon, label: "TV Shows", path: "/tv" },
    { icon: MovieIcon, label: "Movies", path: "/movies" },
    { icon: GenresIcon, label: "Genres", path: "/genres" },
    { icon: WatchLaterIcon, label: "Watch Later", path: "/watch-later" },
  ];
  const settingsInfo = [
    { label: "LANGUAGE" },
    { label: "GET HELP" },
    { label: "EXIT" },
  ];

  return (
    <>
      {!collapsed && <div className="sidebar-overlay" />}

      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        collapsedWidth={70}
        width={180}
        style={{
          position: "fixed",
          zIndex: 1000,
        }}
        className="sidebar"
        onMouseEnter={() => setCollapsed(false)}
        onMouseLeave={() => setCollapsed(true)}
      >
        <div className="profile">
          <Avatar
            src={avatarPic}
            size={48}
            className={collapsed ? "hidden" : ""}
          />
          <h3 className={collapsed ? "hidden" : ""}>Name</h3>
        </div>

        <Menu
          selectedKeys={[location.pathname]}
          onClick={({ key }) => navigate(key)}
          mode="inline"
          className="menu"
        >
          {menuItems.map((item) => (
            <Menu.Item
              key={item.path}
              icon={<img src={item.icon} alt={item.label} className="icon" />}
            >
              {item.label}
            </Menu.Item>
          ))}
        </Menu>

        {!collapsed && (
          <Menu mode="inline" className="setting-menu">
            {settingsInfo.map((item) => (
              <Menu.Item key={item.label}>{item.label}</Menu.Item>
            ))}
          </Menu>
        )}
      </Sider>
    </>
  );
};

export default Sidebar;
