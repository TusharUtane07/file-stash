"use client";
import React from "react";
import UploadForm from "./_components/UploadForm";

const Upload = () => {
	return (
		<div className="p-5 px-8 md:px-28">
			<h2 className="text-[20px] text-center m-5 ">
				Start <strong className="text-primary">Uploading</strong> Files &{" "}
				<strong className="text-primary ">Share</strong>
				them
			</h2>
			<UploadForm
				uploadButtonClick={(file: File | null) => console.log(file)}
			/>
		</div>
	);
};

export default Upload;
