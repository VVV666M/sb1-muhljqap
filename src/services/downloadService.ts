import type { DownloadResponse, Platform } from '../types/download';
import { downloadTwitterContent } from './platforms/twitter';
import { downloadInstagramContent } from './platforms/instagram';
import { downloadTikTokContent } from './platforms/tiktok';
import { downloadSnapchatContent } from './platforms/snapchat';

class DownloadService {
  private platformHandlers = {
    twitter: downloadTwitterContent,
    instagram: downloadInstagramContent,
    tiktok: downloadTikTokContent,
    snapchat: downloadSnapchatContent,
  };

  async downloadContent(url: string, platform: Platform): Promise<DownloadResponse> {
    try {
      const handler = this.platformHandlers[platform];
      if (!handler) {
        throw new Error('Plateforme non supportée');
      }

      return await handler(url);
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Erreur lors du téléchargement');
    }
  }

  async startDownload(mediaUrl: string) {
    try {
      const response = await fetch(mediaUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', '');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      throw new Error('Erreur lors du téléchargement du fichier');
    }
  }
}

export const downloadService = new DownloadService();