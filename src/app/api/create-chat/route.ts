import { NextResponse } from "next/server";
import { loadS3IntoPinecone } from "@/lib/pinecone";
import toast from "react-hot-toast";
import {db} from "@/lib/db";
import {chats} from "@/lib/db/schema";
import {getS3Url} from "@/lib/s3";
import {auth} from "@clerk/nextjs/server";

export async function POST(req: Request,response: Response) {
    const {userId} = await auth()
    if (!userId) {
        return new Response("Unauthorized", { status: 401 });
    }
    try {
        const body = await req.json();
        const { file_key, file_name } = body;
        console.log("from endpoint: file_key",file_key,"file_name",file_name);
        const pages = await loadS3IntoPinecone(file_key);
        console.log("pages:",pages);
        const chat_id = await db.insert(chats).values({
            fileKey: file_key,
            pdfName: file_name,
            pdfUrl: getS3Url(file_key),
            userId,
        }).returning({
            insertedId: chats.id,
        });
        return NextResponse.json({
            chat_id : chat_id[0].insertedId,
        });
    }catch (error){
        console.error("Error in create chat",error);
        return new Response(
            JSON.stringify({ error: error.message }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}