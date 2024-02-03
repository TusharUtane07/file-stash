"use client";
import { app } from "@/firebase";
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import FileInfo from "../_components/FileInfo";
import ShareForm from "../_components/ShareForm";

type Props = {
	params: any;
};

const FirePreview = ({ params }: Props) => {
	const db = getFirestore(app);

	const [file, setFile] = useState<any>();

	useEffect(() => {
		console.log(params?.fileId);
		params?.fileId && getFileInfo();
	}, []);

	const getFileInfo = async () => {
		const docRef = doc(db, "uploadedName", params?.fileId);
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			console.log("Document data: ", docSnap?.data());
			setFile(docSnap?.data());
		} else {
			console.log("No such data found");
		}
	};

	// const onPasswordSave = async (password: any) => {
	// 	const docRef = doc(db, "uploadedName", params?.fileId);
	// 	await updateDoc(docRef, {
	// 		password: password,
	// 	});
	// };

	return (
		<div className="grid lg:grid-cols-2 grid-cols-1 ">
			<FileInfo file={file} />
			<ShareForm />
		</div>
	);
};

export default FirePreview;
