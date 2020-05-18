import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getTaskList } from '../actions/TaskActions';
import { State } from '../states/State';
import { Task, TaskList } from '../states/Task';
import AddTask from './AddTask';
import { styled } from './FoundationStyles';
import TaskRow from './TaskRow';

const MainContainer = styled.div`
  margin: 10px auto 0 auto;
  max-width: 600px;
  min-width: 300px;
  width: 80%;
`;

const Header = styled.h1`
  background-color: ${(p): string => p.theme.PRIMARY_3};
  color: ${(p): string => p.theme.FOREGROUND_REVERSE};
  font-size: 160%;
  padding: 1em;
  text-align: center;
`;

const TaskListComponent = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1em;
`;

const createTaskList = (tasks: Task[]): JSX.Element[] => {
  return tasks
    .sort((a, b) => {
      return a.deadline < b.deadline ? -1 : a.deadline.getTime() === b.deadline.getTime() ? 0 : 1;
    })
    .map((it) => {
      return <TaskRow key={it.id} data={it} />;
    });
};

const TaskListContainer: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    getTaskList(dispatch);
  }, []);

  const taskList = useSelector<State, TaskList>((state) => state.taskList);
  const taskListElement = useMemo(() => {
    return createTaskList(taskList.tasks);
  }, [taskList.tasks]);
  return (
    <div>
      <Header>TODO</Header>
      <MainContainer>
        <AddTask />
        <TaskListComponent>{taskListElement}</TaskListComponent>
      </MainContainer>
    </div>
  );
};

export default TaskListContainer;
