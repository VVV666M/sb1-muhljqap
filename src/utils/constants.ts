import type { Platform } from '../types/download';

export const PLATFORMS: Platform[] = ['twitter', 'instagram', 'tiktok', 'snapchat'];

export const ERROR_MESSAGES = {
  INVALID_URL: 'Veuillez entrer une URL valide',
  DOWNLOAD_ERROR: 'Erreur lors du téléchargement',
  FILE_DOWNLOAD_ERROR: 'Erreur lors du téléchargement du fichier',
} as const;