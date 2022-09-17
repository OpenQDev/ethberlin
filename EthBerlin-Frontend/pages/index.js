import VideoMini from "../components/VideoMini/VideoMini";
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  const vidArr = [
    { cid: 'QmXi1gcn2GAVffy74DBdCPRTF29MD2Nojn3QSCVwDJ8A1B', prId: 'PR_kwDOGAqhQc4uEWDY' }
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
