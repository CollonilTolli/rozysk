'use client';

import { useState } from 'react';

interface FileInfo {
  filename: string;
  downloadUrl: string;
  size: number;
  downloadCount: number;
  version: string;
}

interface FileDownloaderProps {
  filename: string;
  displayName?: string;
  isAccessibilityMode?: boolean;
}

export default function FileDownloader({ 
  filename, 
  displayName, 
  isAccessibilityMode = false 
}: FileDownloaderProps) {
  const [fileInfo, setFileInfo] = useState<FileInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleDownload = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/download?filename=${encodeURIComponent(filename)}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Ошибка при получении файла');
      }

      const data: FileInfo = await response.json();
      setFileInfo(data);

      // Открываем ссылку для скачивания
      window.open(data.downloadUrl, '_blank');
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла ошибка');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`p-4 rounded-lg border ${
      isAccessibilityMode 
        ? 'bg-black border-white text-white' 
        : 'bg-white border-gray-200'
    }`}>
      <div className="flex flex-col space-y-3">
        <div>
          <h3 className={`font-semibold ${
            isAccessibilityMode ? 'text-white' : 'text-gray-800'
          }`}>
            {displayName || filename}
          </h3>
          {fileInfo && (
            <div className={`text-sm mt-2 space-y-1 ${
              isAccessibilityMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              <p>Размер: {formatFileSize(fileInfo.size)}</p>
              <p>Версия: {fileInfo.version}</p>
              <p>Скачиваний: {fileInfo.downloadCount}</p>
            </div>
          )}
        </div>

        {error && (
          <div className="text-red-500 text-sm bg-red-50 p-2 rounded">
            {error}
          </div>
        )}

        <button
          onClick={handleDownload}
          disabled={loading}
          className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
            loading
              ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
              : isAccessibilityMode
                ? 'bg-white text-black hover:bg-gray-200'
                : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {loading ? 'Получение ссылки...' : 'Скачать файл'}
        </button>

        {fileInfo && (
          <p className={`text-xs ${
            isAccessibilityMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            Файл будет загружен с GitHub. Убедитесь в наличии стабильного интернет-соединения.
          </p>
        )}
      </div>
    </div>
  );
}