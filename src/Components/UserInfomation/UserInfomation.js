import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Typography, Form, Row, Col, Space, Button, notification } from 'antd';
import styles from './UserInfomation.module.css'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { THEO_DOI_EDITUSER } from '../../Redux/types/UserTypes';
import { history } from '../../Libs/history';

const { Title } = Typography;

export default function UserInfomationModal() {
    const dispatch = useDispatch()
    let { arrGetUser } = useSelector(state => state.UserReducer)
    //Validate Login
    const formik = useFormik({
        initialValues: {
            id: localStorage.getItem('id'),
            name: localStorage.getItem('name'),
            email: localStorage.getItem('email'),
            passWord: localStorage.getItem('passWord'),
            phoneNumber: localStorage.getItem('phoneNumber')
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Không bỏ trống tên'),
            phoneNumber: Yup.string().min(10, 'Sdt gồm 10 số').max(11, 'Sdt không quá 11 số').required('Không bỏ trống số điện thoại'),
            email: Yup.string().email('Không đúng định dạng Email').required('Không bỏ trống Email'),
            passWord: Yup.string().min(6, 'Mật khẩu từ 6 ký tự trở lên').max(12, 'Mật khẩu không quá 12 ký tự').required('Không bỏ trống mật khẩu')
        }),
        onSubmit: values => {
            // console.log(values)
            dispatch({
                type: THEO_DOI_EDITUSER,
                model: values,
            })
            //message khi bấm login
        },
    });

    const { messageNoti } = useSelector(state => state.ProjectReducer)
    const openNotificationWithIcon = (type, description) => {
        notification[type]({
            message: 'Thông báo',
            description: description,
        })
    }
    useEffect(() => {
        if (messageNoti.statusCode == 200 && messageNoti.location === 'editInfo') {
            openNotificationWithIcon('success', 'Chỉnh sửa thành công, vui lòng đăng nhập lại.')
            setTimeout(() => {
                history.push('/login')
            }, 2500)
            dispatch({
                type: 'CLEAR_MESSAGE',
            })
        } else if (messageNoti.statusCode !== 200 && messageNoti.location === 'editInfo') {
            openNotificationWithIcon('warning', 'Chỉnh sửa thất bại, vui lòng kiểm tra lại thông tin.')
            dispatch({
                type: 'CLEAR_MESSAGE',
            })
        }
    }, [messageNoti]);
    const handleSubmit = (e) => {
        e.target.reset()
    }

    return <>
        <Space direction='vertical' className={styles.tableUserInfomation}>
            <Title level={4} style={{ color: '#172B4D' }}>User Infomation</Title>
            <Form onFinish={formik.handleSubmit} layout='vertical' style={{ width: '50%', marginTop: '10px' }}>
                <Row gutter={14}>
                    <Col span={6}>
                        <Form.Item>
                            <Title level={5} style={{ color: '#5e6c84', fontSize: '15px' }}>ID</Title>
                            <Input
                                readOnly={true}
                                value={localStorage.getItem('id')}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={18}>
                        <Form.Item>
                            <Title level={5} style={{ color: '#5e6c84', fontSize: '15px' }}>NAME</Title>
                            <Input
                                name="name"
                                placeholder="Họ và tên"
                                defaultValue={localStorage.getItem('name')}
                                onChange={formik.handleChange} onBlur={formik.handleBlur}
                            />
                            {formik.touched.name && formik.errors.name ? (
                                <Space style={{ display: 'block', color: 'red', marginTop: '5px' }} >{formik.errors.name}</Space >
                            ) : null}
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item>
                    <Title level={5} style={{ color: '#5e6c84', fontSize: '15px' }}>EMAIL</Title>
                    <Input
                        style={{ width: '100%' }}
                        placeholder="Email"
                        name="email"
                        className={styles.formItem}
                        defaultValue={localStorage.getItem('email')}
                        onChange={formik.handleChange} onBlur={formik.handleBlur}
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <Space style={{ display: 'block', color: 'red', marginTop: '5px' }} >{formik.errors.email}</Space >
                    ) : null}
                </Form.Item>
                <Form.Item>
                    <Title level={5} style={{ color: '#5e6c84', fontSize: '15px' }}>PHONENUMBER</Title>
                    <Input
                        style={{ width: '100%' }}
                        placeholder="PhoneNumber"
                        className={styles.formItem}
                        name="phoneNumber"
                        defaultValue={localStorage.getItem('phoneNumber')}
                        onChange={formik.handleChange} onBlur={formik.handleBlur}
                    />
                    {formik.touched.passWord && formik.errors.passWord ? (
                        <Space style={{ display: 'block', color: 'red', marginTop: '5px' }} >{formik.errors.passWord}</Space >
                    ) : null}
                </Form.Item>
                <Form.Item>
                    <Title level={5} style={{ color: '#5e6c84', fontSize: '15px' }}>PASSWORD</Title>
                    <Input
                        style={{ width: '100%' }}
                        placeholder="Password"
                        className={styles.formItem}
                        name="passWord"
                        defaultValue={localStorage.getItem('passWord')}
                        onChange={formik.handleChange} onBlur={formik.handleBlur}
                    />
                    {formik.touched.passWord && formik.errors.passWord ? (
                        <Space style={{ display: 'block', color: 'red', marginTop: '5px' }} >{formik.errors.passWord}</Space >
                    ) : null}
                </Form.Item>
                <Form.Item>
                    <Button htmlType='submit' type='primary'>SAVE</Button>
                    <Button htmlType='reset' type='primary' className='ml-3' danger>CANCEL</Button>
                </Form.Item>
            </Form>
        </Space >
    </>;
}
