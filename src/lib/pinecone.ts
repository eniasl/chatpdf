import { Pinecone} from '@pinecone-database/pinecone';
import { downloadFromS3 } from '@/lib/s3-server';
import {Simulate} from "react-dom/test-utils";
import {PDFLoader} from "langchain/document_loaders/fs/pdf"
import {Document, RecursiveCharacterTextSplitter} from "@pinecone-database/doc-splitter"
import {getEmbedding} from "@/lib/embedding";
import md5 from "md5";
import {convertToAscii} from "@/lib/utils";



const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! });

type PDFPage = {
    pageContent: string;
    metadata:{
        loc:{pageNumber:number}
    }
}

export async function loadS3IntoPinecone(file_key: string) {
    try {
        //1. obtain pdf -> download and reasd from s3
        console.log("downloading from s3 into file system");

        const file_name = await downloadFromS3(file_key);
        if (!file_name) {
            console.log("file not found while downloading from s3");
            return;
        }
        //2. read pdf from file system

        const loader = new PDFLoader(file_name);
        const pages = (await loader.load()) as PDFPage[];

        //split and segment the pdf into smaller chunks
        const documents = await Promise.all(pages.map(prepareDocument));

        //vectorize the documents
        const vectors = await Promise.all(documents.flat().map(embedDocuments));

        //upload the vectors to pinecone
        const index = pc.index("chatpdf");

        console.log("vectors are being uploaded to pinecone");
        const namespace = convertToAscii(file_key);
        await index.namespace(namespace).upsert(vectors);

        console.log("vectors uploaded to pinecone");
        return documents[0];

    }
    catch (error) {
        console.error("Error in loadS3IntoPinecone", error);
        throw error;
    }
}


async function embedDocuments(doc: Document) {
    try {
        console.log("embedding documents:", doc.pageContent);
        const embeddings = await getEmbedding(doc.pageContent)
        const hash = md5(doc.pageContent);

        return {
            id: hash,
            values: embeddings,
            metadata:{
                text:doc.metadata.text,
                pageNumber: doc.metadata.pageNumber
            }
        }

    }catch (error) {
        console.error("Error in embedDocuments", error);
        throw error;
    }
}


export const truncateStringByBytes = (str: string, numBytes: number) => {
    const enc = new TextEncoder();
    return new TextDecoder("utf-8").decode(enc.encode(str).slice(0, numBytes));
}

async function prepareDocument(page:PDFPage){
    let {pageContent,metadata} = page;
    pageContent = pageContent.replace(/\n/g,"");
    const splitter = new RecursiveCharacterTextSplitter();
    const docs = await splitter.splitDocuments([
        new Document({
            pageContent,
            metadata:{
                pageNumber: metadata.loc.pageNumber,
                text: truncateStringByBytes(pageContent, 36000)
            }
        })
    ]);
    return docs;
}
