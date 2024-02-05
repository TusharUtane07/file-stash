import Image from "next/image";
import React from "react";

type Props = {
	file: any;
};

const FileInfo = ({ file }: Props) => {
	return (
		<div className=" m-5 flex flex-col items-center">
			{file?.fileUrl ? (
				<>
					<Image
						src={file?.fileUrl}
						width={300}
						height={200}
						alt="File Image"
						className="h-30 w-30 mt-3 border-2 border-black/30"></Image>
					<p className="mt-5 text-xl mb-3">{file?.fileName}</p>
				</>
			) : (
				<div>Loading...</div>
			)}
		</div>
	);
};

export default FileInfo;
