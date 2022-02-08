import React from "react";
import Lista from "./Lista.jsx";

const Home = () => {
	return (
		<div>
			<div className="container bg-light">
				<div className="row justify-content-center">
					<div className="col text-center">
						<p className="fw-lighter fs-1">todos</p>
					</div>
				</div>
			</div>
			<Lista />
		</div>
	);
};

export default Home;
