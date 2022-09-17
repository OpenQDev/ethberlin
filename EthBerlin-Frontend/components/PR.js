import { useState, useContext, useEffect } from "react";
import StoreContext from "../store/Store/StoreContext";

const PR = ({ pullRequestId }) => {
	const [appState, dispatch] = useContext(StoreContext);
	const [foo, setFoo] = useState(null);

	useEffect(() => {
		async function getPr() {
			try {
				const foothing = await appState.githubRepository.getPullRequest(pullRequestId);
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
			<>
				<h2>Pull Request</h2>
				<a target="_blank" href={foo.prUrl}>{foo.prUrl}</a>
				<h2>Issue Title</h2>
				<h2>{foo.issueTitle}</h2>
				<h2>Issue Url</h2>
				<a target="_blank" href={foo.issueUrl}>{foo.issueUrl}</a>
			</>
		);
	} else {
		return <h1>Loading...</h1>;
	}
};

export default PR;