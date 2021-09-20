import React, { useCallback, useEffect, useState } from 'react';

let logoutTimer;

export const AuthContext = React.createContext({
	token: '',
	isLoggedIn: '',
	login: (token) => {},
	logout: () => {}
});

const calculateRemainingTime = (expireTime) => {
	const currentTime = new Date().getTime();
	const adjExpirationTime = new Date(expireTime).getTime();

	const remainingDuration = adjExpirationTime - currentTime;

	return remainingDuration;
};

const retrieveStoreToken = () => {
	const storedToken = localStorage.getItem('token');
	const storedExpirationDate = localStorage.getItem('expirationTime');

	const remainingTime = calculateRemainingTime(storedExpirationDate);

	if (remainingTime <= 3600) {
		localStorage.removeItem('token');
		localStorage.removeItem('expirationTime');
		return null;
	}

	return { token: storedToken, duration: remainingTime };
};

const AuthContexProvider = (props) => {
	const tokenData = retrieveStoreToken();
	let initialToken;

	if (tokenData) {
		initialToken = tokenData.token;
	}

	const [ token, setToken ] = useState(initialToken);

	const userIsLoggedIn = !!token;

	const logoutHandler = useCallback(() => {
		setToken(null);
		localStorage.removeItem('token');
		localStorage.removeItem('expirationTime');

		if (logoutTimer) {
			clearTimeout(logoutTimer);
		}
	}, []);

	const loginHandler = (token, expirationTime) => {
		setToken(token);
		localStorage.setItem('token', token);
		localStorage.setItem('expirationTime', expirationTime);

		const remainingTime = calculateRemainingTime(expirationTime);

		logoutTimer = setTimeout(logoutHandler, remainingTime);
	};

	useEffect(
		() => {
			if (tokenData) {
				console.log(tokenData.duration);
				logoutTimer = setTimeout(logoutHandler, tokenData.duration);
			}
		},
		[ tokenData, logoutHandler ]
	);
	const contextValue = {
		token: token,
		isLoggedIn: userIsLoggedIn,
		login: loginHandler,
		logout: logoutHandler
	};

	return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>;
};

export default AuthContexProvider;
