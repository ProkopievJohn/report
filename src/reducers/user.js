export const user = (state = { user: null }, action) => {
	switch (action.type) {
		case 'LOGIN_SUCCESS':
			return { ...state, user: action.payload };
		case 'LOGIN_NOT_SUCCESS':
			return { ...state, user: action.payload };
		case 'LOGOUT':
			return { ...state, user: null };
		default:
			return state;
	}
};
