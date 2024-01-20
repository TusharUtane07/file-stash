"use client";
import React, { useState } from "react";
import UploadForm from "./_components/UploadForm";
import {
	StorageReference,
	getDownloadURL,
	getStorage,
	ref,
	uploadBytesResumable,
} from "firebase/storage";
import { app } from "@/firebase";

const Upload: React.FC = () => {
	const [progress, setProgress] = useState<number>();

	const storage = getStorage(app);

	const uploadFile = (file: File | null) => {
		if (!file) {
			console.error("No file selected for upload");
			return;
		}

		const metadata = {
			contentType: file.type,
		};

		const imageRef: StorageReference = ref(storage, "upload-file/" + file.name);

		const uploadTask = uploadBytesResumable(imageRef, file, metadata);

		uploadTask.on(
			"state_changed",
			(snapshot) => {
				const progress =
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				console.log("Upload is: " + progress + "% done");
				setProgress(progress);
				progress == 100 &&
					getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
						console.log("File is available at ", downloadURL);
					});
			},
			(error) => {
				console.error("Error during upload:", error);
			},
			() => {
				console.log("Upload complete!");
			}
		);
	};

	return (
		<div className="p-5 px-8 md:px-28">
			<h2 className="text-[20px] text-center m-5 ">
				Start <strong className="text-primary">Uploading</strong> Files &{" "}
				<strong className="text-primary ">Share</strong>
				them
			</h2>
			<UploadForm
				uploadButtonClick={(file: File | null) => uploadFile(file)}
				progress={progress}
			/>
		</div>
	);
};

export default Upload;
