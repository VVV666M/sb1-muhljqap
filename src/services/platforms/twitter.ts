import axios from 'axios';
import type { DownloadResponse } from '../../types/download';
import { config } from '../../config/environment';

export async function downloadTwitterContent(url: string): Promise<DownloadResponse> {
  try {
    const response = await axios.get(`https://api.twitter.com/2/tweets/${extractTweetId(url)}`, {
      headers: {
        'Authorization': `Bearer ${config.twitter.apiKey}`
      }
    });

    return {
      url: response.data.includes?.media?.[0]?.url || '',
      title: response.data.data?.text || '',
      author: response.data.includes?.users?.[0]?.name || '',
      thumbnail: response.data.includes?.media?.[0]?.preview_image_url
    };
  } catch (error) {
    throw new Error('Erreur lors de la récupération du contenu Twitter');
  }
}

function extractTweetId(url: string): string {
  const match = url.match(/twitter\.com\/\w+\/status\/(\d+)/);
  if (!match) throw new Error('URL Twitter invalide');
  return match[1];
}