import { OpenAIApi, Configuration } from "openai-edge";
import toast from "react-hot-toast";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration);

export async function getEmbedding(text: string) {
    try {
        const response = await openai.createEmbedding({
            model: "text-embedding-ada-002",
            input: text.replace(/\n/g, "")
        });

        const result = await response.json();
        console.log("result from openai", result);

        if (!result.data || result.data.length === 0) {
            throw new Error("No embedding data returned");
        }

        return result.data[0].embedding as number[];
    } catch (error) {
        console.error("Error in getEmbedding", error);
        toast.error("Error in getEmbedding");
        return null;
    }
}