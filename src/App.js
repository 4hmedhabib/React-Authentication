import { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import { AuthContext } from './store/auth-contex';

function App() {
	const authCtx = useContext(AuthContext);

	return (
		<Layout>
			<Switch>
				<Route path="/" exact>
					<HomePage />
				</Route>
				<Route path="/auth">
					{!authCtx.isLoggedIn && <AuthPage />}
					{authCtx.isLoggedIn && <Redirect to="/" />}
				</Route>
				<Route path="/profile">
					{!authCtx.isLoggedIn && <Redirect to="/auth" />}
					{authCtx.isLoggedIn && <UserProfile />}
				</Route>
				<Route path="*">
					<h1>Page Not Found! 404 </h1>
				</Route>
			</Switch>
		</Layout>
	);
}

export default App;
