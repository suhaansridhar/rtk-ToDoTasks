import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    'completed' : [],
    'incomplete' : []
}

const taskSlice = createSlice({
    name: 'tasks',
    initialState, 
    reducers: {
        addTask(state, action){
            state['incomplete'].push(action.payload)
        },

        removeTask(state, action){
            state['incomplete'].filter(task => task.id !== action.payload)
        },

        compeletedTask(state, action){
            state['completed'].push(action.payload);
            state['incomplete'].filter(task => task.id !== action.payload.id);
        }
    }
})

export const {addTask, compeletedTask, removeTask} = taskSlice.actions;
export default taskSlice.reducer;