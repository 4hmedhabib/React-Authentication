import { useContext, useRef } from 'react';
import { useHistory } from 'react-router';
import { AuthContext } from '../../store/auth-contex';
import classes from './ProfileForm.module.css';

const ProfileForm = () => {
	const passwordInput = useRef();

	const history = useHistory();

	const AuthCtx = useContext(AuthContext);

	console.log(AuthCtx.token);

	const formSubmitHandler = (e) => {
		const enteredNewPassword = passwordInput.current.value;

		e.preventDefault();

		fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAfaSQRydBK-O2tes-rHAUoJAFx8Ra3mic', {
			method: 'POST',
			body: JSON.stringify({
				idToken: AuthCtx.token,
				password: enteredNewPassword,
				returnSecureToken: false
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then((res) => {
			console.log('Done!');
			history.push('/');
		});
	};

	return (
		<form className={classes.form} onSubmit={formSubmitHandler}>
			<div className={classes.control}>
				<label htmlFor="new-password">New Password</label>
				<input type="password" id="new-password" minLength="7" ref={passwordInput} />
			</div>
			<div className={classes.action}>
				<button>Change Password</button>
			</div>
		</form>
	);
};

export default ProfileForm;
