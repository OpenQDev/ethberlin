import VideoMini from "../components/VideoMini/VideoMini";
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [vidArr, setVidArray] = useState(
    [
      ['QmXi1gcn2GAVffy74DBdCPRTF29MD2Nojn3QSCVwDJ8A1B', 'PR_kwDOGAqhQc4uEWDY'],
      ['QmVci9ke1tBPf1cZmRfKC4gRZt1u4aUc7TaRdgoYDyPamZ', 'PR_kwDOGAqhQc4uEf0i'],
      ['QmeToRD3udpb5V5iGk4PZepoMQBVehUkscsuvM6uN8BQc1', 'PR_kwDOGAqhQc4uEZjQ'],
      ['QmZF7ZnhUAYYQDLsaGCZ6Z9TP1xASDw1jA9yicRKzZPSne', 'PR_kwDOGAqhQc4yprwl'],
      ['QmcfhvqnbgVYNGngdc9vbBkM5FE9BEQmQ69CLw2WK8ZaDC', 'PR_kwDOGAqhQc4zAXq9'],
      ['QmNknu7gvGmdWfdUh6c2piP7isYNkt8vYXxbZCTGtRVwmi', 'PR_kwDOGAqhQc4zUpKa'],
      ['QmXhwUFAAcoYaJc9gFK9rhBhWbVEpEqhH7tX7BjxYfAkJo', 'PR_kwDOGAqhQc4zbPSv'],
      ['QmbvgweGAnhJSu85m2XL82TRdbkikA3DdVKUjT1yQaMYsZ', 'PR_kwDOGAqhQc4zruk2']
    ]
  );
  const [localVids, setLocalVids] = useState(null);

  useEffect(() => {
    setLocalVids(JSON.parse(window.localStorage.getItem('videos')));
    console.log("localVids: ", localVids);
  }, []);

  /* const vidArr = [
    {cid: 'QmXi1gcn2GAVffy74DBdCPRTF29MD2Nojn3QSCVwDJ8A1B', prId: 'PR_kwDOGAqhQc4uEWDY' },
    {cid: 'QmVci9ke1tBPf1cZmRfKC4gRZt1u4aUc7TaRdgoYDyPamZ', prId: 'PR_kwDOGAqhQc4uEf0i'},
    {cid: 'QmeToRD3udpb5V5iGk4PZepoMQBVehUkscsuvM6uN8BQc1', prId: 'PR_kwDOGAqhQc4uEZjQ'},
    {cid: 'QmZF7ZnhUAYYQDLsaGCZ6Z9TP1xASDw1jA9yicRKzZPSne', prId: 'PR_kwDOGAqhQc4yprwl'},
    {cid: 'QmTJSAsUsNvMiKVKqDSjysfhkRwPku5iVRTbbKWhQ9CF1V', prId: 'PR_kwDOGAqhQc4yqt-q'},
    {cid: 'QmcfhvqnbgVYNGngdc9vbBkM5FE9BEQmQ69CLw2WK8ZaDC', prId: 'PR_kwDOGAqhQc4zAXq9'},
    {cid: 'QmNknu7gvGmdWfdUh6c2piP7isYNkt8vYXxbZCTGtRVwmi', prId: 'PR_kwDOGAqhQc4zUpKa'},
    {cid: 'QmXhwUFAAcoYaJc9gFK9rhBhWbVEpEqhH7tX7BjxYfAkJo', prId: 'PR_kwDOGAqhQc4zbPSv'},
    {cid: 'QmbvgweGAnhJSu85m2XL82TRdbkikA3DdVKUjT1yQaMYsZ', prId: 'PR_kwDOGAqhQc4zruk2'},
  ];
 */
  return (
    <div>
      <main>
        <div className="flex flex-row space-x-5">
        <div className="px-10 h-max font-semibold pt-5">Following</div>
        <div className="flex flex-wrap justify-center p-4 max-w-[1200px]">
          {localVids ?
            (
              localVids.map((foo, i) => {
                return (
                  <div key={foo[0]} className="flex p-4">
                    <button onClick={() => router.push(`/pullRequest/${foo[1]}`)}>
                      <VideoMini cid={foo[0]} />
                    </button>
                  </div>
                );
              })
            ) :
            (
              vidArr.map((foo, i) => {
                return (
                  <div key={foo[0]} className="flex p-4">
                    <button onClick={() => router.push(`/pullRequest/${foo[1]}`)}>
                      <VideoMini cid={foo[0]} />
                    </button>
                  </div>
                );
              }
              )
            )}
        </div>
        </div>
      </main>
    </div>
  );
}
