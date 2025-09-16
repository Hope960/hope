
import { GoogleGenAI, GenerateVideosOperation } from "@google/genai";

const POLL_INTERVAL_MS = 10000; // 10 seconds

// A singleton to hold the initialized AI client
let ai: GoogleGenAI | null = null;

/**
 * Initializes and returns the GoogleGenAI client instance.
 * Throws an error if the API key is not available.
 */
const getAiClient = (): GoogleGenAI => {
    if (ai) {
        return ai;
    }

    if (!process.env.API_KEY) {
        throw new Error("API key is not configured. Please set the API_KEY environment variable.");
    }
    
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    return ai;
};


export const generateVideoFromImage = async (
  base64Image: string,
  mimeType: string,
  prompt: string
): Promise<string> => {
  const geminiAI = getAiClient();

  let operation: GenerateVideosOperation = await geminiAI.models.generateVideos({
    model: 'veo-2.0-generate-001',
    prompt,
    image: {
      imageBytes: base64Image,
      mimeType: mimeType,
    },
    config: {
      numberOfVideos: 1
    }
  });

  while (!operation.done) {
    await new Promise(resolve => setTimeout(resolve, POLL_INTERVAL_MS));
    operation = await geminiAI.operations.getVideosOperation({ operation: operation });
  }

  if (operation.error) {
    // Throw the specific error message from the API to be handled by the UI
    throw new Error(String(operation.error.message || 'An unknown error occurred during video generation.'));
  }

  const firstVideo = operation.response?.generatedVideos?.[0];

  if (!firstVideo) {
    console.error("Full operation response:", JSON.stringify(operation, null, 2));
    throw new Error("Video generation completed, but no video was produced. This might be due to content policies or safety filters.");
  }

  const downloadLink = firstVideo.video?.uri;

  if (!downloadLink) {
    console.error("Full operation response:", JSON.stringify(operation, null, 2));
    throw new Error("Video generation succeeded, but a download link was not found in the response.");
  }

  // The API key must be appended to the download URL for authentication
  const videoResponse = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
  if (!videoResponse.ok) {
    const errorBody = await videoResponse.text();
    console.error("Failed to download video. Status:", videoResponse.status, "Body:", errorBody);
    throw new Error(`Failed to download the generated video. Server responded with: ${videoResponse.statusText}`);
  }

  const videoBlob = await videoResponse.blob();
  const videoUrl = URL.createObjectURL(videoBlob);
  return videoUrl;
};
