import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import { client, getProfiles, getWalletProfile } from "../../api";
import { ethers } from "ethers";
import useWeb3 from "../../hooks/useWeb3";
import StoreContext from "../../store/Store/StoreContext";
import VideoMini from "../../components/VideoMini/VideoMini";

export default function Profile() {
  const router = useRouter();
  const [appState] = useContext(StoreContext);
  const { id } = router.query;
  const [profile, setProfile] = useState();
  const [verifiedLensProfile, setVerifiedLensProfile] = useState();
  const [videos, setVideos] = useState([]);

  const { chainId, error, account, library, deactivate, safe } = useWeb3();

  useEffect(() => {
    if (id) {
      fetchProfile();
      fetchLensHandle();
    }
  }, [id]);

  async function fetchProfile() {
    try {
      const response = await client.query(getProfiles, { id }).toPromise();
      setProfile(response.data.profiles.items[0]);
    } catch (err) {
      console.log(err);
    }
  }

  async function fetchLensHandle() {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const address = accounts[0];
    console.log("waller found: ", address);
    try {
      const response = await client
        .query(getWalletProfile, { address })
        .toPromise();
      setVerifiedLensProfile(response.data.profiles.items[0].name);
    } catch (err) {
      console.log(err);
    }
  }

  async function followUser() {
    console.log(library);
    try {
      const response = await appState.lensClient.followUser(
        library,
        [id],
        [0x0]
      );
      console.log(`response from lens client ... ${response}`);
    } catch (err) {
      console.log("error: ", err);
    }
  }

  useEffect(() => {
    async function foo() {
      const response = await appState.pinataService.fetchVideoForUser(
        "flacojones.lens"
      );
      setVideos(response);
    }

    foo();
  }, []);

  if (!profile) return null;

  return (
    <div className="flex flex-col justify-center items-center p-8 w-full">
      <div className="flex flex-col bg-nav-bg self-center items-center space-y-4 border border-gray-700 mb-4 p-8 px-24">
        <div className=" text-2xl font-bold">Profile</div>
        <div>
          <div className="">User id: {id}</div>
          <div className="">Handle: {profile.handle}</div>
          <div className="">Bio: {profile.bio}</div>
          <div className="">Followers: {profile.stats.totalFollowers}</div>
          <div className="">Following: {profile.stats.totalFollowing}</div>
        </div>
        <div className="pt-3">
          <button
            onClick={followUser}
            className="btn-primary font-bold py-2 px-4"
          >
            Follow User
          </button>
        </div>
      </div>
      {videos.map((foo, i) => {
        return (
          <div key={foo.metadata.keyvalues.pullRequestId} className="flex p-4">
            <button
              onClick={() =>
                router.push(
                  `/pullRequest/${foo.metadata.keyvalues.pullRequestId}`
                )
              }
            >
              <VideoMini cid={foo.ipfs_pin_hash} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
