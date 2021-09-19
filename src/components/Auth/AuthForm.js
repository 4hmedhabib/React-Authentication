import { useState, useRef } from 'react';

import classes from './AuthForm.module.css';

const AuthForm = () => {
	const [ isLogin, setIsLogin ] = useState(true);
	const [ isLoading, setIsLoading ] = useState(false);

	const emailInput = useRef();
	const passwordInput = useRef();

	const switchAuthModeHandler = () => {
		setIsLogin((prevState) => !prevState);
	};

	console.log(isLoading);

	const submitFormHandler = (e) => {
		e.preventDefault();

		const enteredEmail = emailInput.current.value;
		const enteredPassword = passwordInput.current.value;
		setIsLoading(true);
		if (isLogin) {
			// ...
		} else {
			fetch(
				'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAfaSQRydBK-O2tes-rHAUoJAFx8Ra3mic',
				{
					method: 'POST',
					body: JSON.stringify({
						email: enteredEmail,
						password: enteredPassword,
						returnSecureToken: true
					}),
					headers: {
						'Content-Type': 'application/json'
					}
				}
			)
				.then((res) => {
					setIsLoading(false);
					console.log('running');
					if (res.ok) {
						// ...
					} else {
						res.json().then((data) => {
							let errMessage = 'Authentication failed!';
							if (data && data.error && data.error.message) {
								errMessage = data.error.message;
							}
							console.log(errMessage);
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
