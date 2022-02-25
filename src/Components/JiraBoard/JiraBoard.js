import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { THEO_DOI_GET_PROJECTDETAIL_API, THEO_DOI_UPDATE_STATUS_API } from "../../Redux/types/UserTypes";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Avatar, Modal, Space } from 'antd';
import styled from "styled-components";
import BUG from './ImgIcon/BUG.png'
import NEWTASK from './ImgIcon/NEW_TASK.png'
import HIGH from './ImgIcon/HIGH.png'
import MEDIUM from './ImgIcon/MEDIUM.png'
import LOW from './ImgIcon/LOW.png'
import LOWEST from './ImgIcon/LOWEST.png'
import ModalJiraBoard from "./ModalJiraBoard/ModalJiraBoard";


const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 25%;
  min-height: 600px;
  background-color: rgb(244, 245, 247);
  display: flex;
  flex-direction: column;
`;
const TaskContainer = styled.div`
    margin-left: 5px;
    margin-right: 5px;
  border-radius: 2px;
  padding: 10px;
  margin-bottom: 5px;
  transition: background 0.1s ease 0s;
  cursor: pointer;
  border: 0 solid #e2e8f0;
  box-shadow: rgb(9 30 66 / 25%) 0px 1px 2px 0px;
  background-color: ${props => (props.isDragging ? 'lightgreen' : 'rgb(255, 255, 255)')};
`;
const TitleColumn = styled.h3`
  padding: 8px;
  padding: 13px 10px 17px;
  text-transform: uppercase;
  color: rgb(94, 108, 132);
  font-size: 12.5px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
const TaskList = styled.div`
  padding: 5px;
  transition: background-color 0.2s ease;
  flex-grow: 1;
  min-height: 100px;
`;
const TaskTitle = styled.div`
padding-bottom: 11px;
  font-size: 14px;
  color: rgb(23, 43, 77);
`;
export default function BoardJira(props) {
    // Của modal
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };


    const { id } = props;
    const dispatch = useDispatch();
    const { arrAllStatus } = useSelector((state) => state.StatusReducer);
    const { arrProjectDetail } = useSelector((state) => state.ProjectReducer);

    useEffect(() => {
        dispatch({
            type: THEO_DOI_GET_PROJECTDETAIL_API,
            projectId: id,
        });
    }, []);
    const onDragEnd = result => {
        const { destination, source, draggableId } = result;
        // console.log('destination', destination, 'source', source, 'draggableId', draggableId);
        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }
        dispatch({
            type: THEO_DOI_UPDATE_STATUS_API,
            projectId: Number(id),
            updateTask: {
                taskId: Number(draggableId),
                statusId: destination.droppableId
            }
        })
    };
    let iconTaskType = null
    let iconPriority = null
    const renderTaskType = (taskTypeId) => {
        switch (taskTypeId) {
            case 1: {
                iconTaskType = BUG
                break;
            }
            case 2: {
                iconTaskType = NEWTASK
                break;
            }
        }
        return <img style={{ width: '15px', height: '15px', borderRadius: '4px' }} src={iconTaskType} alt="" />
    }
    const renderPriority = (priorityId) => {
        switch (priorityId) {
            case 1: {
                iconPriority = HIGH
                break;
            }
            case 2: {
                iconPriority = MEDIUM
                break;
            }
            case 3: {
                iconPriority = LOW
                break;
            }
            case 4: {
                iconPriority = LOWEST
                break;
            }
        }
        return <img style={{ width: '20px', height: '20px', borderRadius: '4px' }} src={iconPriority} alt="" />
    }
    const renderColumns = () => {
        return <DragDropContext onDragEnd={onDragEnd}>
            {arrProjectDetail.lstTask?.map((column, index) => {
                return (
                    <Container key={index} id={column.statusId}>
                        <TitleColumn>{column.statusName}</TitleColumn>
                        <Droppable
                            droppableId={column.statusId}
                        >
                            {(provided, snapshot) => (
                                <TaskList
                                    ref={provided.innerRef}
                                    innerRef={provided.innerRef}
                                    {...provided.droppableProps}
                                    isDraggingOver={snapshot.isDraggingOver}
                                >
                                    {column.lstTaskDeTail?.map((task, index) => {
                                        return <Draggable
                                            index={task.taskId}
                                            draggableId={task.taskId.toString()}
                                            key={index}
                                        >
                                            {(provided, snapshot) => (
                                                <TaskContainer
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    ref={provided.innerRef}
                                                    innerRef={provided.innerRef}
                                                    isDragging={snapshot.isDragging}
                                                >
                                                    <TaskTitle onClick={showModal}>
                                                        <div style={{ marginBottom: '20px' }}>{task.taskName}</div>
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                                <Avatar.Group>
                                                                    {task.assigness?.map((member, index) => {
                                                                        return <Avatar style={{ width: '25px', height: '25px' }} key={index} src={member.avatar} />
                                                                    })}
                                                                </Avatar.Group>
                                                                <span style={{ marginLeft: '10px' }}>TASKID: {task.taskId}</span>
                                                            </div>
                                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                                <div style={{ marginRight: '10px' }}>
                                                                    {renderTaskType(task.taskTypeDetail.id)}
                                                                </div>
                                                                <div>
                                                                    {renderPriority(task.priorityTask.priorityId)}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </TaskTitle>
                                                    <Modal
                                                        visible={isModalVisible}
                                                        width={1000}
                                                        footer={null}
                                                        closable={false}
                                                    >
                                                        <ModalJiraBoard handleCancel={handleCancel} renderTaskType={renderTaskType} task={task} projectId={id} />
                                                    </Modal>
                                                </TaskContainer>
                                            )}
                                        </Draggable>
                                    })}
                                    {provided.placeholder}
                                </TaskList>
                            )}
                        </Droppable>
                    </Container>
                );
            })}
        </DragDropContext >
    };
    return <div style={{ width: '100%' }} className="d-flex">{renderColumns()}</div>;
}
