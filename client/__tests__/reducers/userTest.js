import expect from 'expect';
import user from './../../reducers/user';
import { Auth, Profile } from './../../actions/types';

describe('user reducer', () => {
  const userState = {
    isAuthenticated: true,
    userId: '5a0da6a4fe904f0e5fcfcde5',
    firstName: 'johnson',
    lastName: 'chinonso',
    email: 'johnson@gmail.net',
    avatar: 'user.png',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1YTBkYTZhNGZlOTA0ZjBlNWZjZmNkZTUiLCJlbWFpbCI6ImpvaG5zb25AZ21haWwubmV0IiwiaWF0IjoxNTEwODQ0MDY5LCJleHAiOjE1MTA5MzA0Njl9.nQsLizr6XxycFBrrL1PF3ggqVSGHj1-YxiwxtoZjw4k',
  };

  it('should return the initial state', () => {
    expect(user(undefined, {})).toEqual({
      isAuthenticated: false,
      userId: '',
      firstName: '',
      lastName: '',
      email: '',
      avatar: '',
      token: '',
      error: '',
    });
  });

  it('should handle SET_USER_SUCCESS', () => {
    const payload = {
      user: {
        userId: '5a0da6a4fe904f0e5fcfcde5',
        firstName: 'johnson',
        lastName: 'chinonso',
        email: 'johnson@gmail.net',
        avatar: 'user.png',
      },
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1YTBkYTZhNGZlOTA0ZjBlNWZjZmNkZTUiLCJlbWFpbCI6ImpvaG5zb25AZ21haWwubmV0IiwiaWF0IjoxNTEwODQ0MDY5LCJleHAiOjE1MTA5MzA0Njl9.nQsLizr6XxycFBrrL1PF3ggqVSGHj1-YxiwxtoZjw4k'
    };

    expect(user({}, {
      type: Auth.SET_USER_SUCCESS,
      user: payload
    })).toEqual(userState);
  });

  it('should should handle UPLOAD_FILE_SUCCESS', () => {
    const avatar = 'newImage.jpg';

    const payload = {
      user: {
        avatar
      }
    };

    expect(user(userState, {
      type: Profile.UPLOAD_FILE_SUCCESS,
      user: payload
    })).toEqual({
      ...userState,
      avatar
    });
  });

  it('should handle EDIT_PROFILE_SUCCESS', () => {
    expect(user(userState, {
      type: Profile.EDIT_PROFILE_SUCCESS,
      user: {
        user: {
          firstName: 'laisi',
          lastName: 'elenu',
        }
      }
    })).toEqual({
      ...userState,
      firstName: 'laisi',
      lastName: 'elenu'
    });
  });
});
