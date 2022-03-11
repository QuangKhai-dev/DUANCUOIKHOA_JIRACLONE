import React, { useEffect, useState } from 'react'
import { Button, Drawer } from 'antd';
import { Input, AutoComplete } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { THEO_DOI_GET_PROJECTDETAIL_API } from '../../../Redux/types/UserTypes';
import { SearchOutlined } from '@ant-design/icons';

export default function DrawerSearch(props) {
    const dispatch = useDispatch();

    //Drawer SearchButton
    const [state, setState] = useState({ visible: false, placement: 'right' })
    const { id } = props;
    const { arrProjectDetail } = useSelector((state) => state.ProjectReducer);
    useEffect(() => {
        if (id) {
            dispatch({
                type: THEO_DOI_GET_PROJECTDETAIL_API,
                projectId: id,
            });
        }
    }, []);
    const showDrawer = () => {
        setState({
            visible: true,
        });
    };

    const onClose = () => {
        setState({
            visible: false,
        });
    };


    const { placement, visible } = state;

    return (
        <>
            <Button onClick={showDrawer} type='text' icon={<SearchOutlined style={{ color: 'white', fontSize: '20px' }} />}></Button>
            <Drawer
                title={<AutoComplete
                    style={{
                        width: '100%',
                    }}
                // options={options}
                >
                    <Input.Search bordered={false} size="large" placeholder="Search Task" enterButton />
                </AutoComplete>}
                placement={placement}
                closable={false}
                onClose={onClose}
                visible={visible}
                key={placement}
            >
            </Drawer>
        </>
    )
}
