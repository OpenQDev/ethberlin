import { useState, useContext, useEffect } from "react";
import StoreContext from "../store/Store/StoreContext";

const PR = ({ pullRequestId }) => {
  const [appState, dispatch] = useContext(StoreContext);
  const [foo, setFoo] = useState(null);

  useEffect(() => {
    async function getPr() {
      try {
        const foothing = await appState.githubRepository.getPullRequest(
          pullRequestId
        );
        setFoo(foothing);
      } catch (error) {
        console.log(error);
      }
    }
    if (pullRequestId) {
      getPr();
    }
  }, [pullRequestId]);

  if (foo) {
    return (
      <div className="flex flex-col">
        <div className="text-2xl">GitHub Issue: {foo.issueTitle}</div>
        <div>
          Issue URL:{" "}
          <a className="text-blue-400 hover:underline" target="_blank" rel="noreferrer" href={foo.issueUrl}>
            {foo.issueUrl}
          </a>
        </div>

        <div>
          Pull Request URL:{" "}
          <a className="text-blue-400 hover:underline" target="_blank" rel="noreferrer" href={foo.prUrl}>
            {foo.prUrl}
          </a>
        </div>

        <div>
          Lens Handle:{" "}
          <a className="text-blue-400 hover:underline" target="_blank" rel="noreferrer" href={'https://ethberlin-flacojones-openqberlin2022.vercel.app/profile/0x46e0'}>
            {'hssht.lens'}
          </a>
        </div>
      </div>
    );
  } else {
    return <h1>Loading...</h1>;
  }
};

export default PR;
