import { useRouter } from 'next/router';
import { useState, useEffect, useContext } from 'react';
import { client, getProfiles } from '../../api';
import { ethers } from 'ethers';
import useWeb3 from '../../hooks/useWeb3';
import StoreContext from "../../store/Store/StoreContext";

export default function Profile() {
  const router = useRouter();
  const [appState] = useContext(StoreContext);
  const { id } = router.query;
  const [profile, setProfile] = useState();

  const { chainId, error, account, library, deactivate, safe } = useWeb3();

  useEffect(() => {
    if (id) {
      fetchProfile();
    }
  }, [id]);


  async function fetchProfile() {
    try {
      const response = await client.query(getProfiles, { id }).toPromise();
      setProfile(response.data.profiles.items[0]);
      console.log('response', profile);
    } catch (err) {
      console.log(err);
    }
  }

  async function followUser() {
    console.log(library);
    try {
      const response = await appState.lensClient.followUser(library, [id], [0x0]);
      console.log(`response from lens client ... ${response}`);
    } catch (err) {
      console.log('error: ', err);
    }
  }

  if (!profile) return null;

  return (
    <div className="pt-3 pl-5">
      <div className="pt-10 pl-5 text-2xl font-bold">Profile</div>
      <div className="pt-5 pl-5">{id}</div>
      <div className="pt-2 pl-5">{profile.handle}</div>
      <div className="pt-5 pl-5">{profile.bio}</div>
      <div className="pt-5 pl-5">Followers: {profile.stats.totalFollowers}</div>
      <div className="pt-5 pl-5">Following: {profile.stats.totalFollowing}</div>
      <div className="pt-3">
        <button onClick={followUser} className="bg-blue-500 hover:bg-blue-300 text-white font-bold py-2 px-4 rounded">Follow User</button>
      </div>
    </div>
  );
}