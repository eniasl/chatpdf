import { Pinecone } from "@pinecone-database/pinecone";
import { convertToAscii } from "./utils";
import { getEmbedding } from "@/lib/embedding";

// Types
interface Metadata {
    text: string;
    pageNumber: number;
}

export async function getMatchesFromEmbeddings(
    embeddings: number[],
    fileKey: string
) {
    try {
        // Updated Pinecone initialization without environment
        const client = new Pinecone({
            apiKey: process.env.PINECONE_API_KEY!,
        });

        // Get the index based on your environment's controller URL
        const pineconeIndex = await client.index("chatpdf");
        const namespace = pineconeIndex.namespace(convertToAscii(fileKey));

        const queryResult = await namespace.query({
            topK: 5,
            vector: embeddings,
            includeMetadata: true,
        });

        return queryResult.matches || [];
    } catch (error) {
        console.error("Error querying embeddings:", error);
        throw new Error(
            "Failed to query embeddings from Pinecone: " +
            (error instanceof Error ? error.message : "Unknown error")
        );
    }
}

export async function getContext(query: string, fileKey: string) {
    try {
        const queryEmbeddings = await getEmbedding(query);
        const matches = await getMatchesFromEmbeddings(queryEmbeddings, fileKey);

        const qualifyingDocs = matches.filter(
            (match) => match.score && match.score > 0.7
        );

        const docs = qualifyingDocs.map((match) => (match.metadata as Metadata).text);

        // Truncate concatenated text to 3000 characters
        return docs.join("\n").substring(0, 3000);
    } catch (error) {
        console.error("Error getting context:", error);
        throw new Error(
            "Failed to get context: " +
            (error instanceof Error ? error.message : "Unknown error")
        );
    }
}