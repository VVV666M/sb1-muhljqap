import axios from 'axios';
import type { DownloadResponse } from '../../types/download';
import { config } from '../../config/environment';

export async function downloadTikTokContent(url: string): Promise<DownloadResponse> {
  try {
    const videoId = extractVideoId(url);
    const response = await axios.get('https://api.tiktokv.com/aweme/v1/feed/', {
      params: {
        aweme_id: videoId,
        access_key: config.tiktok.accessKey
      }
    });

    const videoData = response.data.aweme_list[0];
    return {
      url: videoData.video.play_addr.url_list[0],
      title: videoData.desc,
      author: videoData.author.nickname,
      thumbnail: videoData.video.cover.url_list[0]
    };
  } catch (error) {
    throw new Error('Erreur lors de la récupération du contenu TikTok');
  }
}

function extractVideoId(url: string): string {
  const match = url.match(/tiktok\.com\/@[\w.-]+\/video\/(\d+)/);
  if (!match) throw new Error('URL TikTok invalide');
  return match[1];
}