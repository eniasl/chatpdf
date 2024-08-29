import { NextResponse } from "next/server";
import { loadS3IntoPinecone } from "@/lib/pinecone";
import toast from "react-hot-toast";

export async function POST(req: Request,response: Response) {
    try {
        const body = await req.json();
        const { file_key, file_name } = body;
        console.log("from endpoint: file_key",file_key,"file_name",file_name);
        const pages = await loadS3IntoPinecone(file_key);
        console.log("pages:",pages);
        return NextResponse.json({ file_key, file_name });
    }catch (error){
        console.error("Error in create chat",error);
        return new Response(
            JSON.stringify({ error: error.message }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}