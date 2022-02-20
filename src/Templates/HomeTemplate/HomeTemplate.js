import React, { useState } from 'react'
import { Route, NavLink } from 'react-router-dom';
import { Layout, Breadcrumb, Tooltip, Space, Divider, Popover, Button, Image, Typography } from 'antd';
import styles from './HomeTemplate.module.css'
import { SettingOutlined, QuestionCircleFilled, TableOutlined, SmileFilled, LogoutOutlined, UserOutlined } from '@ant-design/icons';
// import DrawerSearch from '../../Components/HeaderMenuButton/DrawerSearch/DrawerSearch'
// import ModalCreate from '../../Components/HeaderMenuButton/DrawerCreate/ModalCreate';
import { useDispatch } from 'react-redux';
import { THEO_DOI_LOGOUT } from '../../Redux/types/UserTypes';
const { Header, Content, Sider } = Layout;
const { Text } = Typography;

export const HomeTemplate = (props) => {

    const dispatch = useDispatch()
    //tạo màu khi active 
    const [state, setState] = useState({ active: 0, breadcrumb: 'Kanban Board', visible: false, projectId: '' })
    const setProjectId = (newProjectId) => {
        setState({ projectId: newProjectId })
    }
    const handleVisibleChange = visible => {
        setState({ visible });
    };
    //tooltip notification
    const textModalCreate = <span>Create issue</span>;
    const textDrawerSearch = <span>Search issue</span>;
    const hidePop = () => {
        setState({ visible: false })
        dispatch({
            type: THEO_DOI_LOGOUT
        });
    }
    const contentLogin = (
        <Space direction="vertical" align='start'>
            <Space>
                <NavLink className={styles.itemLogin} to='/login'>Đăng nhập</NavLink>
            </Space>
            <Space>
                <NavLink className={styles.itemLogin} to='/resignter'>Đăng ký</NavLink>
            </Space>
        </Space>
    );
    const contentLogout = (
        <Space direction="vertical" align='start'>
            <NavLink className={styles.itemLogin} to='/taiKhoan'>
                <UserOutlined style={{ marginRight: '10px' }} />
                Tài khoản
            </NavLink>
            <Button
                type="text"
                className={styles.itemLogin}
                onClick={hidePop}
            >
                <LogoutOutlined />
                Đăng xuất
            </Button>
        </Space>
    )

    const renderIconLogin = () => {
        if (localStorage.getItem('name')) {
            return (
                <Popover
                    placement="right"
                    trigger="click"
                    content={contentLogout}
                    visible={state.visible}
                    onVisibleChange={handleVisibleChange}
                >
                    <Image
                        src={`https://i.pravatar.cc/150?img=${localStorage.getItem('name')}`}
                        style={{ borderRadius: '50%', width: '25px', height: '25px', cursor: 'pointer' }}
                        preview={false}
                        alt="" />
                </Popover>
            )
        } else {
            return (
                <Space>
                    <Popover
                        placement="right"
                        trigger="click"
                        content={contentLogin}
                        visible={state.visible}
                        onVisibleChange={handleVisibleChange}
                    >
                        <SmileFilled style={{ color: 'white', fontSize: '20px', cursor: 'pointer' }} />
                    </Popover>
                </Space>
            )
        }
    }
    const renderLoginLogo = () => {
        if (localStorage.getItem('name')) {
            return <Image
                src={`https://i.pravatar.cc/150?img=${localStorage.getItem('name')}`}
                style={{ width: '40px', height: '40px' }}
                preview={false}
                alt="" />
        } else {
            return <Image style={{ width: '40px', height: '40px' }} preview={false} src='./img/logo.png' alt="" />
        }
    }


    const { Component, ...restParam } = props;
    return <Route {...restParam} render={(propsRoute) => {
        return <>
            <Layout >
                <Sider width={59}>
                    <Space className={styles.menuButton}>
                        <Space className={styles.header_top}>
                            <Space className='logo mb-2'>
                                <Image src="./img/logo.png" alt="" preview={false} />
                            </Space>
                            <Tooltip placement="right" title={textDrawerSearch}>
                                <Space className={styles.header_top_item}>
                                    {/* <DrawerSearch id={state.projectId} /> */}
                                </Space>
                            </Tooltip>
                            <Tooltip placement="right" title={textModalCreate}>
                                <Space className={styles.header_top_item}>
                                    {/* <ModalCreate /> */}
                                </Space>
                            </Tooltip>
                        </Space>
                        <Space className={styles.header_bottom}>
                            <Space className="logo_user mb-3">
                                {renderIconLogin()}
                            </Space>
                            <Space className='header-bottom-item'>
                                <Tooltip placement="right" title='About'>
                                    <Button type='text'>
                                        <QuestionCircleFilled style={{ fontSize: '20px', color: 'white' }} />
                                    </Button>
                                </Tooltip>
                            </Space>
                        </Space>
                    </Space>
                </Sider>
                <Sider width={220} >
                    <Space direction="vertical" className={styles.menuItem}>
                        <Space className={styles.project_title}>
                            {renderLoginLogo()}
                            <Space direction="vertical" align="start" className='ml-3'>
                                <Text level={4} strong >Angular Jira Clone</Text>
                                <Text level={5}>Software Project</Text>
                            </Space>
                        </Space>
                        <NavLink to="/"
                            style={{ color: '#172B4D' }}
                            onClick={() => { setState({ active: 0, breadcrumb: 'Kanban Board' }) }}
                            className={state.active === 0 ? `${styles.function_active}` : `${styles.function_item}`}
                        >
                            <TableOutlined style={{ marginRight: '15px' }} />
                            <Space >
                                <Text strong>Kanban Board</Text>
                            </Space>
                        </NavLink>
                        <NavLink to="/projectmanagement"
                            style={{ color: '#172B4D' }}
                            onClick={() => { setState({ active: 2, breadcrumb: 'Project Manage' }) }}
                            className={state.active === 2 ? `${styles.function_active}` : `${styles.function_item}`}
                        >
                            <SettingOutlined style={{ marginRight: '15px' }} />
                            <Space >
                                <Text strong>Project Manage</Text>
                            </Space>
                        </NavLink>
                        <NavLink to="/project"
                            style={{ color: '#172B4D' }}
                            onClick={() => { setState({ active: 1, breadcrumb: 'Project Setting' }) }}
                            className={state.active === 1 ? `${styles.function_active}` : `${styles.function_item}`}
                        >
                            <SettingOutlined style={{ marginRight: '15px' }} />
                            <Space >
                                <Text strong>Project Setting</Text>
                            </Space>
                        </NavLink>
                        <NavLink to="/createProject"
                            style={{ color: '#172B4D' }}
                            onClick={() => { setState({ active: 3, breadcrumb: 'Create Project' }) }}
                            className={state.active === 3 ? `${styles.function_active}` : `${styles.function_item}`}
                        >
                            <SettingOutlined style={{ marginRight: '15px' }} />
                            <Space>
                                <Text strong >Create Project</Text>
                            </Space>
                        </NavLink>
                        <Divider />
                    </Space>
                </Sider>
                <Layout >
                    <Header className={styles.headerTable}>
                        <Breadcrumb style={{ marginTop: '20px', color: 'rgb(94, 108, 132)' }}>
                            <Breadcrumb.Item>Project</Breadcrumb.Item>
                            <Breadcrumb.Item>Angular Jira Clone</Breadcrumb.Item>
                            <Breadcrumb.Item>{state.breadcrumb}</Breadcrumb.Item>
                        </Breadcrumb>
                    </Header>
                    <Content>
                        <Component {...propsRoute} setProjectId={setProjectId} />
                    </Content>
                </Layout>
            </Layout>
        </ >
    }} />
}