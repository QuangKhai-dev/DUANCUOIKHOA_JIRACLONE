import React from 'react'
import { Button, Space, Typography } from 'antd';
import styles from './ProjectManagement.module.css'
import DrawerPjManagement from './Drawer/DrawerPjManagement';
import TableManagement from './Table/TableManagement'
const { Title } = Typography;

export default function ProjectManagement(props) {
    return (
        <>
            <Space direction='vertical' className={styles.tableProjectManagement}>
                <Space className='d-flex justify-content-between' >
                    <Title level={4} style={{ color: '#172B4D' }}>Project Management</Title>
                </Space>
                <Space style={{ marginBottom: 16 }}>
                    <Button type='primary' >Sort by ID</Button>
                    <Button >Clear filters</Button>
                    <Button type='primary' >Clear filters and sorters</Button>
                </Space>
                <TableManagement />
                <DrawerPjManagement ></DrawerPjManagement>
            </Space>
        </>
    );
}
