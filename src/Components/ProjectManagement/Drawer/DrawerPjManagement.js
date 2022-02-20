import React, { useEffect } from 'react'
import { Space, Drawer, Form, Button, Col, Row, Input, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Editor } from '@tinymce/tinymce-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { THEO_DOI_UPDATE_PROJECT_API } from '../../../Redux/types/UserTypes';


const { Option } = Select;

export default function DrawerPjManagement(props) {
    // Của Drawer
    const { visible } = useSelector(state => state.ProjectReducer)
    const onClose = () => {
        dispatch({ type: "CLOSE_DRAWER" })
        return visible
    };

    const dispatch = useDispatch();
    const { projectById } = useSelector(state => state.ProjectReducer)
    const { arrProjectCategory } = useSelector(state => state.ProjectCategoryReducer)

    const formik = useFormik({
        //dùng enableReinitialize để set value mặc định cho formik
        enableReinitialize: true,
        initialValues: {
            projectName: projectById.projectName,
            description: projectById.description,
            categoryid: projectById.categoryid,
        },
        validationSchema: Yup.object({
            projectName: Yup.string().required('Không bỏ trống tên dự án'),
            description: Yup.string().required('Không bỏ trống mô tả'),
        }),
        onSubmit: values => {
            dispatch({
                type: THEO_DOI_UPDATE_PROJECT_API,
                projectId: projectById.id,
                projectUpdate: {
                    projectName: values.projectName,
                    description: values.description,
                    categoryId: values.categoryid
                }

            })
        },
    });

    //Tạo form để reset lại dữ liệu projectById mỗi khi đóng 
    const [form] = Form.useForm();
    useEffect(() => {
        form.setFieldsValue(projectById)
    }, [form, projectById])


    return (
        <>
            <Drawer
                title="Create a new account"
                width={720}
                onClose={() => { onClose() }}
                visible={visible}
                bodyStyle={{ paddingBottom: 80 }}
            >
                <Form form={form} layout="vertical" onFinish={formik.handleSubmit}>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item
                                name="id"
                                label="Id"
                            >
                                <Input disabled onChange={formik.handleChange} onBlur={formik.handleBlur} />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name="projectName"
                                label="Project Name"
                            >
                                <Input onChange={formik.handleChange} onBlur={formik.handleBlur} />
                            </Form.Item>
                            {formik.touched.projectName && formik.errors.projectName ? (
                                <Space style={{ display: 'block', color: 'red' }}>{formik.errors.projectName}</Space>
                            ) : null}
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name='name'
                                label="creator"
                            >
                                <Input disabled onChange={formik.handleChange} onBlur={formik.handleBlur} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="description"
                                label="Description"
                            >
                                <Editor
                                    apiKey="swwa9xliphk6eyhb3wegeuf39jsdmrgmnhkzd8r8khij1zgp"
                                    onEditorChange={(value) => { formik.setFieldValue("description", value) }}
                                    init={{
                                        height: 250,
                                        menubar: false,
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
                            </Form.Item>
                            {formik.touched.description && formik.errors.description ? (
                                <Space style={{ display: 'block', color: 'red' }}>{formik.errors.description}</Space>
                            ) : null}
                            <Form.Item name="categoryid" label="CATEGORYID">
                                <Select
                                    onChange={(value) => { formik.setFieldValue('categoryid', value) }}
                                    defaultValue="Dự Án Web"
                                >
                                    {arrProjectCategory.map((project, index) => {
                                        return (<Option value={project.id} key={index}>{project.projectCategoryName}</Option>)
                                    })
                                    }
                                </Select>
                                {formik.touched.categoryid && formik.errors.categoryid ? (
                                    <Space style={{ display: 'block', color: 'red' }}>{formik.errors.categoryid}</Space>
                                ) : null}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col>
                            <Form.Item>
                                <Space>
                                    <Button onClick={() => { onClose() }}>Cancel</Button>
                                    <Button htmlType='submit' type="primary" onClick={onClose}>
                                        Submit
                                    </Button>
                                </Space>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Drawer>
        </>
    )
}
