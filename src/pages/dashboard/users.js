import { UserOutlined } from '@ant-design/icons';
import {Breadcrumb, Button, Layout, Menu, theme} from 'antd';
import { useState, useEffect } from 'react';
const { Content, Sider, Header } = Layout;
import { AllUsers } from '@/components/partials/dashboard/Tables/users';
import {useUserContext} from "@/context/AuthContext";
import router from 'next/router';
import {logOut} from "@/config/FIrebaseMethods/Auth";


function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}
const items = [
    getItem('Користувачі', 'sub1', <UserOutlined />),
];
function Users() {

    const {user, loading, error} = useUserContext();

    useEffect(() => {
        if (!loading) {
            if (!user) {
                router.push('/auth');
            }
        }
    }, [user, loading]);
    
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <Layout
            style={{
                minHeight: '100vh',
            }}
        >
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="text-center h-[32px] m-[16px] bg-[#00b96b] text-[24px]"/>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
            </Sider>
            <Layout className="site-layout">
                <Header>
                    <div className="logo" />
                    <Button href="#" onClick={logOut} style={{color: "#fff", background: "transparent"}}>Вийти</Button>
                </Header>
                <Content style={{margin: '0 16px',}}>
                    <Breadcrumb style={{margin: '16px 0',}}>
                        <Breadcrumb.Item>Користувачі</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{padding: 24, minHeight: 360, background: colorBgContainer,}}>
                        <AllUsers/>
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};
export default Users;