export const LoginState = { error: {}, register: false ,loading:false};


export const LoginReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case "register":
            return { error: "", register: true ,loading:false};
        case "login":
            return { error: "", register: false ,loading:false};
        case "loading":
                return { ...state , loading: true };    
        case "error":
            return { ...state, error: payload , loading:false };
            default:
                return state
    }

};