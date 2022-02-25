import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Button, Col, Divider, Input, Popover, Row, Select, Space, Typography, Form, Popconfirm, message } from 'antd';
import { DeleteOutlined, FullscreenOutlined, CloseOutlined } from '@ant-design/icons';
import { THEO_DOI_CREATE_COMMENT_API, THEO_DOI_DELETE_COMMENT_API, THEO_DOI_GETALL_COMMENT_API, THEO_DOI_REMOVE_TASK_API } from '../../../Redux/types/UserTypes';
import { useFormik } from 'formik';
const { Option } = Select;
const { Title } = Typography;

export default function ModalJiraBoard(props) {
    const dispatch = useDispatch();
    const { arrAllComment } = useSelector(state => state.CommentReducer)

    useEffect(() => {
        dispatch({
            type: THEO_DOI_GETALL_COMMENT_API,
            taskId: props.task.taskId
        })

    }, [arrAllComment.length]);

    const formik = useFormik({
        initialValues: {
            contentComment: '',
        },
        onSubmit: values => {
            dispatch({
                type: THEO_DOI_CREATE_COMMENT_API,
                taskId: props.task.taskId,
                contentComment: values.contentComment
            })
        },
    });

    const renderSelectTaskType = () => {
        return <Select defaultValue={props.task.taskId} style={{ width: 120 }} >
            {/* {props.task?.map((task, index) => {
                <Option key={index} value={task.taskId}>{task.taskName}</Option>
            })} */}
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="disabled" disabled>
                Disabled
            </Option>
            <Option value="Yiminghe">yiminghe</Option>
        </Select>
    }


    return (<>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
                {props.renderTaskType(props.task.taskTypeDetail.id)}
                {renderSelectTaskType()}
                <span style={{ color: '#42526e', fontSize: '14.5px' }}> TASKID: {props.task.taskId}</span>
            </div>
            <div>
                <Button type="link" style={{ color: '#42526e' }}>Give FeedBack</Button>
                <Popconfirm
                    placement="topRight"
                    title={<span>Bạn chắc muốn xóa comment này?</span>}
                    onConfirm={() => {
                        dispatch({
                            type: THEO_DOI_REMOVE_TASK_API,
                            taskId: props.task.taskId,
                            projectId: Number(props.projectId)
                        })
                        message.success('xóa thành công')
                        props.handleCancel()
                    }}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button type="link" icon={<DeleteOutlined style={{ color: '#42526e', fontSize: '20px' }} />} />
                </Popconfirm>
                <Button type="link" icon={<FullscreenOutlined style={{ color: '#42526e', fontSize: '20px' }} />}></Button>
                <Button onClick={props.handleCancel} type="link" icon={<CloseOutlined style={{ color: '#42526e', fontSize: '20px' }} />}></Button>
            </div>
        </div>
        <Row gutter={16}>
            <Col span={16}>
                <Space direction="vertical" style={{ width: '100%' }}>
                    <Input
                        style={{ fontSize: '24px', fontWeight: 500, marginLeft: '-8px', color: '#172b4d' }}
                        defaultValue={props.task.taskName}
                        bordered={false}
                    ></Input>
                    <Space >
                        <Title level={5} style={{ color: '#172B4D' }}>Description</Title>
                    </Space>
                    <Space direction="vertical" style={{ width: '100%' }}>
                        <Title level={5} style={{ color: '#172B4D' }}>Comments</Title>
                        <Space direction="vertical" style={{ width: '500px' }}>
                            {arrAllComment?.map((comment, index) => {
                                return <Space key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', paddingRight: '20px', width: '100%' }} >
                                    <Space>
                                        <Space>
                                            <Avatar>{comment.user.name.charAt()}</Avatar>
                                            <Title level={5} style={{ color: '#172B4D' }}>{comment.user.name} : </Title>
                                        </Space>
                                        <Title level={5} style={{ color: '#172B4D' }}>{comment.contentComment}</Title>
                                    </Space>
                                    <Space>
                                        <Popconfirm
                                            placement="topRight"
                                            title={<span>Bạn chắc muốn xóa comment này?</span>}
                                            onConfirm={() => {
                                                dispatch({
                                                    type: THEO_DOI_DELETE_COMMENT_API,
                                                    taskId: props.task.taskId,
                                                    commentId: comment.id
                                                })
                                                message.success('xóa thành công')
                                            }}
                                            okText="Yes"
                                            cancelText="No"
                                        >
                                            <Button size='middle' type='primary' danger ><DeleteOutlined /></Button>
                                        </Popconfirm>
                                    </Space>
                                </Space>
                            })}
                        </Space>
                        <Space direction="vertical">
                            <Space>
                                <Avatar>{localStorage.getItem('name').charAt()}</Avatar>
                                <Title level={5} style={{ color: '#172B4D' }}>{localStorage.getItem('name')}</Title>
                            </Space>
                            <Form onFinish={formik.handleSubmit} >
                                <Space style={{ width: '80%' }}>
                                    <Input.TextArea
                                        placeholder='Add a Comment'
                                        name='comment'
                                        style={{ fontWeight: 500, marginLeft: '40px', color: '#172b4d', paddingTop: '10px' }}
                                        onChange={(e) => {
                                            formik.setFieldValue('contentComment', e.target.value)
                                        }}
                                    ></ Input.TextArea>
                                </Space>
                                <Space style={{ marginLeft: '40px', paddingTop: '15px' }}>
                                    <Button htmlType='submit' type='primary'>Save</Button>
                                    <Button onClick={props.handleCancel} type='primary' danger>Cancel</Button>
                                </Space>
                            </Form>
                        </Space>
                    </Space>
                </Space>
            </Col>
            <Col span={8}>
                <Space direction="vertical" style={{ marginTop: '20px' }}>
                    <Space direction="vertical">
                        <Title level={5} style={{ color: '#5e6c84', fontWeight: 700, lineHeight: 0 }}>STATUS</Title>
                        <Space style={{ marginBottom: '20px' }} >
                            <Select
                                showArrow={false}
                                defaultValue='Give FeedBack'
                            >
                                <Option>Give FeedBack</Option>
                            </Select>
                        </Space>
                    </Space>
                    <Space direction="vertical">
                        <Title level={5} style={{ color: '#5e6c84', fontWeight: 700, lineHeight: 0 }}>CREATOR</Title>
                        <Space style={{ marginBottom: '20px' }} >
                            <Select
                                showArrow={false}
                                defaultValue='Give FeedBack'
                            >
                                <Option>Give FeedBack</Option>
                            </Select>
                        </Space>
                    </Space>
                    <Space direction="vertical">
                        <Title level={5} style={{ color: '#5e6c84', fontWeight: 700, lineHeight: 0 }}>ASSIGNEES</Title>
                        <Space style={{ marginBottom: '20px' }} >
                            <Popover content='' title="Title">
                                <Button type="link">+Add Assignee</Button>
                            </Popover>
                        </Space>
                    </Space>
                    <Space direction="vertical">
                        <Title level={5} style={{ color: '#5e6c84', fontWeight: 700, lineHeight: 0 }}>PRIORITY</Title>
                    </Space>
                </Space>
                <Divider />
            </Col>
        </Row>
    </>);
}
