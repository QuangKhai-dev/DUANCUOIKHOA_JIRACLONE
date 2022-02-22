import React from 'react'
import { Form, Input, Select, Button, Typography, Space } from 'antd';
import styles from './ProjectSetting.module.css'
const { Option } = Select;
const { Title } = Typography;

export default function ProjectSettingTable(props) {
    return (
        <>
            <Space direction='vertical' className={styles.tableIndex}>
                <Title level={4} style={{ color: '#172B4D', marginBottom: '20px' }}>Project Setting</Title>
                <Form layout="vertical">
                    <Form.Item label="Name">
                        <Input className={styles.formItem} style={{ width: '40%' }} placeholder="Project Name" />
                    </Form.Item>
                    <Form.Item label="Name">
                        <Input className={styles.formItem} style={{ width: '40%' }} placeholder="Project URL" />
                    </Form.Item>
                    <Form.Item initialValue="Bussiness" name="" label="Category">
                        <Select className={styles.formItem} style={{ width: '40%' }}>
                            <Option value="male">Bussiness</Option>
                            <Option value="female">Marketing</Option>
                            <Option value="other">Software</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item style={{ width: '40%' }} name={['user', 'introduction']} label="Introduction">
                        <Input.TextArea className={styles.formItem} />
                    </Form.Item>
                    <Form.Item >
                        <Button type='primary'>
                            Save
                        </Button>
                        <Button className='ml-3' type='primary' danger>
                            Cancel
                        </Button>
                    </Form.Item>
                </Form>
            </Space>
        </>
    )
}
