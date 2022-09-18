import { ethers } from 'ethers';
import LensABI from '../../abi.json';
import { client, getWalletProfile } from '../../api';
import useWeb3 from '../../hooks/useWeb3';
import StoreContext from '../../store/Store/StoreContext';

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

	signMessage = async (account) => {
		const message = 'OpenQ';
		const signature = await window.ethereum.request({
		  method: 'personal_sign',
		  params: [message, account],
		});
		return signature;
	  };

	ecdsaRecover = (signature) => {
	let message = 'OpenQ';
		try {
			const recoveredAddress = ethers.utils.verifyMessage(message, signature);
			return recoveredAddress;
		} catch (err) {
			return false;
		}
	}

	async fetchLensHandle(address) {
		try {
		  const response = await client.query(getWalletProfile, { address }).toPromise();
		  return response;
		} catch (err) {
		  console.log(err);
		}
	  }

	compareAddress = (addr1, addr2) => {
	console.log("adr1". addr1);
	console.log("adr2", addr2);
	return addr1.toLowerCase() === addr2.toLowerCase();
	};

}

export default LensClient;
