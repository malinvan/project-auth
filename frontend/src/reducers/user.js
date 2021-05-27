import { batch } from "react-redux";
import { createSlice } from '@reduxjs/toolkit'
import { API_URL } from "reusable/urls";

export const user = createSlice({
  name: 'user',
  initialState: {
    email: null,
    accesstoken: null,
    errors: null
  },
  reducers: {
    setEmail: (store, action) => {
      store.email = action.payload;
    },
    setAccesstoken: (store, action) => {
      store.accesstoken = action.payload;
    },
    setErrors: (store, action) => {
      store.errors = action.payload;
    },
  },
});

export const signIn = (email, password) => {
  return (dispatch) => {
    fetch(API_URL('signin'), {
      method: "POST",
      headers: { "Content-Type": "application/JSON" },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          console.log(data);
          batch(() => {
            dispatch(user.actions.setEmail(data.email));
            dispatch(user.actions.setAccesstoken(data.accessToken));
            dispatch(user.actions.setErrors(null));
          });
        } else {
          dispatch(user.actions.setErrors(data));
        }
      })
      .catch();
  };
};

export const signUp = (email, password) => {
  return (dispatch) => {
    fetch(API_URL('signup'), {
      method: "POST",
      headers: { "Content-Type": "application/JSON" },
      body: JSON.stringify({ email, password }),
    })
      .then( async (res) => {
        const body = await res.json();
        if (!res.ok) {
          if (body.errorCode === 'email-exists') {
            dispatch(user.actions.setErrors('The email already exists'));
          } else {
            dispatch(user.actions.setErrors('Something went wrong'));
          }
          
          return;
        }

        return body;
      })
      .then((data) => {
        if (data) {
          console.log(data);
          batch(() => {
            dispatch(user.actions.setEmail(data.email));
            dispatch(user.actions.setAccesstoken(data.accessToken));
            dispatch(user.actions.setErrors(null));
          });
        } else {
          dispatch(user.actions.setErrors(data));
        }
      })
      .catch((e) => {
        console.log('patata');
        console.log(e);
      });
  };
};
