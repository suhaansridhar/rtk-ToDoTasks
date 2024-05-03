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
            state['incomplete'] = state['incomplete'].filter(task => task.id !== action.payload)
        },

        completedTask(state, action){
            const completedTask = state['incomplete'].find(task => task.id === action.payload);
            if(completedTask){
                state['completed'].push(completedTask);
                state['incomplete'] = state['incomplete'].filter(task => task.id !== action.payload);
            }
        }
    }
})

export const {addTask, completedTask, removeTask} = taskSlice.actions;
export default taskSlice.reducer;