import React, { useState } from 'react';
import FacebookLogin from 'react-facebook-login';
import styles from './LoginFb.module.css'
import { FacebookFilled } from '@ant-design/icons';
import { Space } from 'antd';

export default function LoginFb() {
    const [state, setState] = useState({ isLoggedIn: false, userId: '', name: '', email: '', picture: '' });

    const responseFacebook = (response) => {
        // console.log(response);
    }
    const componentClicked = () => {
        // console.log('click');
    }
    let fbContent = null
    fbContent = <FacebookLogin
        appId="928617441131493"
        autoLoad={false}
        textButton={<div>Tiếp tục với Facebook</div>}
        cssClass={styles.facebookBtn}
        fields="name,email,picture"
        // onClick={componentClicked}
        callback={responseFacebook}
    />

    return (
        <>
            {fbContent}
        </>
    );
}
