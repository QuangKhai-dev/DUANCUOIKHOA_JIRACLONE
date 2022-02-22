import { Button, Input, Divider, Space, Form } from "antd";
import React from "react";
import { NavLink } from "react-router-dom";
import { UserOutlined, LockOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import styles from './Resignter.module.css'
import { Typography } from 'antd';
import { useFormik } from 'formik';
import { useDispatch } from "react-redux";
// import { THEO_DOI_SIGNUP_API } from "../../../Redux/types/UserTypes";
import * as Yup from 'yup';
import { THEO_DOI_SIGNUP_API } from "../../../Redux/types/UserTypes";


const { Title } = Typography;

export default function Resignter(props) {
    const dispatch = useDispatch()
    //Validate Login
    const formik = useFormik({
        initialValues: {
            email: '',
            passWord: '',
            Name: '',
            phoneNumber: ''
        },
        validationSchema: Yup.object({
            Name: Yup.string().required('Không bỏ trống tên'),
            email: Yup.string().email('Không đúng định dạng Email').required('Không bỏ trống Email'),
            passWord: Yup.string().min(6, 'Mật khẩu từ 6 ký tự trở lên').max(12, 'Mật khẩu không quá 12 ký tự').required('Không bỏ trống mật khẩu'),
            phoneNumber: Yup.string().matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/, "Số điện thoại không phù hợp").required('Không bỏ trống số điện thoại'),
        }),
        onSubmit: values => {
            dispatch({
                type: THEO_DOI_SIGNUP_API,
                signUpInfo: values
            })
        },
    });

    return (
        <Space className={styles.resignterPage}>
            <Title level={3} style={{ color: 'rgb(94, 108, 132)', marginBottom: '20px' }}>Đăng ký Jira</Title>
            <Form
                layout={'horizontal'}
                onFinish={formik.handleSubmit}
                className={styles.formResignter}
            >
                <Form.Item >
                    <Input
                        name='email'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        type="text"
                        size="large"
                        placeholder="Email"
                        prefix={<MailOutlined />}
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <Space style={{ display: 'block', color: 'red', marginTop: '5px' }}>{formik.errors.email}</Space>
                    ) : null}
                </Form.Item>
                <Form.Item >
                    <Input
                        name='Name'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        type="text"
                        size="large"
                        placeholder="Họ Tên"
                        prefix={<UserOutlined />}
                    />
                    {formik.touched.Name && formik.errors.Name ? (
                        <Space style={{ display: 'block', color: 'red', marginTop: '5px' }}>{formik.errors.Name}</Space>
                    ) : null}
                </Form.Item>
                <Form.Item >
                    <Input
                        name='phoneNumber'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        type="text"
                        size="large"
                        placeholder="Phone Number"
                        prefix={<PhoneOutlined />}
                    />
                    {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                        <Space style={{ display: 'block', color: 'red', marginTop: '5px' }}>{formik.errors.phoneNumber}</Space>
                    ) : null}
                </Form.Item>
                <Form.Item >
                    <Input
                        name='passWord'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        type="text"
                        size="large"
                        placeholder="Password"
                        prefix={<LockOutlined />}
                    />
                    {formik.touched.passWord && formik.errors.passWord ? (
                        <Space style={{ display: 'block', color: 'red', marginTop: '5px' }}>{formik.errors.passWord}</Space>
                    ) : null}
                </Form.Item>
                <Form.Item className={styles.signButton}>
                    <Button style={{ width: '100%' }} htmlType='submit' type="primary" >Đăng ký</Button>
                </Form.Item>
                <Divider style={{ marginTop: '0' }} />
                <Space >
                    <NavLink to="/login" style={{ color: 'rgb(0, 82, 204)' }} >Bạn đã có tài khoản Jira? Đăng nhập</NavLink>
                </Space>
            </Form >
        </Space>
    )
}
