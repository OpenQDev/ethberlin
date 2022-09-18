import React from "react";
import ConnectButton from "../components/WalletConnect/ConnectButton";


const Navigation = () => {
  return (
    <header className="flex justify-between p-2 bg-nav-bg">
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
  );
};

export default Navigation;
