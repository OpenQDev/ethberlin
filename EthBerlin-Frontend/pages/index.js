import VideoMini from "../components/VideoMini/VideoMini";
import VideoPlayer from "../components/VideoPlayer";
import ConnectButton from "../components/WalletConnect/ConnectButton";

export default function Home() {
  const vidArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <div>
      <header className="flex justify-between p-2 bg-[#171a1e]">
        <div className="flex gap-4 items-center">
          <div>QVid</div>
          <input
            type="text"
            className="input-field lg:flex hidden pr-4 items-center focus:w-80 w-60  left-0 transition-all  ease-in-out duration-700"
            placeholder="Search QVid"
          ></input>
        </div>
        <ConnectButton />
      </header>
      <main className="flex justify-center">
        <div className="flex flex-wrap items-center p-4 max-w-[1200px]">
          {vidArr.map((video) => {
            return (
              <div key={video} className='flex p-4'>
                <VideoMini
                  source={
                    "https://gateway.pinata.cloud/ipfs/QmXFrf8c8VPWnJzXqyuRZwSum6LrftTiJY4QBThhMsdqQv"
                  }
                  poster={""}
                />
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
