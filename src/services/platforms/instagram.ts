import axios from 'axios';
import type { DownloadResponse } from '../../types/download';
import { config } from '../../config/environment';

export async function downloadInstagramContent(url: string): Promise<DownloadResponse> {
  try {
    const mediaId = extractMediaId(url);
    const response = await axios.get(`https://graph.instagram.com/${mediaId}`, {
      params: {
        fields: 'id,media_type,media_url,thumbnail_url,username,caption',
        access_token: config.instagram.accessToken
      }
    });

    return {
      url: response.data.media_url,
      title: response.data.caption || '',
      author: response.data.username,
      thumbnail: response.data.thumbnail_url || response.data.media_url
    };
  } catch (error) {
    throw new Error('Erreur lors de la récupération du contenu Instagram');
  }
}

function extractMediaId(url: string): string {
  const match = url.match(/instagram\.com\/p\/([A-Za-z0-9_-]+)/);
  if (!match) throw new Error('URL Instagram invalide');
  return match[1];
}