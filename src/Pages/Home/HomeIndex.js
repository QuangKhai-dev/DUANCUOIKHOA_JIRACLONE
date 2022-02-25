import { Button, Space, Typography, Avatar, } from 'antd'
import Search from 'antd/lib/input/Search'
import React, { useEffect } from 'react'
import BoardJira from '../../Components/JiraBoard/JiraBoard'
import styles from './HomeIndex.module.css'
import { useSelector } from 'react-redux'

const { Title } = Typography;

export default function HomeIndex(props) {

    const { userLogin } = useSelector(state => state.UserReducer)
    const { arrProjectDetail } = useSelector(state => state.ProjectReducer)
    useEffect(() => {
        props.setProjectId(props.match.params.id)
    }, [props.match.params.id]);

    return (
        <>
            <Space direction="vertical" className={styles.tableUser}>
                <Title level={4} style={{ color: '#172B4D' }}>Kanban board</Title>
                <Space className='d-flex align-items-center' >
                    <Search placeholder="Input search text" style={{ width: 150 }} />
                    <Space className='ml-2'>
                        <Button type="primary" className={styles.buttonSearch} type="text">Only My Issues</Button>
                        <Button type="primary" className={styles.buttonSearch} >Ignore Resolved</Button>
                    </Space>
                </Space>
                <Space style={{ marginTop: '10px' }}>
                    <Avatar.Group>
                        {arrProjectDetail.members?.map((member, index) => {
                            return <Avatar key={index} style={{ backgroundColor: '#f56a00' }}>{member.name.charAt().toUpperCase()}</Avatar>
                        })}
                    </Avatar.Group>
                </Space>
                <BoardJira id={props.match.params.id} />
            </Space>
        </>
    )
}
