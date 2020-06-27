const initialState = { newBox: 'TESTE', box: {} };

export default (state = initialState, action) => {
    switch (action.type) {
        case 'NEW_BOX':
            return { ...state, newBox: action.payload }
        case 'CURRENT_BOX':
                return { ...state, box: action.payload }
        default:
            return state
    }
}