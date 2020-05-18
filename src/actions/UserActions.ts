import { actionCreatorFactory } from 'typescript-fsa';

import User from '../states/User';
const actionCreator = actionCreatorFactory('USER_ACTION');

export const changeUserAction = actionCreator<Partial<User>>('CHANGE_USER');
