import { batch } from "react-redux";
import { createSlice } from '@reduxjs/toolkit'
import { API_URL } from "reusable/urls";

export const user = createSlice({
  name: "user",
  inititialState: {
    email: null,
    accesstoken: null,
    errors: null,
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
      .then((res) => res.json)
      .then((data) => {
        if (data.success) {
          batch(() => {
            dispatch(user.actions.setEmail(data.email));
            dispatch(user.actions.setAccesstoken(data.accesstoken));
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
      .then((res) => res.json)
      .then((data) => {
        if (data.success) {
          batch(() => {
            dispatch(user.actions.setEmail(data.username));
            dispatch(user.actions.setAccesstoken(data.accesstoken));
            dispatch(user.actions.setErrors(null));
          });
        } else {
          dispatch(user.actions.setErrors(data));
        }
      })
      .catch();
  };
};
