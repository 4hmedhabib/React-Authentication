import { useState, useRef, useContext } from 'react';
import { useHistory } from 'react-router';
import { AuthContext } from '../../store/auth-contex';

import classes from './AuthForm.module.css';

const AuthForm = () => {
	const [ isLogin, setIsLogin ] = useState(true);
	const [ isLoading, setIsLoading ] = useState(false);

	const history = useHistory();
	const AuthCtx = useContext(AuthContext);

	const emailInput = useRef();
	const passwordInput = useRef();

	const switchAuthModeHandler = () => {
		setIsLogin((prevState) => !prevState);
	};

	const submitFormHandler = (e) => {
		e.preventDefault();

		const enteredEmail = emailInput.current.value;
		const enteredPassword = passwordInput.current.value;

		setIsLoading(true);
		let url;
		if (isLogin) {
			url =
				'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAfaSQRydBK-O2tes-rHAUoJAFx8Ra3mic';

			fetch(url, {
				method: 'POST',
				body: JSON.stringify({
					email: enteredEmail,
					password: enteredPassword,
					returnSecureToken: true
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			})
				.then((res) => {
					setIsLoading(false);
					if (res.ok) {
						history.push('/');
						return res.json();
					} else {
						return res.json().then((data) => {
							let errMessage = 'Authentication failed!';
							// if (data && data.error && data.error.message) {
							// 	errMessage = data.error.message;
							// }
							alert(errMessage);
							console.log(errMessage);
						});
					}
				})
				.then((data) => {
					const expirationTime = new Date(new Date().getTime() + data.expiresIn * 1000);
					console.log('Here is Time :', expirationTime.toISOString());
					AuthCtx.login(data.idToken, expirationTime.toISOString());
					// console.log(data);
				})
				.catch((err) => {
					console.log(err);
				});
			// ...
		} else {
			url =
				'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAfaSQRydBK-O2tes-rHAUoJAFx8Ra3mic';
			fetch(url, {
				method: 'POST',
				body: JSON.stringify({
					email: enteredEmail,
					password: enteredPassword,
					returnSecureToken: true
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			})
				.then((res) => {
					setIsLoading(false);
					if (res.ok) {
						// history.push('')
					} else {
						return res.json().then((data) => {
							let errMessage = 'Authentication failed!';
							if (data && data.error && data.error.message) {
								errMessage = data.error.message;
							}
							alert(errMessage);
						});
					}
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	return (
		<section className={classes.auth}>
			<h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
			<form onSubmit={submitFormHandler}>
				<div className={classes.control}>
					<label htmlFor="email">Your Email</label>
					<input type="email" id="email" required ref={emailInput} />
				</div>
				<div className={classes.control}>
					<label htmlFor="password">Your Password</label>
					<input type="password" id="password" required ref={passwordInput} />
				</div>
				<div className={classes.actions}>
					<button
						type="submit"
						disabled={isLoading}
						className="d-flex justify-content-around align-items-center"
					>
						{isLogin ? 'Login' : 'Create Account'}
						{isLoading ? (
							<div className="spinner-border spinner-border-sm m-1" role="status">
								<span className="sr-only">Loading...</span>
							</div>
						) : (
							''
						)}
					</button>

					<button type="button" className={classes.toggle} onClick={switchAuthModeHandler}>
						{isLogin ? 'Create new account' : 'Login with existing account'}
					</button>
				</div>
			</form>
		</section>
	);
};

export default AuthForm;
