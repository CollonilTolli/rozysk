"use client";

import { useState } from "react";
import { wantedPersons, WantedPerson } from "../lib/wanted-persons";
import Image from "next/image";

interface PersonSearchFormProps {
  isAccessibilityMode?: boolean;
}

interface SearchFormData {
  lastName: string;
  firstName: string;
  middleName: string;
  birthYear: string;
  birthMonth: string;
  birthDay: string;
}

interface SearchResult {
  found: boolean;
  person?: WantedPerson;
  message: string;
}

export default function PersonSearchForm({
  isAccessibilityMode = false,
}: PersonSearchFormProps) {
  const [formData, setFormData] = useState<SearchFormData>({
    lastName: "",
    firstName: "",
    middleName: "",
    birthYear: "1930",
    birthMonth: "Январь",
    birthDay: "1",
  });

  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const months = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];

  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
  const years = Array.from({ length: 94 }, (_, i) => (2024 - i).toString());

  const handleInputChange = (field: keyof SearchFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const formatBirthDate = (
    year: string,
    month: string,
    day: string
  ): string => {
    const monthIndex = months.indexOf(month) + 1;
    return `${day}.${monthIndex}.${year}`;
  };

  const searchPerson = (): SearchResult => {
    const searchBirthDate = formatBirthDate(
      formData.birthYear,
      formData.birthMonth,
      formData.birthDay
    );
    const searchName =
      `${formData.lastName.toUpperCase()} ${formData.firstName.toUpperCase()} ${formData.middleName.toUpperCase()}`.trim();

    const foundPerson = wantedPersons.find((person) => {
      const personNameParts = person.name.split(" ");
      const searchNameParts = searchName.split(" ");

      // Проверяем совпадение имени (хотя бы фамилия и имя)
      const nameMatch =
        searchNameParts.length >= 2 &&
        personNameParts[0] === searchNameParts[0] && // фамилия
        personNameParts[1] === searchNameParts[1]; // имя

      // Проверяем дату рождения
      const birthDateMatch = person.birthDate === searchBirthDate;

      return nameMatch && birthDateMatch;
    });

    if (foundPerson) {
      return {
        found: true,
        person: foundPerson,
        message: "Лицо найдено в базе данных розыска",
      };
    } else {
      return {
        found: false,
        message: "Данное лицо не розыскивается",
      };
    }
  };

  const handleSearch = () => {
    if (!formData.lastName || !formData.firstName) {
      alert("Пожалуйста, заполните обязательные поля");
      return;
    }

    setIsSearching(true);
    setTimeout(() => {
      const result = searchPerson();
      setSearchResult(result);
      setIsSearching(false);
    }, 1000);
  };

  const handleReset = () => {
    setFormData({
      lastName: "",
      firstName: "",
      middleName: "",
      birthYear: "1930",
      birthMonth: "Январь",
      birthDay: "1",
    });
    setSearchResult(null);
  };

  return (
    <div
      className={`max-w-4xl mx-auto p-6 ${
        isAccessibilityMode ? "bg-black text-white" : "bg-white text-gray-900"
      }`}
    >
      <h2
        className={`text-2xl font-bold mb-6 ${
          isAccessibilityMode ? "text-white" : "text-gray-900"
        }`}
      >
        Поиск лица в базе данных «Розыск»*
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Фамилия */}
        <div>
          <label
            className={`block text-sm font-medium mb-2 ${
              isAccessibilityMode ? "text-white" : "text-gray-700"
            }`}
          >
            Фамилия <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => handleInputChange("lastName", e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isAccessibilityMode
                ? "bg-black border-white text-white placeholder-gray-400"
                : "bg-white border-gray-300 text-gray-900"
            }`}
            placeholder="Введите фамилию"
          />
        </div>

        {/* Имя */}
        <div>
          <label
            className={`block text-sm font-medium mb-2 ${
              isAccessibilityMode ? "text-white" : "text-gray-700"
            }`}
          >
            Имя <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => handleInputChange("firstName", e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isAccessibilityMode
                ? "bg-black border-white text-white placeholder-gray-400"
                : "bg-white border-gray-300 text-gray-900"
            }`}
            placeholder="Введите имя"
          />
        </div>

        {/* Отчество */}
        <div>
          <label
            className={`block text-sm font-medium mb-2 ${
              isAccessibilityMode ? "text-white" : "text-gray-700"
            }`}
          >
            Отчество
          </label>
          <input
            type="text"
            value={formData.middleName}
            onChange={(e) => handleInputChange("middleName", e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isAccessibilityMode
                ? "bg-black border-white text-white placeholder-gray-400"
                : "bg-white border-gray-300 text-gray-900"
            }`}
            placeholder="Введите отчество"
          />
        </div>
      </div>

      {/* Дата рождения */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div>
          <label
            className={`block text-sm font-medium mb-2 ${
              isAccessibilityMode ? "text-white" : "text-gray-700"
            }`}
          >
            Год рождения <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.birthYear}
            onChange={(e) => handleInputChange("birthYear", e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isAccessibilityMode
                ? "bg-black border-white text-white"
                : "bg-white border-gray-300 text-gray-900"
            }`}
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            className={`block text-sm font-medium mb-2 ${
              isAccessibilityMode ? "text-white" : "text-gray-700"
            }`}
          >
            Месяц
          </label>
          <select
            value={formData.birthMonth}
            onChange={(e) => handleInputChange("birthMonth", e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isAccessibilityMode
                ? "bg-black border-white text-white"
                : "bg-white border-gray-300 text-gray-900"
            }`}
          >
            {months.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            className={`block text-sm font-medium mb-2 ${
              isAccessibilityMode ? "text-white" : "text-gray-700"
            }`}
          >
            День
          </label>
          <select
            value={formData.birthDay}
            onChange={(e) => handleInputChange("birthDay", e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isAccessibilityMode
                ? "bg-black border-white text-white"
                : "bg-white border-gray-300 text-gray-900"
            }`}
          >
            {days.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Кнопки */}
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-6">
        <button
          onClick={handleSearch}
          disabled={isSearching}
          className={`flex-1 py-3 px-6 rounded-md font-medium transition-colors ${
            isSearching
              ? "bg-gray-400 text-gray-700 cursor-not-allowed"
              : isAccessibilityMode
              ? "bg-white text-black hover:bg-gray-200"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {isSearching ? "Поиск..." : "Искать"}
        </button>
        <button
          onClick={handleReset}
          className={`flex-1 py-3 px-6 rounded-md font-medium border transition-colors ${
            isAccessibilityMode
              ? "border-white text-white hover:bg-gray-800"
              : "border-gray-300 text-gray-700 hover:bg-gray-50"
          }`}
        >
          Сбросить
        </button>
      </div>

      {/* Результат поиска */}
      {searchResult && (
        <div
          className={`mt-8 p-6 rounded-lg border ${
            searchResult.found
              ? isAccessibilityMode
                ? "bg-black border-red-500"
                : "bg-red-50 border-red-200"
              : isAccessibilityMode
              ? "bg-black border-green-500"
              : "bg-green-50 border-green-200"
          }`}
        >
          <h3
            className={`text-lg font-bold mb-4 ${
              searchResult.found
                ? isAccessibilityMode
                  ? "text-red-400"
                  : "text-red-800"
                : isAccessibilityMode
                ? "text-green-400"
                : "text-green-800"
            }`}
          >
            {searchResult.message}
          </h3>

          {searchResult.found && searchResult.person && (
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
                <div className="flex-shrink-0">
                  <Image fill
                    src={searchResult.person.photo}
                    alt={searchResult.person.name}
                    className="w-32 h-40 object-cover rounded border"
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <p
                    className={`font-bold text-lg ${
                      isAccessibilityMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {searchResult.person.name}
                  </p>
                  <p
                    className={
                      isAccessibilityMode ? "text-gray-300" : "text-gray-700"
                    }
                  >
                    <span className="font-medium">Дата рождения:</span>{" "}
                    {searchResult.person.birthDate}
                  </p>
                  <p
                    className={
                      isAccessibilityMode ? "text-gray-300" : "text-gray-700"
                    }
                  >
                    <span className="font-medium">Регион:</span>{" "}
                    {searchResult.person.region}
                  </p>
                  <p
                    className={
                      isAccessibilityMode ? "text-gray-300" : "text-gray-700"
                    }
                  >
                    <span className="font-medium">Причина розыска:</span>{" "}
                    {searchResult.person.reason}
                  </p>
                  <p
                    className={
                      isAccessibilityMode ? "text-gray-300" : "text-gray-700"
                    }
                  >
                    <span className="font-medium">Пол:</span>{" "}
                    {searchResult.person.details.gender}
                  </p>
                  <p
                    className={
                      isAccessibilityMode ? "text-gray-300" : "text-gray-700"
                    }
                  >
                    <span className="font-medium">Национальность:</span>{" "}
                    {searchResult.person.details.nationality}
                  </p>
                  <p
                    className={
                      isAccessibilityMode ? "text-gray-300" : "text-gray-700"
                    }
                  >
                    <span className="font-medium">Место рождения:</span>{" "}
                    {searchResult.person.details.birthPlace}
                  </p>
                </div>
              </div>

              <div
                className={`mt-4 p-4 rounded border ${
                  isAccessibilityMode
                    ? "bg-gray-900 border-gray-600"
                    : "bg-gray-100 border-gray-300"
                }`}
              >
                <p
                  className={`text-sm font-medium mb-2 ${
                    isAccessibilityMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Особые приметы:
                </p>
                <p
                  className={`text-sm ${
                    isAccessibilityMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {searchResult.person.details.specialMarks}
                </p>
              </div>

              <div
                className={`mt-4 p-4 rounded border ${
                  isAccessibilityMode
                    ? "bg-blue-900 border-blue-600"
                    : "bg-blue-100 border-blue-300"
                }`}
              >
                <p
                  className={`font-medium mb-4 ${
                    isAccessibilityMode ? "text-blue-200" : "text-blue-800"
                  }`}
                >
                  Ознакомиться с материалами дела можно в программном
                  обеспечении &apos;розыск-мвд.рус&apos;
                </p>
                <a
                  href="/ROZYSK-Setup.exe"
                  download
                  className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            isAccessibilityMode
              ? "bg-white text-black hover:bg-gray-200"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Скачать программу
                </a>
              </div>
            </div>
          )}

          {!searchResult.found && (
            <div
              className={`mt-4 p-4 rounded border ${
                isAccessibilityMode
                  ? "bg-blue-900 border-blue-600"
                  : "bg-blue-100 border-blue-300"
              }`}
            >
              <p
                className={`font-medium mb-4 ${
                  isAccessibilityMode ? "text-blue-200" : "text-blue-800"
                }`}
              >
                Для работы с полной базой данных используйте программное
                обеспечение &apos;розыск-мвд.рус&apos;
              </p>
              <a
                href="/ROZYSK-Setup.exe"
                download
                className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  isAccessibilityMode
                    ? "bg-white text-black hover:bg-gray-200"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Скачать программу
              </a>
            </div>
          )}
        </div>
      )}

      {/* Примечание */}
      <div className="mt-8">
        <p
          className={`text-sm ${
            isAccessibilityMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          * База содержит информацию только о тех лицах, в отношении которых
          розыск ведется в установленном порядке с использованием СМИ.
        </p>
      </div>
    </div>
  );
}
