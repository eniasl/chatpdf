"use client"
import React from 'react';
import {useDropzone} from "react-dropzone";
import {Inbox, Loader2} from "lucide-react";
import {uploadToS3} from "@/lib/s3";
import {useMutation} from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from 'next/navigation'



const FileUpload = () => {
    const router = useRouter();
    const [uploading, setUploading] = React.useState(false);
    const {mutate,isLoading} = useMutation({
        mutationFn: async ({file_key, file_name}:{file_key:string,file_name:string}) => {
            const response = await axios.post("/api/create-chat",{file_key, file_name});
            return response.data;
        }
    })

    const {getRootProps, getInputProps} = useDropzone({
        accept: {"application/pdf": [".pdf"]},
        maxFiles: 1,
        onDrop: async (acceptedFiles) => {
            console.log("accepted files",acceptedFiles);
            const file = acceptedFiles[0];
            if (file?.size > 10 * 1024 * 1024) {
                toast.error("File too large");
                return;
            }
            setUploading(true);
            try {
                const data = await uploadToS3(file);
                console.log("data after uploading to s3",data);
                if (!data?.file_key || !data.file_name) {
                    alert("File missing");
                    return;
                }
                mutate(data, {
                    onSuccess: ({ chat_id }) => {
                        toast.success("File uploaded successfully");
                        router.push(`/dashboard/chat`);
                    },
                    onError: (error) => {
                        console.log("Error in mutation", error);
                        toast.error("Error uploading file");
                    }
                });
            }catch (error){
                setUploading(false);
                console.log("Error in file upload",error);
            }
        }
    });

    return (
        <div className="p-2 bg-white rounded-xl">
            <div {...getRootProps({className:"border-dashed border-2 rounded-xl bg-gray-50 py-8 flex justify-center items-center flex-col"})}>
                <input {...getInputProps()} />
                {uploading || isLoading ? (
                    <>
                        <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
                        <p className="mt-2 text-sm text-slate-400">Spilling the Tea to GPT</p>
                    </>
                ) : (
                    <>
                        <Inbox className="w-10 h-10 text-blue-950" />
                        <p className="mt-2 text-sm text-slate-400">Drop PDF Here</p>
                    </>
                )}
            </div>
        </div>
    );
};

export default FileUpload;
