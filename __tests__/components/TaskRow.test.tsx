/**
 * @jest-environment jsdom
 */

/* eslint-disable @typescript-eslint/explicit-function-return-type */

import 'jest-styled-components';
import 'ts-jest';

import enzyme, { mount } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import React from 'react';

import { deleteTask, toggleTask } from '../../src/actions/TaskActions';
import TaskRow from '../../src/components/TaskRow';
import { Task } from '../../src/states/Task';

beforeAll(() => {
  enzyme.configure({
    adapter: new EnzymeAdapter(),
    disableLifecycleMethods: true,
  });
});

const dispatch = jest.fn();

jest.mock('react-redux', () => ({
  useDispatch: () => dispatch,
}));

jest.mock('../../src/actions/TaskActions');

describe('TaskRow', () => {
  const task1: Task = {
    complete: true,
    deadline: new Date('2020-05-01T21:24:00.000Z'),
    id: 'task001',
    taskName: 'task 001',
  };

  const task2: Task = {
    complete: false,
    deadline: new Date('2020-05-01T21:24:00.000Z'),
    id: 'task002',
    taskName: 'task 002',
  };

  test('complete', () => {
    const wrapper = mount(<TaskRow data={task1} />);
    expect(wrapper).toMatchSnapshot();
  });

  test('incomplete over due', () => {
    const wrapper = mount(<TaskRow data={task2} />);
    expect(wrapper).toMatchSnapshot();
  });

  test('click delete', () => {
    const wrapper = mount(<TaskRow data={task1} />);
    const deleteButton = wrapper.find('div.deleteButton');
    deleteButton.simulate('click');
    expect(deleteTask).toBeCalledWith('task001', dispatch);
  });

  test('click complete', () => {
    const wrapper = mount(<TaskRow data={task1} />);
    const deleteButton = wrapper.find('div.taskCell');
    deleteButton.simulate('click');
    expect(toggleTask).toBeCalledWith(task1, dispatch);
  });
});
