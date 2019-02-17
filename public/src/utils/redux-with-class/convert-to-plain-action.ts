import {isPlainObject} from './utils'
import {ActionWrapper} from './actionwrapper';

export const convertToPlainAction = (store : any) => (next : any) => (action : any) => {
  if (isPlainObject(action)) {
      return next(action);
  } else {
      if (!action.type) {
          return next(action);
      } else {
          var wrapper: ActionWrapper = {
              type: action.type,
              action: action,
          };

          return next(wrapper);
      }
  }
};