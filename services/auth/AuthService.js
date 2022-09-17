import axios from 'axios';

class AuthService {
	constructor() { }

	async getAccessToken(authCode) {
		return new Promise(async (resolve, reject) => {
			try {
				const auth = await axios.post('https://github.com/login/oauth/access_token', {
					client_id,
					client_secret,
					code
				}, {
					headers: {
						Accept: 'application/json'
					}
				});
				console.log(auth);
			} catch (error) {
				reject(error);
			}
		});
	}

	async checkAuth() {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await axios.get(`${process.env.NEXT_PUBLIC_AUTH_URL}/checkAuth`, { withCredentials: true });
				const { isAuthenticated, avatarUrl, login } = response;
				resolve({ type: 'UPDATE_IS_AUTHENTICATED', payload: { isAuthenticated, avatarUrl, login } });
			} catch (error) {
				reject(error);
			}
		});
	}
}

export default AuthService;
