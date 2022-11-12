import { createSlice } from '@reduxjs/toolkit';
import { FormState } from 'context/constants';

const formReducer = createSlice({
  name: 'formSlice',
  initialState: {
    formFields: {
      storedName: '',
      nickName: '',
      birthday: '',
      avatar: null,
      storedGender: 'default',
      hobby: new Set(''),
      confirm: false,
    } as FormState,
    firstFormChange: false,
  },

  reducers: {
    changeFormField(state, action) {
      state.formFields = action.payload;
    },

    changeFirstFormChange(state, action) {
      state.firstFormChange = action.payload;
    },
  },
});

export const { changeFormField, changeFirstFormChange } = formReducer.actions;
export default formReducer.reducer;
