import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {}

const permissionsSlice = createSlice({
  name: 'permissions',
  initialState,
  reducers: {
    updatePermissions: (state, action: PayloadAction<any>) => {
      return action.payload
    },
  },
})

export const { updatePermissions } = permissionsSlice.actions
export default permissionsSlice.reducer
