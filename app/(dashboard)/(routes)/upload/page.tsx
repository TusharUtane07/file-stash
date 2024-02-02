"use client";
import React, { useEffect, useState } from "react";
import UploadForm from "./_components/UploadForm";
import {
	StorageReference,
	getDownloadURL,
	getStorage,
	ref,
	uploadBytesResumable,
} from "firebase/storage";
import { app, auth } from "@/firebase";
import { doc, getFirestore, setDoc } from "firebase/firestore";

const Upload: React.FC = () => {
	const [progress, setProgress] = useState<number>();
	const [email, setEmail] = useState<string | any>("");

	const storage = getStorage(app);
	const db = getFirestore(app);

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
						saveInfo(file, downloadURL);
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

	const getLoggedInUserEmail = () => {
		const user = auth.currentUser;
		if (user !== null) {
			setEmail(user?.email);
			console.log(email);
		}
	};

	useEffect(() => {
		getLoggedInUserEmail();
	}, [email]);

	const saveInfo = async (file: File, fileUrl: string) => {
		const docId = Date.now().toString();
		await setDoc(doc(db, "uploadedName", email), {
			fileName: file?.name,
			fileSize: file?.size,
			fileType: file?.type,
			fileUrl: fileUrl,
			userEmail: email,
			id: docId,
			password: "",
		});
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
