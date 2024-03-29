const initialState = { 
    users: [],
}; 

function userReducer(state = initialState, action) {
    switch (action.type) {
        case 'LIST_USERS':
            return {
                ...state,
                users: action.payload.users
            };
        default:
         return state
    }
}

export default userReducer;