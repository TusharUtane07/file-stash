import React from "react";

type Props = {};

const BottomFooter = (props: Props) => {
	return (
		<div className="absolute bottom-0 h-10 text-center hidden lg:flex left-[50%]">
			Copyright &copy; 2024
		</div>
	);
};

export default BottomFooter;
