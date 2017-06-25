import axios from 'axios';

export const login = (send) => {
	return (dispatch) => {
		dispatch({
			type: 'START_LOGIN'
		});

		axios.post('http://localhost:3000/login', send)
			.then((data) => {
				const loginSuccess = (data) => {
					return {
						type: 'LOGIN_SUCCESS',
						payload: data
					};
				};
				const loginNotSuccess = (data) => {
					return {
						type: 'LOGIN_NOT_SUCCESS',
						payload: data
					};
				};

				dispatch(data.data.success ? loginSuccess(data.data) : loginNotSuccess(data.data));
			})
			.catch((error) => {
				const errorLogin = (error) => {
					return {
						type: 'ERROR_LOGIN',
						error: error
					};
				};

				dispatch(errorLogin(error));
			});
	};
};

export const signup = (send) => {
	return (dispatch) => {
		const startSignup = () => {
			return {
				type: 'START_SIGNUP'
			};
		};

		dispatch(startSignup());

		axios.post('http://localhost:3000/signup', send)
			.then((data) => {
				const signupSuccess = (data) => {
					return {
						type: 'SIGNUP_SUCCESS',
						payload: data
					};
				};
				const signupNotSuccess = (data) => {
					return {
						type: 'SIGNUP_NOT_SUCCESS',
						payload: data
					};
				};

				dispatch(data.data.success ? signupSuccess(data.data) : signupNotSuccess(data.data));
			})
			.catch((error) => {
				const errorSignup = (error) => {
					return {
						type: 'ERROR_SIGNUP',
						error: error
					};
				};

				dispatch(errorSignup(error));
			});
	};
};

export const logout = () => {
	return (dispatch) => {
		const logout = () => {
			return {
				type: 'LOGOUT'
			};
		};

		dispatch(logout());
	};
};
