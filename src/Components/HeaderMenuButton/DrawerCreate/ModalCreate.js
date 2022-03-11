import React, { useEffect, useRef, useState } from 'react';
import { Modal, Button, Select, InputNumber, Slider, Row, Col, Form, Input, Typography, notification } from 'antd';
import { Editor } from '@tinymce/tinymce-react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { PlusOutlined } from '@ant-design/icons';
import { THEO_DOI_CREATE_TASK_API, THEO_DOI_GETALL_PRIORITY_API, THEO_DOI_GETALL_STATUS_API, THEO_DOI_GETALL_TASKTYPE_API, THEO_DOI_GET_ALLPROJECT_API, THEO_DOI_GET_PROJECTDETAIL_API } from '../../../Redux/types/UserTypes';
import styles from './ModalCreate.module.css'
import { history } from '../../../Libs/history';

const { Option } = Select;
const { Title } = Typography;

export default function ModalCreate(props) {
    const dispatch = useDispatch();
    const editorRef = useRef(null);
    const { messageNoti } = useSelector(state => state.ProjectReducer)
    //Modal 
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [timeSpent, setTimeSpent] = useState(0)
    const [timeRemaining, setTimeRemaining] = useState(200)
    useEffect(() => {
        dispatch({
            type: THEO_DOI_GET_ALLPROJECT_API
        })
        dispatch({
            type: THEO_DOI_GETALL_PRIORITY_API
        })
        dispatch({
            type: THEO_DOI_GETALL_TASKTYPE_API
        })
        dispatch({
            type: THEO_DOI_GETALL_STATUS_API
        })
        if (messageNoti.statusCode == 200 && messageNoti.location === 'createTask') {
            openNotificationWithIcon('success', 'Khởi tạo Task thành công,đang chuyển hướng bạn đến Kanban Board')
            // console.log(messageNoti.projectId);
            setTimeout(() => {
                history.push(`/homeindex/${messageNoti.projectId}`)
                dispatch({
                    type: THEO_DOI_GET_PROJECTDETAIL_API,
                    projectId: messageNoti.projectId
                })
            }, 2500)
            dispatch({
                type: 'CLEAR_MESSAGE',
            })
            setIsModalVisible(false)
        } else if (messageNoti.statusCode == 500 && messageNoti.location === 'createTask') {
            openNotificationWithIcon('warning', 'Khởi tạo thất bại')
            dispatch({
                type: 'CLEAR_MESSAGE',
            })
        }
    }, [messageNoti])


    //Formik
    const formik = useFormik({
        initialValues: {
            taskName: '',
            description: '',
            listUserAsign: [],
            statusId: 1,
            originalEstimate: '',
            timeTrackingSpent: timeSpent,
            timeTrackingRemaining: timeRemaining,
            projectId: '',
            typeId: 1,
            priorityId: 1
        },
        onSubmit: values => {
            // console.log(values)
            dispatch({
                type: THEO_DOI_CREATE_TASK_API,
                model: values
            })
        },
    });
    //notification
    const openNotificationWithIcon = (type, description) => {
        notification[type]({
            message: 'Thông báo',
            description: description,
        })
    }
    const showModal = () => {
        setIsModalVisible(true);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const { arrAllProject } = useSelector(state => state.ProjectReducer)
    const { arrAllPriority } = useSelector(state => state.PriorityReducer)
    const { arrAllTaskType } = useSelector(state => state.TaskTypeReducer)
    const { arrAllStatus } = useSelector(state => state.StatusReducer)

    const children = [];
    const [projectIdAss, setProjectIdAss] = useState()
    //lấy project Id để tạo danh sách Assigness
    const handleChangeId = (value) => {
        formik.setFieldValue('projectId', value)
        const assById = arrAllProject.find(project => project.id === value).members
        assById.forEach((user, index) => { children.push({ label: user.name, value: user.userId, key: index }) })
        setProjectIdAss(children)
    }
    const handleChangePriority = (value) => {
        formik.setFieldValue('priorityId', value)
    }
    const handleChangeStatusId = (value) => {
        formik.setFieldValue('statusId', value)
    }
    const handleChangeTypeId = (value) => {
        formik.setFieldValue('typeId', value)
    }

    return (
        <>
            <Button onClick={showModal} type='text' icon={<PlusOutlined style={{ color: 'white', fontSize: '20px' }} />}></Button>
            <Modal
                title="Create Task"
                style={{ top: 10 }}
                width={1000}
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
            >
                <Form onFinish={formik.handleSubmit}>
                    <Form.Item>
                        <Title level={5} style={{ color: '#5e6c84', fontSize: '15px' }}>PROJECT</Title>
                        <Select
                            className={styles.formItem}
                            name='projectId'
                            size='large'
                            onSelect={handleChangeId}
                        >
                            {arrAllProject.map((task, index) => {
                                return <Option key={index} value={Number(task.id)}>{task.alias}</Option>
                            })}
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Title level={5} style={{ color: '#5e6c84', fontSize: '15px' }}>Task Name</Title>
                        <Input className={styles.formItem} onChange={formik.handleChange} type="text" name='taskName' />
                    </Form.Item>
                    <Form.Item>
                        <Row gutter={16}>
                            <Col span={8}>
                                <Title level={5} style={{ color: '#5e6c84', fontSize: '15px' }}>Priority</Title>
                                <Select defaultValue="HIGH" className={styles.formItem} name='priorityId' onChange={handleChangePriority}>
                                    {arrAllPriority?.map((priority, index) => {
                                        return <Option key={index} value={Number(priority.priorityId)}>{priority.priority.toUpperCase()}</Option>
                                    })}
                                </Select>
                            </Col>
                            <Col span={8}>
                                <Title level={5} style={{ color: '#5e6c84', fontSize: '15px' }}>Status</Title>
                                <Select defaultValue="BACKLOG" className={styles.formItem} name='statusId' onChange={handleChangeStatusId}>
                                    {arrAllStatus.map((status, index) => {
                                        return <Option key={index} value={Number(status.statusId)}>{status.statusName.toUpperCase()}</Option>
                                    })}
                                </Select>
                            </Col>
                            <Col span={8}>
                                <Title level={5} style={{ color: '#5e6c84', fontSize: '15px' }}>Task Type</Title>
                                <Select defaultValue="BUG" className={styles.formItem} name='typeId' onChange={handleChangeTypeId}>
                                    {arrAllTaskType?.map((task, index) => {
                                        return <Option key={index} value={Number(task.id)}>{task.taskType.toUpperCase()}</Option>
                                    })}
                                </Select>
                            </Col>
                        </Row>
                    </Form.Item>
                    <Form.Item>
                        <Title level={5} style={{ color: '#5e6c84', fontSize: '15px' }}>Description</Title>
                        <Editor name="description"
                            apiKey="swwa9xliphk6eyhb3wegeuf39jsdmrgmnhkzd8r8khij1zgp"
                            onInit={(editor) => editorRef.current = editor}
                            onEditorChange={(value) => { formik.setFieldValue("description", value) }}
                            // onEditorChange={ }
                            init={{
                                height: 150,
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
                    <Form.Item>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Title level={5} style={{ color: '#5e6c84', fontSize: '15px' }}>Assigness</Title>
                                <Select
                                    className={styles.formItem}
                                    name='listUserAsign'
                                    mode="multiple"
                                    placeholder="Please select"
                                    onChange={(value) => { formik.setFieldValue('listUserAsign', value) }}
                                    optionFilterProp="label"
                                    options={projectIdAss}
                                    style={{ width: '100%' }}
                                >
                                </Select>
                            </Col>
                            <Col span={12}>
                                <Title level={5} style={{ color: '#5e6c84', fontSize: '15px' }}>Time Tracking</Title>
                                <Slider
                                    min={0} max={200}
                                    onChange={
                                        (value) => {
                                            setTimeSpent(value)
                                            setTimeRemaining(200 - value)
                                            formik.setFieldValue('timeTrackingSpent', value)
                                            formik.setFieldValue('timeTrackingRemaining', 200 - value)
                                        }
                                    }
                                    value={timeSpent}
                                />
                            </Col>
                        </Row>
                    </Form.Item>
                    <Form.Item>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Title level={5} style={{ color: '#5e6c84', fontSize: '15px' }}>OriginalEstimate</Title>
                                <InputNumber
                                    className={styles.formItem}
                                    name='originalEstimate'
                                    min={0}
                                    onChange={(value) => { formik.setFieldValue('originalEstimate', value) }}
                                    type='number'
                                    style={{ width: '100%' }}
                                    defaultValue={0}
                                />
                            </Col>
                            <Col span={12}>
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Title level={5} style={{ color: '#5e6c84', fontSize: '15px' }}>Time Spent</Title>
                                        <InputNumber
                                            className={styles.formItem}
                                            name='timeTrackingSpent'
                                            min={0}
                                            type='number'
                                            style={{ width: '100%' }}
                                            onChange={(value) => {
                                                setTimeSpent(value)
                                                setTimeRemaining(200 - value)
                                                formik.setFieldValue('timeTrackingSpent', value)
                                            }}
                                            value={timeSpent}
                                        />
                                    </Col>
                                    <Col span={12}>
                                        <Title level={5} style={{ color: '#5e6c84', fontSize: '15px' }}>Time Remaining</Title>
                                        <InputNumber
                                            className={styles.formItem}
                                            name='timeTrackingRemaining'
                                            min={0}
                                            style={{ width: '100%' }}
                                            type='number'
                                            onChange={(value) => {
                                                formik.setFieldValue('timeTrackingRemaining', 200 - timeSpent)
                                            }
                                            }
                                            value={timeRemaining}
                                        />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType='submit' type="primary" >
                            Save
                        </Button>
                        <Button danger type="primary" className='ml-3' onClick={handleCancel}>
                            Cancel
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}
