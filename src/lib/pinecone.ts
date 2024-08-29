import { Pinecone } from '@pinecone-database/pinecone';
import { downloadFromS3 } from '@/lib/s3-server';
import {Simulate} from "react-dom/test-utils";
import {PDFLoader} from "langchain/document_loaders/fs/pdf"


const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! });

export async function loadS3IntoPinecone(file_key: string) {
    //1. obtain pdf -> download and reasd from s3
    console.log("downloading from s3 into file system");

    const file_name = await downloadFromS3(file_key);
    if (!file_name) {
        console.log("file not found while downloading from s3");
        return;
    }
    //2. read pdf from file system

    const loader = new PDFLoader(file_name);
    const pages = await loader.load();
    return pages;
}

