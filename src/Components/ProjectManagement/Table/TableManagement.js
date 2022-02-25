import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { THEO_DOI_ADD_MEMBER_API, THEO_DOI_DELETE_PROJECT_API, THEO_DOI_GET_ALLPROJECT_API, THEO_DOI_GET_USER_API, THEO_DOI_REMOVE_USER_FROMPROJECT_API } from '../../../Redux/types/UserTypes';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { Button, Space, Tag, Popconfirm, message, AutoComplete, Avatar, Popover, Table } from 'antd';

export default function TableManagement() {
    const dispatch = useDispatch()
    //get all project API
    const { arrAllProject } = useSelector(state => state.ProjectReducer)
    const { arrGetUser } = useSelector(state => state.UserReducer)

    useEffect(() => {
        dispatch({
            type: THEO_DOI_GET_ALLPROJECT_API
        })
    }, [])
    // setState
    const [value, setValue] = useState('');
    const searchRef = useRef(null)
    const [state, setState] = useState({
        filteredInfo: null,
        sortedInfo: null,
    })
    const renderTable = () => {
        const renderMembers = (members, id) => {
            const columnsMember = [
                {
                    title: 'Name',
                    dataIndex: 'name',
                    key: 'name',
                },
                {
                    title: 'ID',
                    dataIndex: 'userId',
                    key: 'userId',
                    sorter: (a, b) => a.userId - b.userId,
                },
                {
                    title: 'Action',
                    dataIndex: 'action',
                    key: 'action',
                    render: (text, record, index) => {
                        return (
                            <Popconfirm
                                placement="topRight"
                                title={'Bạn muốn xóa người này?'}
                                onConfirm={() => {
                                    dispatch({
                                        type: THEO_DOI_REMOVE_USER_FROMPROJECT_API,
                                        memberInfo: {
                                            projectId: id,
                                            userId: record.userId
                                        }
                                    })
                                    message.info('Xóa thành công');
                                }}
                                okText="Yes"
                                cancelText="No">
                                <Button type='primary' danger
                                    style={{ width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <DeleteOutlined />
                                </Button>
                            </Popconfirm>
                        )
                    }
                },
            ];
            return <Table id={id} pagination={{ defaultPageSize: 4 }} size='middle' columns={columnsMember} dataSource={members} />
        };
        let { sortedInfo, filteredInfo } = state;
        sortedInfo = sortedInfo || {};
        filteredInfo = filteredInfo || {};
        //popover
        const alertText = 'Bạn chắc muốn xóa Project này chứ?';
        const showDrawer = (id) => {
            dispatch({
                type: "OPEN_DRAWER",
                id
            })
        };

        const handleChange = (pagination, filters, sorter) => {
            setState({
                filteredInfo: filters,
                sortedInfo: sorter,
            });
        };

        const columns = [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
                sorter: (a, b) => a.id - b.id,
                sortOrder: sortedInfo.columnKey === 'id' && sortedInfo.order,
                ellipsis: true,
            },
            {
                title: 'Project Name',
                dataIndex: 'projectName',
                key: 'projectName',
                render: (text, record, index) => {
                    return <NavLink to={`/homeindex/${record.id}`}>{record.projectName}</NavLink>
                },
                sorter: (a, b) => a.categoryName.length - b.categoryName.length,
                sortOrder: sortedInfo.columnKey === 'projectName' && sortedInfo.order,
                ellipsis: true,
            },
            {
                title: 'CategoryName',
                dataIndex: 'categoryName',
                key: 'categoryName',
                sorter: (a, b) => a.categoryName.length - b.categoryName.length,
                sortOrder: sortedInfo.columnKey === 'categoryName' && sortedInfo.order,
                ellipsis: true,
            },
            {
                title: 'Creator',
                key: 'creator',
                render: (text, record, index) => (
                    < Space >
                        <Tag color="red">{record.creator?.name}</Tag>
                    </Space >
                ),
                sortOrder: sortedInfo.columnKey === 'creator' && sortedInfo.order,
                ellipsis: true,
            },
            {
                title: 'Members',
                key: 'members',
                render: (text, record, index) => {
                    return (<Space style={{ display: 'flex', alignItems: 'center' }}>
                        <Popover placement='left' content={renderMembers(record.members, record.id)} title="Member Project" trigger="hover">
                            <Button type='link' style={{ paddingTop: 0 }}>
                                <Avatar.Group >{record.members?.slice(0, 3).map((member, index) => {
                                    return <Avatar key={index} src={member.avatar} />
                                })
                                }
                                    {record.members?.length >= 3 ? <Avatar key={index}>...</Avatar> : ''}
                                </Avatar.Group>
                            </Button>
                        </Popover>
                        <Popover
                            title="Add Member"
                            content={() => {
                                return <Space><AutoComplete
                                    style={{ width: 200 }}
                                    onSearch={(value) => {
                                        if (searchRef.current) {
                                            clearTimeout(searchRef.current)
                                        }
                                        searchRef.current = setTimeout(() => {
                                            dispatch({
                                                type: THEO_DOI_GET_USER_API,
                                                keyWord: value
                                            })
                                        }, 300)
                                    }}
                                    options={arrGetUser?.map((user, index) => {
                                        return { label: user.name, value: user.userId.toString() }
                                    })}
                                    value={value}
                                    onChange={(text) => {
                                        setValue(text)
                                    }}
                                    onSelect={(valueSelect, option) => {
                                        setValue(option.label)
                                        dispatch({
                                            type: THEO_DOI_ADD_MEMBER_API,
                                            projectInfo: {
                                                projectId: record.id,
                                                userId: valueSelect
                                            }
                                        })
                                        // reset value sau khi chọn
                                        setValue('')
                                    }}
                                    placeholder="Tên Thành Viên"
                                /></Space>
                            }}
                            trigger="click"
                        >
                            <Button type="primary" style={{
                                borderRadius: '50%', width: '30px', height: '30px', display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}><PlusOutlined /></Button>
                        </Popover>
                    </Space>)
                },
            },
            {
                title: 'Action',
                key: 'action',
                dataIndex: 'id',
                render: (text, record, index) => {
                    return <Space>
                        <Button
                            type='primary'
                            onClick={() => { showDrawer(record.id) }}
                        >
                            <EditOutlined />
                        </Button>
                        {/* Xóa Project  */}
                        <Popconfirm
                            placement="topRight"
                            title={alertText}
                            onConfirm={() => {
                                dispatch({
                                    type: THEO_DOI_DELETE_PROJECT_API,
                                    id: record.id
                                })
                                message.info('Xóa thành công');
                            }}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button type='primary' danger ><DeleteOutlined /></Button>
                        </Popconfirm>
                    </Space >
                },
            },
        ];
        return <Table
            pagination={{ defaultPageSize: 9 }}
            size='middle'
            style={{ height: '100%' }}
            columns={columns}
            dataSource={arrAllProject}
            onChange={handleChange}
        />
    }
    return <Space>
        {renderTable()}
    </Space>;
}
