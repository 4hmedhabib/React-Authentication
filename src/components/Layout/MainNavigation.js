import { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../../store/auth-contex';

import classes from './MainNavigation.module.css';

const MainNavigation = () => {
	const AuthCtx = useContext(AuthContext);
	const history = useHistory();

	const isLoggedIn = AuthCtx.isLoggedIn;

	const lougoutHandler = () => {
		AuthCtx.logout();
		history.push('/auth');
	};

	return (
		<header className={classes.header}>
			<Link to="/">
				<div className={classes.logo}>React Auth</div>
			</Link>
			<nav>
				<ul>
					{!isLoggedIn && (
						<li>
							<Link to="/auth">Login</Link>
						</li>
					)}
					{isLoggedIn && (
						<li>
							<Link to="/profile">Profile</Link>
						</li>
					)}
					{isLoggedIn && (
						<li>
							<button onClick={lougoutHandler}>Logout</button>
						</li>
					)}
				</ul>
			</nav>
		</header>
	);
};

export default MainNavigation;
