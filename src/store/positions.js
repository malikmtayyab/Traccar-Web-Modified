/* eslint-disable */
import { createSlice } from '@reduxjs/toolkit';

const { reducer, actions } = createSlice({
    name: 'positions',
    initialState: {
        countIgnitionTrueMotionFalse: 0,
        countIgnitionFalseMotionFalse: 0,
        countIgnitionTrueMotionTrue: 0
    },
    reducers: {
        update_countIgnitionTrueMotionFalse(state, action) {
            state.countIgnitionTrueMotionFalse = action.payload
        },
        update_countIgnitionFalseMotionFalse(state, action) {
            state.countIgnitionFalseMotionFalse = action.payload
        },
        update_countIgnitionTrueMotionTrue(state, action) {
            state.countIgnitionTrueMotionTrue = action.payload
        },
    },
});
/* eslint-enable */
export { actions as positionActions };
export { reducer as positionReducer };
