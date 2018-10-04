import React from "react";
import * as css from "./core.scss";
export const CoreLayout = ({ children }) => {
	return (
		<div className={`${css.childContainer} container-fluid`}>
			{ children }
		</div>
	);
};
export default CoreLayout;
