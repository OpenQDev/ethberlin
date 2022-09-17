import { ethers } from 'ethers';
import LensABI from '../../abi.json';

class LensClient {
	constructor() { }

	/**
	 *
	 * @param {Web3Provider} signer An ethers.js signer
	 * @returns Web3Contract
	 */
	Lens = (signer) => {
		const contract = new ethers.Contract(process.env.NEXT_PUBLIC_LENS_ADDRESS, LensABI, signer);
		return contract;
	};

	followUser(library, ids, data) {
		return new Promise(async (resolve, reject) => {
			const signer = library.getSigner();
			const contract = this.Lens(signer);

			try {
				const tx = await contract.follow(ids, data);
				await tx.wait();
				resolve(`successfully followed ... ${profile.handle}`);
			} catch (err) {
				reject(err);
			}
		});
	}
}

export default LensClient;
