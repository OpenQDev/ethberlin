import {useRouter} from 'next/router'
import { useState, useEffect } from 'react'
import { client, getProfiles } from '../../api'
import { ethers } from 'ethers'

const CONTRACT_ADDRESS = "0xDb46d1Dc155634FbC732f92E853b10B288AD5a1d"
import ABI from '../../abi.json'

export default function Profile() {
    const router = useRouter()
    const { id } = router.query
    const [profile, setProfile] = useState()
    const [account, setAccount] = useState('')

    useEffect(() => {
    if (id) {
      fetchProfile()
    }
    }, [id])


    async function fetchProfile() {
        try {
            const response = await client.query(getProfiles, { id }).toPromise();
            setProfile(response.data.profiles.items[0])
            console.log('response', profile)
        } catch(err) {
            console.log(err)
        }
    }

    async function connectWallet() {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts"
        })
        console.log('accounts: ', accounts)
        accounts[0]
        setAccount(account)
      }
    
      function getSigner() {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        return provider.getSigner();
      }
    
      async function followUser() {
        const contract = new ethers.Contract(
          CONTRACT_ADDRESS,
          ABI,
          getSigner()
        )
    
        try {
          const tx = await contract.follow([id], [0x0])
          await tx.wait()
          console.log(`successfully followed ... ${profile.handle}`)
        } catch (err) {
          console.log('error: ', err)
        }
      }
      
    if(!profile) return null

    return(
        <div className="pt-3 pl-5">
            <button onClick={connectWallet} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Connect</button>
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
    )
}