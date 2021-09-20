import React, { useState } from 'react';

export const AuthContext = React.createContext({
	token: '',
	isLoggedIn: '',
	login: () => {},
	logout: () => {}
});

const AuthContexProvider = (props) => {
	const [ token, setToken ] = useState(null);

	const userIsLoggedIn = !!token;

	const loginHandler = (token) => {
		setToken(token);
	};

	const LogoutHandler = () => {
		setToken(null);
	};

	const ContextValue = {
		token: token,
		isLoggedIn: userIsLoggedIn,
		login: loginHandler,
		lougout: LogoutHandler
	};

	return <AuthContext.Provider value={ContextValue}>{props.children}</AuthContext.Provider>;
};

export default AuthContexProvider;
