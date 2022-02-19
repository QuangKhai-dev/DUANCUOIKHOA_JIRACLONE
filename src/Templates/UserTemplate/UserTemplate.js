import React from 'react'
import { Route } from 'react-router-dom';
import { Layout } from 'antd';
import styles from './UserTemplate.module.css'

const { Content } = Layout;


export const UserTemplate = (props) => {
    const { Component, ...restRoute } = props;

    return <Route {...restRoute} render={(propsRoute) => {
        return <div>
            <Layout>
                <Content className={styles.layoutUser}>
                    <Component  {...propsRoute} />
                </Content>
            </Layout>
        </div>
    }} />
}