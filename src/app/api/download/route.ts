import { NextRequest, NextResponse } from 'next/server';

// Конфигурация GitHub репозитория
const GITHUB_OWNER = 'CollonilTolli'; // Ваш GitHub username
const GITHUB_REPO = 'rozysk'; // Название вашего репозитория
const GITHUB_TOKEN = process.env.GITHUB_TOKEN; // Добавьте в .env.local

interface GitHubAsset {
  name: string;
  browser_download_url: string;
  size: number;
  download_count: number;
}

interface GitHubRelease {
  tag_name: string;
  name: string;
  assets: GitHubAsset[];
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('filename');

    if (!filename) {
      return NextResponse.json(
        { error: 'Параметр filename обязателен' },
        { status: 400 }
      );
    }

    // Получаем последний релиз
    const releaseResponse = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/releases/latest`,
      {
        headers: {
          'Authorization': `token ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'Prank-App'
        }
      }
    );

    if (!releaseResponse.ok) {
      console.error('GitHub API error:', await releaseResponse.text());
      return NextResponse.json(
        { error: 'Не удалось получить информацию о файлах' },
        { status: 500 }
      );
    }

    const release: GitHubRelease = await releaseResponse.json();
    
    // Ищем нужный файл среди assets
    const asset = release.assets.find(asset => asset.name === filename);

    if (!asset) {
      return NextResponse.json(
        { error: `Файл ${filename} не найден` },
        { status: 404 }
      );
    }

    // Возвращаем информацию о файле
    return NextResponse.json({
      filename: asset.name,
      downloadUrl: asset.browser_download_url,
      size: asset.size,
      downloadCount: asset.download_count,
      version: release.tag_name
    });

  } catch (error) {
    console.error('Ошибка при получении файла:', error);
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
}

// Получить список всех доступных файлов
export async function POST() {
  try {
    const releaseResponse = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/releases/latest`,
      {
        headers: {
          'Authorization': `token ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'Prank-App'
        }
      }
    );

    if (!releaseResponse.ok) {
      return NextResponse.json(
        { error: 'Не удалось получить список файлов' },
        { status: 500 }
      );
    }

    const release: GitHubRelease = await releaseResponse.json();
    
    const files = release.assets.map(asset => ({
      filename: asset.name,
      size: asset.size,
      downloadCount: asset.download_count,
      downloadUrl: asset.browser_download_url
    }));

    return NextResponse.json({
      version: release.tag_name,
      files
    });

  } catch (error) {
    console.error('Ошибка при получении списка файлов:', error);
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
}