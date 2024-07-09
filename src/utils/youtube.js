// src/utils/youtube.js

import axios from "axios";

const API_KEY = process.env.VUE_APP_YOUTUBE_API_KEY;
const CHANNEL_ID = process.env.VUE_APP_YOUTUBE_CHANNEL_ID;

console.log("API Key:", API_KEY);
console.log("Channel ID:", CHANNEL_ID);

if (!API_KEY || !CHANNEL_ID) {
  throw new Error("Missing YouTube API key or channel ID");
}

export const fetchVideos = async () => {
  try {
    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        params: {
          part: "snippet",
          channelId: CHANNEL_ID,
          maxResults: 10,
          key: API_KEY,
        },
      }
    );

    console.log("YouTube API Response:", response.data);

    return response.data.items.map((item) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.medium.url,
      publishedAt: item.snippet.publishedAt,
    }));
  } catch (error) {
    console.error("Error fetching videos:", error);
    throw error;
  }
};
