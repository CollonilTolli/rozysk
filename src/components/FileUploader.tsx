'use client';

import { useState } from 'react';

interface UploadResult {
  message: string;
  filename: string;
  size: number;
  url: string;
  path: string;
}

export default function FileUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<UploadResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (!selectedFile.name.endsWith('.exe')) {
        setError('Разрешены только .exe файлы');
        return;
      }
      if (selectedFile.size > 100 * 1024 * 1024) {
        setError('Файл слишком большой. Максимальный размер: 100MB');
        return;
      }
      setFile(selectedFile);
      setError(null);
      setResult(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setError(null);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload-exe', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Ошибка загрузки');
      }

      const result = await response.json();
      setResult(result);
      setFile(null);
      
      // Сбрасываем input
      const fileInput = document.getElementById('file-input') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        Загрузка exe файлов
      </h2>
      
      <div className="mb-4">
        <input
          id="file-input"
          type="file"
          accept=".exe"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        <p className="text-xs text-gray-500 mt-1">
          Максимальный размер: 100MB. Только .exe файлы.
        </p>
      </div>

      {file && (
        <div className="mb-4 p-3 bg-gray-50 rounded">
          <p className="text-sm text-gray-700">
            <strong>Выбранный файл:</strong> {file.name}
          </p>
          <p className="text-sm text-gray-500">
            Размер: {(file.size / 1024 / 1024).toFixed(2)} MB
          </p>
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={!file || uploading}
        className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {uploading ? 'Загрузка...' : 'Загрузить файл'}
      </button>

      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {result && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded">
          <p className="text-green-700 text-sm font-semibold">
            ✅ {result.message}
          </p>
          <div className="mt-2 text-xs text-gray-600">
            <p><strong>Файл:</strong> {result.filename}</p>
            <p><strong>Размер:</strong> {(result.size / 1024 / 1024).toFixed(2)} MB</p>
            <p><strong>URL:</strong> <a href={result.url} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">{result.url}</a></p>
          </div>
        </div>
      )}
    </div>
  );
}