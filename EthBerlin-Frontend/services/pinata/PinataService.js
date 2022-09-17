import axios from "axios";

class PinataService {
	constructor() { }

	async uploadVideo(formData) {
		return new Promise(async (resolve, reject) => {
			try {
				const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
					maxBodyLength: "Infinity",
					headers: {
						'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
						Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`,
					}
				});
				console.log(res);
				resolve(res.data.IpfsHash);
			} catch (error) {
				reject(error);
			}
		});
	}

	async fetchVideo(pullRequestId) {
		return new Promise(async (resolve, reject) => {
			try {
				const res = await axios.get(`https://api.pinata.cloud/data/pinList?metadata[keyvalues]={"pullRequestId":{"value":"${pullRequestId}", "op": "eq"}}`, {
					maxBodyLength: "Infinity",
					headers: {
						Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`,
					}
				});

				if (res.data.count == 0) {
					resolve(null);
				} else {
					resolve(res.data.rows[0].ipfs_pin_hash);
				}
			} catch (error) {
				console.log(error);
				reject(error);
			}
		});
	}
}

export default PinataService;