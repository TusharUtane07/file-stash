import React from "react";

const ProgressBar = ({ progress }: any) => {
	return (
		<div className="bg-gray-400 w-full h-4 mt-3 rounded-full">
			<div
				className="p-1 bg-primary h-4 text-[10px] rounded-full text-white"
				style={{ width: `${progress}%` }}>
				{`${Number(progress).toFixed(0)}%`}
			</div>
		</div>
	);
};

export default ProgressBar;
