import React, { createContext, useContext, useEffect, useReducer } from 'react';

// Create Auth Context

const initialState = {
  user: localStorage.getItem('user') !== undefined ? JSON.parse(localStorage.getItem('user')) : null,
  role: localStorage.getItem('role') || null,
  token: localStorage.getItem('token') || null,
}
export const AuthContext = createContext(initialState);

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        user: null,
        role: null,
        token: null,
      }
    case 'LOGIN_SUCCESS':
      return {
        user: action.payload.user,
        role: action.payload.role,
        token: action.payload.token,
        
      }
    case 'LOGOUT':
      return {
        user: null,
        role: null,
        token: null,
        
      }
      case 'UPDATE_USER':
        return {
          role: action.payload.role,
          user: action.payload.user,
          token: action.payload.token,
        };
      default:
        return state;
  }
}



export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState); // User state

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(state.user))
    localStorage.setItem('token', state.token)
    localStorage.setItem('role', state.role)
  }, [state])
  const authContextValue = {
    user:state.user,
    role:state.role,
    token:state.token,
    dispatch
    
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};