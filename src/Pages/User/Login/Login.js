import React from 'react'
import { Input, Button, Typography, Space, Form, Divider, Alert } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import styles from './Login.module.css'
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
// import { THEO_DOI_SIGN_IN_API } from '../../../Redux/types/UserTypes';
import { NavLink } from 'react-router-dom';
import * as Yup from 'yup';
import LoginFb from '../LoginFb/LoginFb';
import { THEO_DOI_SIGN_IN_API } from '../../../Redux/types/UserTypes';
// import LoginFb from '../LoginFb/LoginFb';

const { Title } = Typography;

export default function Login(props) {
    const dispatch = useDispatch()

    // const responseFacebook = (response) => {
    //     console.log(response);
    // }

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
                        <Space style={{ display: 'block', color: 'red' }} >{formik.errors.email}</Space >
                    ) : null}
                </Form.Item>
                <Form.Item >
                    <Input onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" name='passWord' size="large" placeholder="Password" prefix={<LockOutlined />} />
                    {formik.touched.passWord && formik.errors.passWord ? (
                        <Space style={{ display: 'block', color: 'red' }} >{formik.errors.passWord}</Space>
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
