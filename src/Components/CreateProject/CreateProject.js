import React, { useEffect, useRef } from 'react'
import { Form, Input, Select, Button, Typography, notification, Space } from 'antd';
import { Editor } from '@tinymce/tinymce-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { THEO_DOI_CREATE_PROJECT_API, THEO_DOI_GET_PROJECTCATEGORY_API } from '../../Redux/types/UserTypes';
import styles from './CreateProject.module.css'
import { history } from './../../Libs/history'
const { Option } = Select;
const { Title } = Typography;

export default function CreateProjectModal(props) {
    const dispatch = useDispatch()
    //formik
    const editorRef = useRef(null);
    const formik = useFormik({
        initialValues: {
            projectName: '',
            description: '',
            categoryid: 1,
        },
        validationSchema: Yup.object({
            projectName: Yup.string().required('Không bỏ trống tên dự án'),
            description: Yup.string().required('Không bỏ trống mô tả')
        }),
        onSubmit: values => {
            formik.resetForm()
            dispatch({
                type: THEO_DOI_CREATE_PROJECT_API,
                model: values,
                formik
            })
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
        dispatch({
            type: THEO_DOI_GET_PROJECTCATEGORY_API
        })
        if (messageNoti.statusCode == 200 && messageNoti.location === 'createProject') {
            openNotificationWithIcon('success', 'Khởi tạo project thành công, bạn sẽ được chuyển hướng đến Project Management.')
            setTimeout(() => {
                history.push('/projectManagement')
            }, 2500)
            dispatch({
                type: 'CLEAR_MESSAGE',
            })
        } else if (messageNoti.statusCode == 500 && messageNoti.location === 'createProject') {
            openNotificationWithIcon('warning', 'Khởi tạo thất bại, tên Project đã có người đặt.')
            dispatch({
                type: 'CLEAR_MESSAGE',
            })
        }
    }, [messageNoti])

    const { arrProjectCategory } = useSelector(state => state.ProjectCategoryReducer)
    //notification when createproject success
    return (
        <Space direction='vertical' className={styles.tableIndex}>
            <Title level={4} style={{ color: '#172B4D', marginBottom: '20px' }}>Create Project</Title>
            <Form onFinish={formik.handleSubmit} layout='vertical' size="middle">
                <Form.Item>
                    <Title level={5} style={{ color: '#5e6c84', fontSize: '15px' }}>PROJECTNAME</Title>
                    <Input
                        className={styles.formItem}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="projectName"
                        placeholder="Project Name"
                    />
                    {formik.touched.projectName && formik.errors.projectName ? (
                        <Space style={{ display: 'block', color: 'red', marginTop: '5px' }}>{formik.errors.projectName}</Space>
                    ) : null}
                </Form.Item>
                <Form.Item>
                    <Title level={5} style={{ color: '#5e6c84', fontSize: '15px' }}>DESCRIPTION</Title>
                    <Editor
                        name="description"
                        apiKey="swwa9xliphk6eyhb3wegeuf39jsdmrgmnhkzd8r8khij1zgp"
                        onInit={(editor) => editorRef.current = editor}
                        onEditorChange={(value) => { formik.setFieldValue("description", value) }}
                        init={{
                            height: 250,
                            menubar: false,
                            width: '40%',
                            plugins: [
                                'advlist autolink lists link image charmap print preview anchor',
                                'searchreplace visualblocks code fullscreen',
                                'insertdatetime media table paste code help wordcount'
                            ],
                            toolbar: 'undo redo | formatselect | ' +
                                'bold italic backcolor | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat | help',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                        }}
                    />
                    {formik.touched.description && formik.errors.description ? (
                        <Space style={{ display: 'block', color: 'red', marginTop: '5px' }}>{formik.errors.description}</Space>
                    ) : null}
                </Form.Item>
                <Form.Item >
                    <Title level={5} style={{ color: '#5e6c84', fontSize: '15px' }}>CATEGORYID</Title>
                    <Select
                        className={styles.formItem}
                        onChange={(value) => { formik.setFieldValue('categoryid', value) }}
                        name="categoryid"
                        defaultValue="Dự Án Web"
                    >
                        {arrProjectCategory.map((project, index) => {
                            return (<Option value={project.id} key={index}>{project.projectCategoryName}</Option>)
                        })}
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button htmlType='submit' type='primary'>
                        Save
                    </Button>
                    <Button danger type="primary" className='ml-3'>
                        Cancel
                    </Button>
                </Form.Item>
            </Form>
        </Space>
    )
}