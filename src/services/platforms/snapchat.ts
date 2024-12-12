import axios from 'axios';
import type { DownloadResponse } from '../../types/download';
import { config } from '../../config/environment';

export async function downloadSnapchatContent(url: string): Promise<DownloadResponse> {
  try {
    const storyId = extractStoryId(url);
    const response = await axios.get(`https://story.snapchat.com/s/${storyId}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Authorization': `Bearer ${config.snapchat.token}`
      }
    });

    return {
      url: response.data.story.media.mediaUrl,
      title: response.data.story.caption || '',
      author: response.data.story.publisher.displayName,
      thumbnail: response.data.story.media.thumbnailUrl
    };
  } catch (error) {
    throw new Error('Erreur lors de la récupération du contenu Snapchat');
  }
}

function extractStoryId(url: string): string {
  const match = url.match(/snapchat\.com\/s\/([A-Za-z0-9_-]+)/);
  if (!match) throw new Error('URL Snapchat invalide');
  return match[1];
}