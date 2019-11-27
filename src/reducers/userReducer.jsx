const initialState = { 
    username: "",
    firstname: "",
    lastName: "",
    attributes: {
        agency: true,
        landlord: false,
        tenant: false
    }

}; 

function userReducer(state = initialState, action) {
    switch (action.type) {
        case 'CREATE_USER':
            return {
                ...state,
                username: action.payload.username,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                agency: action.payload.attributes.agency
            };
        default:
         return state
    }
}

export default userReducer;