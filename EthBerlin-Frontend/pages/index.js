import VideoMini from "../components/VideoMini/VideoMini";

export default function Home() {
  const vidArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <div>
      <main className="flex justify-center">
        <div className="flex flex-wrap justify-center p-4 max-w-[1200px]">
          {vidArr.map((video) => {
            return (
              <div key={video} className="flex p-4">
                <button onClick={() => alert('do it')}>
                  <VideoMini
                    source={
                      "https://gateway.pinata.cloud/ipfs/QmXFrf8c8VPWnJzXqyuRZwSum6LrftTiJY4QBThhMsdqQv"
                    }
                    poster={""}
                  />
                </button>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
