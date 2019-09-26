import { User } from 'src/app/models/user';
import { All, AuthActionTypes } from '../actions/auth.action';

export interface State {
    isAuthenticated: boolean;
    user: User | null;
    errorMessage: string | null;
}

export const initialState: State = {
    isAuthenticated: false,
    user: null,
    errorMessage: null
}

export function reducer(state = initialState, action: All): State {
    switch (action.type) {
        case AuthActionTypes.LOGIN_SUCCESS:
            {
                return {
                    ...state,
                    isAuthenticated: true,
                    user:
                    {
                        id: null,
                        token: action.payload.token,
                        email: action.payload.email,
                        password: null
                    },
                    errorMessage: null
                };
            }
        case AuthActionTypes.LOGIN_FAILURE:
            {
                return {
                    ...state,
                    errorMessage: 'Incorrect email and/or password.'
                };
            }

        case AuthActionTypes.SIGNUP_SUCCESS:
            {
                return {
                    ...state,
                    isAuthenticated: true,
                    user:
                    {
                        token: action.payload.token,
                        email: action.payload.email,
                        id: null, password: null
                    },
                    errorMessage: null
                };
            }

        case AuthActionTypes.SIGNUP_FAILURE: {
            return {
                ...state,
                errorMessage: 'That email is already in use.'
            };
        }

        case AuthActionTypes.LOGOUT: {
            return initialState;
        }

        default:
            {
                return state;
            }
    }

}