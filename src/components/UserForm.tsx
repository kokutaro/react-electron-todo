import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { changeUserAction } from '../actions/UserActions';
import { State } from '../states/State';
import User from '../states/User';
import CountButton from './CountButton';
import TextBox from './TextBox';

const UserForm: React.FC = () => {
  const { name, count } = useSelector<State, User>((state) => state.user);
  const dispatch = useDispatch();
  const onNameChange = useCallback((value: string) => {
    dispatch(changeUserAction({ name: value }));
  }, []);
  const onCountClick = useCallback(() => {
    dispatch(changeUserAction({ count: count + 1 }));
  }, [count]);
  return (
    <div>
      <p>
        <TextBox label="User Name" value={name} onChangeText={onNameChange} type="text" />
      </p>
      <p>
        <CountButton count={count} label="Visit" onClick={onCountClick} />
      </p>
    </div>
  );
};

export default UserForm;
