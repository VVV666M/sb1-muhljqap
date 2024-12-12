import React, { useState } from 'react';
import { Download, AlertCircle, Loader2 } from 'lucide-react';
import { downloadService } from '../services/downloadService';
import { PLATFORMS, ERROR_MESSAGES } from '../utils/constants';
import type { Platform, DownloadInfo } from '../types/download';

export default function DownloadForm() {
  const [url, setUrl] = useState('');
  const [platform, setPlatform] = useState<Platform>('twitter');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [downloadInfo, setDownloadInfo] = useState<DownloadInfo | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setDownloadInfo(null);
    
    if (!url) {
      setError(ERROR_MESSAGES.INVALID_URL);
      return;
    }

    try {
      setLoading(true);
      const response = await downloadService.downloadContent(url, platform);
      setDownloadInfo({
        title: response.title,
        author: response.author,
        thumbnail: response.thumbnail,
      });
      await downloadService.startDownload(response.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : ERROR_MESSAGES.DOWNLOAD_ERROR);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Plateforme
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {PLATFORMS.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPlatform(p)}
                className={`p-3 text-sm font-medium rounded-lg transition-colors
                  ${platform === p 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="url" className="block text-sm font-medium text-gray-700">
            URL du contenu
          </label>
          <input
            type="url"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Collez le lien ici..."
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {error && (
          <div className="flex items-center gap-2 text-red-600">
            <AlertCircle size={20} />
            <span className="text-sm">{error}</span>
          </div>
        )}

        {downloadInfo && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900">{downloadInfo.title}</h4>
            {downloadInfo.author && (
              <p className="text-sm text-gray-600">Par {downloadInfo.author}</p>
            )}
            {downloadInfo.thumbnail && (
              <img 
                src={downloadInfo.thumbnail} 
                alt="Aperçu"
                className="mt-2 rounded-md w-full max-w-[200px] object-cover" 
              />
            )}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-6 rounded-lg transition-colors
            ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'}`}
        >
          {loading ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              Téléchargement...
            </>
          ) : (
            <>
              <Download size={20} />
              Télécharger
            </>
          )}
        </button>
      </form>
    </div>
  );
}