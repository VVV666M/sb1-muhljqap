export type Platform = 'twitter' | 'instagram' | 'tiktok' | 'snapchat';

export type DownloadResponse = {
  url: string;
  title?: string;
  author?: string;
  thumbnail?: string;
};

export type DownloadInfo = {
  title?: string;
  author?: string;
  thumbnail?: string;
};