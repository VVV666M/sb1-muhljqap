export const config = {
  twitter: {
    apiKey: import.meta.env.VITE_TWITTER_API_KEY || '',
  },
  instagram: {
    accessToken: import.meta.env.VITE_INSTAGRAM_ACCESS_TOKEN || '',
  },
  tiktok: {
    accessKey: import.meta.env.VITE_TIKTOK_ACCESS_KEY || '',
  },
  snapchat: {
    token: import.meta.env.VITE_SNAPCHAT_TOKEN || '',
  }
};