import "swiper/css";
import "swiper/css/navigation";

import "./App.scss";

import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ConfigProvider, Flex, Layout, Menu, Avatar, Input, Button, Switch, Checkbox, notification } from "antd";
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
    SunFilled,
    MoonFilled,
    LogoutOutlined
} from "@ant-design/icons";

import apiConfig from './api/apiConfig';
import Containers from "./config/Routes";
import { setUser, logOut, userSelector } from "./features/authSlice";
import { fetchToken, createSessionId, deleteSession, axiosClient } from "./utils";

import { useNotification } from "./components/NotificationContext";

import logo from './assets/imgs/logo.png';
import Footer from "./components/Footer";
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
    
    const { isAuthenticated, user } = useSelector(userSelector);
    const dispatch = useDispatch();
    
    const token = localStorage.getItem('request_token');
    const sessionIdFromLocalStorage = localStorage.getItem('session_id');
    useEffect(() => {
        const loginUser = async () => {
            if(token) {
                if(sessionIdFromLocalStorage) {
                    const { data: userData } = await axiosClient.get(`account?session_id=${sessionIdFromLocalStorage}`)
                    dispatch(setUser(userData))
                } else {
                    const sessionId = await createSessionId();
                    const { data: userData } = await axiosClient.get(`account?session_id=${sessionId}`)
                    dispatch(setUser(userData))
                }
            }
        }
        loginUser();
    }, [token])

    const [theme, setTheme] = useState(localStorage.getItem("theme") ? localStorage.getItem("theme") : "system");
    const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
    function onWindowMatch() {
        if ( localStorage.theme === 'dark' || (!('theme' in localStorage) && darkQuery.matches)) {
            document.body.setAttribute('data-theme', 'dark');
        } else {
            document.body.removeAttribute('data-theme');
        }
    }
    onWindowMatch();

    useEffect(() => {
        switch(theme) {
            case "light":
                localStorage.setItem('theme', 'light');
                document.body.removeAttribute('data-theme');
                break;
            case "dark":
                localStorage.setItem('theme', 'dark');
                document.body.setAttribute('data-theme', 'dark');
                break;
            default:
                localStorage.removeItem('theme');
                onWindowMatch();
                break;
        }
    }, [theme])

    darkQuery.addEventListener("change", (e) => {
        if(!('theme' in localStorage)) {
            if(e.matches) {
                document.body.setAttribute('data-theme', 'dark');
            } else {
                document.body.removeAttribute('data-theme');
            }
        }
    })
    
    const { error } = useNotification();
    
    return (
        <ConfigProvider
            theme={ (theme === 'dark' || (!('theme' in localStorage) && darkQuery.matches)) ? {
                token: {
                    colorPrimary: "#f59445",
                    colorText: "#FFFFFF",
                    colorTextTertiary: "rgba(255, 255, 255, 0.45)",
                    colorLinkHover: "#f59445",
                },
                components: {
                    Button: {
                        defaultGhostColor: "#FFFFFF",
                        defaultGhostBorderColor: "#FFFFFF"
                    },
                    Notification: {
                        colorTextHeading: "rgba(0, 0, 0, 0.88)",
                        colorText: "rgba(0, 0, 0, 0.88)",
                    }
                }
            } : {
                token: {
                    colorPrimary: "#f59445",
                    colorLinkHover: "#f59445",
                },
                components: {
                    Button: {
                        defaultGhostColor: "rgba(0, 0, 0, 0.88)",
                        defaultGhostBorderColor: "rgba(0, 0, 0, 0.88)"
                    },
                }
            }}
        >
            {/* {contextHolder} */}
            <div className="container">
                <Layout>
                    <Sider 
                        breakpoint="lg"
                        
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
                        <Flex vertical className="h-full">
                            <Link to="/">
                                <img src={logo} alt="logo"/>
                            </Link>
                            <Menu
                                style={{
                                    borderInlineEnd: 0,
                                    background: "transparent",
                                }}
                                mode="inline"
                                defaultSelectedKeys={[location.pathname.split('/').pop()]}
                                items={items}
                                onClick={({ key }) => (['favorite', 'watchlist'].includes(key) && !isAuthenticated) ? error('Please log in to proceed') : navigate(`/${key}`)}
                            />
                            <div className="mt-auto">
                                { isAuthenticated &&
                                    <Button type="text" icon={<LogoutOutlined />} className="btn-logout"
                                        onClick={() => {
                                            deleteSession()
                                            dispatch(logOut())}
                                        }
                                    >
                                        <span className="btn-logout-title">Log out</span>
                                    </Button>
                                }
                            </div>
                        </Flex>
                    </Sider>
                    <Layout className="ant-layout-main">
                        <Header
                            style={{
                                padding: "0",
                                height: "auto",
                                background: "transparent",
                            }}
                        >
                            <Flex justify="space-between" align="end" gap="large" flex={1}>
                                <Flex align="center" gap="small" onClick={() => !isAuthenticated && fetchToken()}>
                                    { Object.keys(user).length > 0 ? (
                                            <>
                                                <Avatar size={48} src={`${apiConfig.w500Image(user?.avatar?.tmdb?.avatar_path)}`}>{user?.name}</Avatar>
                                                <div>
                                                    <p style={{ fontSize: "14px", lineHeight: "18px" }}>{ user?.name }</p>
                                                    <p style={{ fontSize: "12px", lineHeight: "16px", color: "#B9BABF" }}>{`@${user?.username}`}</p>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <Avatar size={48} icon={<UserOutlined />} />
                                                <p style={{ fontSize: "14px", lineHeight: "18px" }}>Login</p>
                                            </>
                                        )
                                    }
                                </Flex>
                                <Flex vertical={true} justify="space-between" align="flex-end" gap={2}>
                                    <Switch
                                        size="small"
                                        checkedChildren={<SunFilled />}
                                        unCheckedChildren={<MoonFilled />}
                                        checked={theme === 'light' ? true : false}
                                        disabled={theme === "system" && true}
                                        onChange={(e) => e ? setTheme('light') : setTheme('dark')}
                                    />
                                    <Checkbox defaultChecked={theme === "system" ? true : false} onChange={(e) => {
                                        if (e.target.checked) {
                                            setTheme('system')
                                            localStorage.removeItem('theme');
                                        } else {
                                            setTheme(darkQuery.matches ? 'dark' : 'light');
                                            localStorage.setItem('theme', theme);
                                        }
                                    }}>
                                        System
                                    </Checkbox>
                                </Flex>
                            </Flex>
                            <Flex align="end" gap="middle" className="btn-search">
                                <ConfigProvider
                                    theme={{
                                        inherit: true,
                                        token: {
                                            colorText: "rgba(0, 0, 0, 0.88)",
                                            colorTextTertiary: "rgba(255, 255, 255, 0.45)",
                                        },
                                    }}
                                >
                                    <Input size="large" placeholder="Search..." prefix={<SearchOutlined />}
                                        onPressEnter={(e) => navigate(`/search?query=${e.target.value}`)}
                                    />
                                </ConfigProvider>
                            </Flex>
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
            <Footer />
        </ConfigProvider>
    );
}

export default App;
