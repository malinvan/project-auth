import { batch, createSlice } from "react-redux";
import { useDispatch } from "react-redux";
import { API_URL } from "reusable/urls";

export const user = () => ({
  name: "user",
  inititialState: {
    username: null,
    accesstoken: null,
    errors: null,
  },
  reducers: {
    setUserName: (store, action) => {
      store.username = action.payload;
    },
    setAccesstoken: (store, action) => {
      store.accesstoken = action.payload;
    },
    setErrors: (store, action) => {
      store.errors = action.payload;
    },
  },
});

// export const fetchUser = () => {
//   return (dispatch) => {
//     fetch(API_URL(mode, options), {
//       method: "POST",
//       headers: { "Content-Type": "application/JSON" },
//       body: JSON.stringify({ username, password }),
//     })
//       .then((res) => res.json)
//       .then((data) => {
//         if (data.success) {
//           batch(() => {
//             dispatch(user.actions.setUsername(data.username));
//             dispatch(user.actions.setAccesstoken(data.accesstoken));
//             dispatch(user.actions.setErrors(null));
//           });
//         } else {
//           dispatch(user.actions.setErrors(data));
//         }
//       })
//       .catch();
//   };
// };
