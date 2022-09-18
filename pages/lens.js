import { useState, useEffect } from 'react';
import {
  client, recommendProfiles
} from '../api'
import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  const [profiles, setProfiles] = useState([])
  useEffect(() => {
    fetchProfiles()
  }, [])

  async function fetchProfiles() {
   try {
    const response = await client.query(recommendProfiles).toPromise()
    setProfiles(response.data.recommendedProfiles)
   } catch (err) {
    console.log({ err })
   }
  }

  return (
    <div>
      <div className='text-3xl pt-10 pl-10 font-bold'>
        VidQ Lens Module
      </div>
      <div className="pl-10 pt-5">
          {
            profiles.map((profile, index) => (
              <Link href={`/profile/${profile.id}`} key={index}>
                <div className="pt-2">
                  <a>
                    {/* {
                      profile.picture ? (
                        <Image
                          src={profile.picture.original.url}
                          alt="No pic"
                          width="52px"
                          height="52px"
                        />
                      ) :  null
                    } */}
                    <p>{profile.handle}</p>
                  </a>
                </div>
              </Link>
            ))
          }
        </div>
    </div>

  )
}

