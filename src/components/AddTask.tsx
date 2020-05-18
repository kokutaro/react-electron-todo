import 'react-datepicker/dist/react-datepicker.css';

import moment from 'moment';
import React, { ChangeEvent, useCallback, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import { useDispatch } from 'react-redux';

import { addTask } from '../actions/TaskActions';
import { styled } from './FoundationStyles';

//#region Styled Component
const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  margin: 1em 0;
  width: 100%;
`;

const TextBox = styled.input`
  box-sizing: border-box;
  width: 100%;
`;

const TaskNameBox = styled.p`
  flex-grow: 1;
`;

const DeadLineBox = styled.div``;

const AddButton = styled.button`
  background-color: ${(p): string => p.theme.SECONDARY_1_3};
  border-radius: 50%;
  color: white;
  display: block;
  font-size: 150%;
  height: 40px;
  padding: 0;
  width: 40px;
`;

// #endregion

const AddTask: React.FC = () => {
  const dispatch = useDispatch();

  const [deadline, setDeadline] = useState<Date>(moment().add(1, 'd').toDate());
  const [taskName, setTaskName] = useState<string>('');

  const onChangeDeadline = useCallback((date: Date) => {
    setDeadline(date);
  }, []);

  const onChangeTaskName = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setTaskName(e.currentTarget.value);
  }, []);

  const onClickAddButton = useCallback(() => {
    addTask(
      {
        complete: false,
        deadline,
        taskName,
        id: '',
      },
      dispatch,
    );
  }, [deadline, taskName]);

  return (
    <Container>
      <TaskNameBox>
        <label>
          Task Name
          <TextBox type="text" value={taskName} onChange={onChangeTaskName} />
        </label>
      </TaskNameBox>
      <DeadLineBox>
        <label>
          Dead Line
          <ReactDatePicker
            selected={deadline}
            showTimeSelect={true}
            dateFormat="yyyy-MM-dd HH:mm"
            onChange={onChangeDeadline}
          />
        </label>
      </DeadLineBox>
      <AddButton onClick={onClickAddButton}>➕</AddButton>
    </Container>
  );
};

export default AddTask;
