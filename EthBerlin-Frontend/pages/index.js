import VideoMini from "../components/VideoMini/VideoMini";
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  const vidArr = [
    { cid: 'QmXi1gcn2GAVffy74DBdCPRTF29MD2Nojn3QSCVwDJ8A1B', prId: 'PR_kwDOGAqhQc4uEWDY' },
    { cid: 'QmVci9ke1tBPf1cZmRfKC4gRZt1u4aUc7TaRdgoYDyPamZ', prId: 'PR_kwDOGAqhQc4uEf0i'},
    {cid: 'QmeToRD3udpb5V5iGk4PZepoMQBVehUkscsuvM6uN8BQc1', prId: 'PR_kwDOGAqhQc4uEZjQ'},
    {cid: 'QmZF7ZnhUAYYQDLsaGCZ6Z9TP1xASDw1jA9yicRKzZPSne', prId: 'PR_kwDOGAqhQc4yprwl'},
    {cid: 'QmTJSAsUsNvMiKVKqDSjysfhkRwPku5iVRTbbKWhQ9CF1V', prId: 'PR_kwDOGAqhQc4yqt-q'},
    {cid: 'QmcfhvqnbgVYNGngdc9vbBkM5FE9BEQmQ69CLw2WK8ZaDC', prId: 'PR_kwDOGAqhQc4zAXq9'},
    {cid: 'QmNknu7gvGmdWfdUh6c2piP7isYNkt8vYXxbZCTGtRVwmi', prId: 'PR_kwDOGAqhQc4zUpKa'},
    {cid: 'QmXhwUFAAcoYaJc9gFK9rhBhWbVEpEqhH7tX7BjxYfAkJo', prId: 'PR_kwDOGAqhQc4zbPSv'},
    {cid: 'QmbvgweGAnhJSu85m2XL82TRdbkikA3DdVKUjT1yQaMYsZ', prId: 'PR_kwDOGAqhQc4zruk2'},

  ];

  return (
    <div>
      <main className="flex justify-center">
        <div className="flex flex-wrap justify-center p-4 max-w-[1200px]">
          {vidArr.map((foo) => {
            return (
              <div key={foo.cid} className="flex p-4">
                <button onClick={() => router.push(`/pullRequest/${foo.prId}`)}>
                  <VideoMini cid={foo.cid} />
                </button>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
