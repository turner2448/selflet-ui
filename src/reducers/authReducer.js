const initialState = { 
    authenticated: false,
    username: "",
    keycloak: null,
}; 

function authReducer(state = initialState, action) {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                authenticated: action.payload.authenticated,
                username: action.payload.username,
                keycloak: action.payload.keycloak,
            };
        default:
         return state
    }
}

export default authReducer;