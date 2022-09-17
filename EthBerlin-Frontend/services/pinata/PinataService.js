import axios from "axios";

class PinataService {
	constructor() { }

	async testAuth() {
		return new Promise(async (resolve, reject) => {
			try {
				var config = {
					method: 'get',
					url: 'https://api.pinata.cloud/data/testAuthentication',
					headers: {
						'Authorization': `Bearer ${process.env.NEXT_PUBLIC_JWT}`
					}
				};

				const res = await axios(config);
				resolve(res);
			} catch (error) {
				console.log(error);
				reject(error);
			}
		});
	}
}

export default PinataService;