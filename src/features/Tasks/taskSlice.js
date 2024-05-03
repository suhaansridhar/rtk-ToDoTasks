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
        },

        removeTaskFromCompleted(state, action){
            state['completed'] = state['completed'].filter(task => task.id !== action.payload);
        },

        incompleteTask(state, action){
            const incompleteTask = state['completed'].find(task => task.id === action.payload);
            if(incompleteTask){
                state['incomplete'].push(incompleteTask);
                state['completed'] = state['completed'].filter(task => task.id !== action.payload)
            }
        }
    }
})

export const {addTask, completedTask, removeTask, incompleteTask, removeTaskFromCompleted} = taskSlice.actions;
export default taskSlice.reducer;