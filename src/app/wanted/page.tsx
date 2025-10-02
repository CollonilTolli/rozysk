import Link from "next/link";

export default function WantedPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-blue-900 text-white">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">МВД</span>
              </div>
              <div>
                <h1 className="text-xl font-bold">МИНИСТЕРСТВО ВНУТРЕННИХ ДЕЛ</h1>
                <p className="text-sm opacity-90">РОССИЙСКОЙ ФЕДЕРАЦИИ</p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-6">
              <Link href="/" className="hover:text-blue-200">Главная</Link>
              <Link href="/wanted" className="hover:text-blue-200 text-blue-200">Розыск</Link>
              <Link href="/contacts" className="hover:text-blue-200">Контакты</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-red-600 mb-4">Внимание, розыск!</h1>
          <p className="text-lg text-gray-700 mb-6">
            Сведения о лицах, находящихся в розыске, размещаются на интернет-ресурсе МВД России 
            и удаляются по решению следственных органов, органов дознания и судебных органов.
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-bold mb-4">Поиск в базе розыска</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <input 
              type="text" 
              placeholder="Фамилия" 
              className="border border-gray-300 rounded px-3 py-2"
            />
            <input 
              type="text" 
              placeholder="Имя" 
              className="border border-gray-300 rounded px-3 py-2"
            />
            <input 
              type="text" 
              placeholder="Отчество" 
              className="border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
            Найти
          </button>
        </div>

        {/* Wanted Categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-red-50 border border-red-200 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-red-600 mb-3">Особо опасные преступники</h3>
            <p className="text-gray-800 mb-4">
              Лица, совершившие тяжкие и особо тяжкие преступления против личности.
            </p>
            <button className="text-red-600 hover:text-red-800 font-semibold">
              Просмотреть список →
            </button>
          </div>

          <div className="bg-orange-50 border border-orange-200 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-orange-600 mb-3">Пропавшие без вести</h3>
            <p className="text-gray-700 mb-4">
              Граждане, местонахождение которых неизвестно.
            </p>
            <button className="text-orange-600 hover:text-orange-800 font-semibold">
              Просмотреть список →
            </button>
          </div>

          <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-blue-600 mb-3">Международный розыск</h3>
            <p className="text-gray-700 mb-4">
              Лица, объявленные в международный розыск через Интерпол.
            </p>
            <button className="text-blue-600 hover:text-blue-800 font-semibold">
              Просмотреть список →
            </button>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded">
          <h3 className="text-xl font-bold mb-4 text-yellow-800">
            Информация для граждан
          </h3>
          <p className="text-gray-700 mb-4">
            Если у вас есть информация о местонахождении разыскиваемых лиц, 
            просим обращаться в ближайшее отделение полиции или по телефонам:
          </p>
          <ul className="list-disc list-inside text-gray-800 space-y-1">
            <li>102 - единый номер вызова полиции</li>
            <li>8-800-333-44-88 - горячая линия МВД России</li>
            <li>Дежурная часть вашего территориального органа МВД</li>
          </ul>
          <p className="text-sm text-gray-800 mt-4">
            Конфиденциальность гарантируется. За содействие в раскрытии особо тяжких преступлений 
            предусмотрено вознаграждение.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-bold mb-4">Контактная информация</h4>
              <p>Телефон экстренных служб: 102</p>
              <p>Официальный сайт: мвд.рф</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Полезные ссылки</h4>
              <ul className="space-y-2">
                <li><Link href="/" className="hover:text-gray-300">Главная</Link></li>
                <li><Link href="/wanted" className="hover:text-gray-300">Розыск</Link></li>
                <li><Link href="/contacts" className="hover:text-gray-300">Контакты</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Правовая информация</h4>
              <p className="text-sm text-gray-400">
                © 2024 Министерство внутренних дел Российской Федерации
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}