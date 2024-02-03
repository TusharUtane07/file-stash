"use client";
import { app } from "@/firebase";
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import FileInfo from "../_components/FileInfo";
import ShareForm from "../_components/ShareForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

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
		<>
			<div className="grid lg:grid-cols-2 grid-cols-1 ">
				<FileInfo file={file} />
				<ShareForm />
			</div>
			<Link href={"/upload"}>
				<div className="w-60 m-auto text-center text-2xl mt-5 flex items-center gap-3 justify-center  rounded-sm cursor-pointer">
					<ArrowLeft /> Go to upload
				</div>
			</Link>
		</>
	);
};

export default FirePreview;
