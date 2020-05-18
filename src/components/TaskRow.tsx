import moment from 'moment';
import React, { MouseEvent, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';

import { deleteTask, toggleTask } from '../actions/TaskActions';
import { Task } from '../states/Task';
import { styled } from './FoundationStyles';

const TaskCell = styled.div<{ expiration: boolean }>`
  align-items: center;
  background-color: ${(p): string => (p.expiration ? 'inherit' : p.theme.SECONDARY_2_0)};
  border: 1px solid rgb(200, 200, 200);
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  margin-bottom: 1em;
  padding: 10px;
  transition-duration: 0.2s;
  transition-property: all;

  &:hover {
    box-shadow: 5px 5px 5px rgba(200, 200, 200, 4);
    transform: translate(-5px, -5px);
  }
`;

const TaskCheckBox = styled.div`
  align-items: center;
  background-color: #fff;
  border: 2px solid #ccc;
  border-radius: 50%;
  display: flex;
  flex-grow: 0;
  flex-shrink: 0;
  height: 2em;
  justify-content: center;
  width: 2em;
`;

const TaskCheck = styled.p`
  color: ${(p): string => p.theme.SECONDARY_1_3};
  font-size: 150%;
`;

const TaskBody = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-shrink: 0;
  height: 3em;
  justify-content: space-around;
`;

const TaskRemove = styled.div`
  flex-grow: 0;
  flex-shrink: 0;
`;

const TaskName = styled.div`
  font-size: 120%;
`;

const DeadLine = styled.div``;

const TaskRow: React.FC<{ data: Task }> = (props: { data: Task }) => {
  const { data } = props;
  const dispatch = useDispatch();

  const expiration = useMemo(() => {
    return new Date() < data.deadline || data.complete;
  }, [data.complete, data.deadline]);

  const deadLineString = useMemo(() => {
    return moment(data.deadline).format('L LT');
  }, [data.deadline]);

  const onRowClick = useCallback(() => {
    toggleTask(data, dispatch);
  }, [data.id]);

  const onDeleteClick = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      deleteTask(data.id, dispatch);
      e.stopPropagation();
    },
    [data.id],
  );

  return (
    <TaskCell className="taskCell" expiration={expiration} onClick={onRowClick}>
      <TaskCheckBox>
        <TaskCheck>{data.complete ? '✔' : null}</TaskCheck>
      </TaskCheckBox>
      <TaskBody>
        <TaskName>{data.taskName}</TaskName>
        <DeadLine>⏰{deadLineString}</DeadLine>
      </TaskBody>
      <TaskRemove className="deleteButton" onClick={onDeleteClick}>
        ❌
      </TaskRemove>
    </TaskCell>
  );
};

export default TaskRow;
