import "swiper/css";
import "swiper/css/navigation";

import "./App.scss";

import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Layout, Menu, Avatar, Input, Button } from "antd";
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    SearchOutlined,
    UserOutlined,
    HomeOutlined,
    LineChartOutlined,
    HistoryOutlined,
    HeartOutlined,
    DesktopOutlined,
    PlaySquareOutlined,
} from "@ant-design/icons";

import Containers from "./config/Routes";

import logo from './assets/imgs/logo.png';
const { Header, Sider, Content } = Layout;

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

const items = [
    getItem(
        "Menu",
        "menu",
        null,
        [
            getItem("Home", "", <HomeOutlined />),
            getItem("Trending", "trending", <LineChartOutlined />),
            getItem("Watchlist", "watchlist", <HistoryOutlined />),
            getItem("Favorite", "favorite", <HeartOutlined />),
        ],
        "group"
    ),
    getItem(
        "Categories",
        "2",
        null,
        [
            getItem("Movies", "movie", <PlaySquareOutlined />),
            getItem("TV Series", "tv", <DesktopOutlined />),
        ],
        "group"
    ),
]

function App() {
    let navigate = useNavigate();
    const location = useLocation();

    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className="container">
            <Layout>
                <Sider 
                    trigger={null} collapsible collapsed={collapsed}
                    style={{
                        overflow: "auto",
                        height: "100vh",
                        position: "sticky",
                        top: 0,
                        left: 0,
                        padding: "24px 0",
                        background: "transparent"
                    }}
                >
                    <Link to="/">
                        <img src={logo} alt="" style={{ padding: "0 16px", }}/>
                    </Link>
                    <Menu
                        style={{
                            borderInlineEnd: 0,
                            background: "transparent",
                        }}
                        mode="inline"
                        defaultSelectedKeys={[location.pathname.split('/').pop()]}
                        items={items}
                        onClick={({ key }) => navigate(`/${key}`)}
                    />
                </Sider>
                <Layout style={{ padding: "24px" }}>
                    <Header
                        style={{
                            padding: "0",
                            display: "flex",
                            alignItems: "center",
                            columnGap: "12px",
                            height: "auto",
                            background: "transparent",
                        }}
                    >
                        <Button
                            type="text"
                            icon={
                                collapsed ? (
                                    <MenuUnfoldOutlined />
                                ) : (
                                    <MenuFoldOutlined />
                                )
                            }
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                width: "48px",
                                height: "48px",
                                fontSize: "16px",
                                background: "white",
                            }}
                        />
                        <Input size="large" placeholder="Search..." prefix={<SearchOutlined />}
                            style={{
                                minWidth: "240px",
                                width: "50%",
                                height: "48px",
                                borderRadius: "48px",
                                border: "none"
                            }}
                            onPressEnter={(e) => navigate(`/search?query=${e.target.value}`)}
                        />
                        <div
                            style={{
                                marginLeft: "auto",
                                display: "flex",
                                alignItems: "center",
                                columnGap: "4px"
                            }}
                        >
                            <Avatar size={48} icon={<UserOutlined />} />
                            <div>
                                <p style={{ fontSize: "14px", lineHeight: "18px" }}>User</p>
                                <p style={{ fontSize: "12px", lineHeight: "16px", color: "#B9BABF" }}>@user</p>
                            </div>
                        </div>
                    </Header>
                    <Content
                        style={{
                            paddingTop: 24,
                        }}
                    >
                        <Containers />
                    </Content>
                </Layout>
            </Layout>
        </div>
    );
}

export default App;
