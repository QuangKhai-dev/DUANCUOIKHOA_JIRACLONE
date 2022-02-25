import React, { useEffect } from 'react'
import { Input, Button, Typography, Space, Form, Divider, notification } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import styles from './Login.module.css'
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { THEO_DOI_SIGN_IN_API } from '../../../Redux/types/UserTypes';
import { NavLink } from 'react-router-dom';
import * as Yup from 'yup';
import LoginFb from '../LoginFb/LoginFb';
import { history } from '../../../Libs/history';

const { Title } = Typography;

export default function Login(props) {
    const dispatch = useDispatch()
    const { messageNoti } = useSelector(state => state.ProjectReducer)
    const openNotificationWithIcon = (type, description) => {
        notification[type]({
            message: 'Thông báo',
            description: description,
        })
    }
    useEffect(() => {
        if (messageNoti.statusCode == 200 && messageNoti.location === 'login') {
            openNotificationWithIcon('success', 'Đăng nhập thành công, bạn sẽ được chuyển hướng đến Trang chủ.')
            setTimeout(() => {
                history.push('/')
            }, 2500)
            dispatch({
                type: 'CLEAR_MESSAGE',
            })
        } else if (messageNoti.statusCode !== 200 && messageNoti.location === 'login') {
            openNotificationWithIcon('warning', 'Đăng nhập thất bại, vui lòng kiểm tra lại tài khoản và mật khẩu.')
            dispatch({
                type: 'CLEAR_MESSAGE',
            })
        }

    }, [messageNoti])



    //Validate Login
    const formik = useFormik({
        initialValues: {
            email: '',
            passWord: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Không đúng định dạng Email').required('Không bỏ trống Email'),
            passWord: Yup.string().min(6, 'Mật khẩu từ 6 ký tự trở lên').max(12, 'Mật khẩu không quá 12 ký tự').required('Không bỏ trống mật khẩu')
        }),
        onSubmit: values => {
            dispatch({
                type: THEO_DOI_SIGN_IN_API,
                userInfo: values,
            })
            //message khi bấm login
        },
    });




    return (
        <Space className={styles.loginPage}>
            <Title level={3} style={{ color: 'rgb(94, 108, 132)' }}>Đăng nhập Jira</Title>
            <Form
                layout={'horizontal'}
                className={styles.formLogin}
                onFinish={formik.handleSubmit}
            >
                <Form.Item >
                    <Input onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" size="large" name='email' placeholder="Email" prefix={<MailOutlined />} />
                    {formik.touched.email && formik.errors.email ? (
                        <Space style={{ display: 'block', color: 'red', marginTop: '5px' }} >{formik.errors.email}</Space >
                    ) : null}
                </Form.Item>
                <Form.Item >
                    <Input onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" name='passWord' size="large" placeholder="Password" prefix={<LockOutlined />} />
                    {formik.touched.passWord && formik.errors.passWord ? (
                        <Space style={{ display: 'block', color: 'red', marginTop: '5px' }} >{formik.errors.passWord}</Space>
                    ) : null}
                </Form.Item>
                <Form.Item className={styles.signButton}>
                    <Button block htmlType='submit' type="primary" >Đăng nhập</Button>
                </Form.Item>
                <Divider style={{ margin: '0 0 10px 0' }} />
                <Form.Item style={{ textAlign: 'center', marginBottom: '5px' }} >
                    <NavLink to="/resignter" style={{ color: 'rgb(0, 82, 204)' }}>Đăng ký tài khoản</NavLink>
                </Form.Item>
                <Form.Item>
                    <LoginFb />
                </Form.Item>
            </Form >
        </Space >
    )
}
