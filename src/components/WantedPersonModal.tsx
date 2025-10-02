"use client";

import React from "react";
import { WantedPerson } from "@/lib/wanted-persons";
import Image from "next/image";

interface WantedPersonModalProps {
  person: WantedPerson;
  onClose: () => void;
  isAccessibilityMode?: boolean;
}

const WantedPersonModal: React.FC<WantedPersonModalProps> = ({
  person,
  onClose,
  isAccessibilityMode = false,
}) => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center p-4 z-50"
      style={{
        backgroundColor: isAccessibilityMode
          ? "rgba(0, 0, 0, 0.7)"
          : "rgba(37, 99, 235, 0.7)",
      }}
    >
      <div
        className={`${
          isAccessibilityMode ? "bg-black border-2 border-white" : "bg-white"
        } rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto`}
      >
        {/* Header */}
        <div
          className={`${
            isAccessibilityMode
              ? "bg-black border-b-2 border-white"
              : "bg-blue-600"
          } text-white p-4 rounded-t-lg relative`}
        >
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-white hover:text-gray-200 text-xl font-bold w-8 h-8 flex items-center justify-center"
          >
            ×
          </button>
          <h2 className="text-lg font-bold pr-8">Внимание розыск!</h2>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3
            className={`font-bold mb-4 text-center ${
              isAccessibilityMode ? "text-white" : "text-gray-900"
            }`}
          >
            {person.name}
          </h3>

          {/* Photo */}
          <div className="flex justify-center mb-4">
            <div
              className={`w-32 h-40 border ${
                isAccessibilityMode
                  ? "bg-gray-800 border-white"
                  : "bg-gray-200 border-gray-300"
              }`}
            >
              {person.photo ? (
                <Image
                  width={126}
                  height={158}
                  src={person.photo}
                  alt={person.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src =
                      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDE1MCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNTAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxjaXJjbGUgY3g9Ijc1IiBjeT0iNjAiIHI9IjI1IiBmaWxsPSIjOUI5QjlCIi8+CjxwYXRoIGQ9Ik00NSAxNDBDNDUgMTIwIDU3IDEwNSA3NSAxMDVDOTMgMTA1IDEwNSAxMjAgMTA1IDE0MFYyMDBINDVWMTQwWiIgZmlsbD0iIzlCOUI5QiIvPgo8L3N2Zz4K";
                  }}
                />
              ) : (
                <Image
                  width={126}
                  height={158}
                  src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDE1MCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNTAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxjaXJjbGUgY3g9Ijc1IiBjeT0iNjAiIHI9IjI1IiBmaWxsPSIjOUI5QjlCIi8+CjxwYXRoIGQ9Ik00NSAxNDBDNDUgMTIwIDU3IDEwNSA3NSAxMDVDOTMgMTA1IDEwNSAxMjAgMTA1IDE0MFYyMDBINDVWMTQwWiIgZmlsbD0iIzlCOUI5QiIvPgo8L3N2Zz4K"
                  alt={person.name}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </div>

          {/* Information */}
          <div
            className={`space-y-3 text-sm ${
              isAccessibilityMode ? "text-white" : "text-gray-900"
            }`}
          >
            <div>
              <span className="font-semibold">Дата рождения:</span>{" "}
              {person.birthDate}
            </div>

            <div>
              <span className="font-semibold">Регион розыска:</span>{" "}
              {person.region}
            </div>

            <div>
              <span className="font-semibold">Основание для розыска:</span>{" "}
              {person.reason}
            </div>

            <div
              className={`border-t pt-3 mt-4 ${
                isAccessibilityMode ? "border-white" : ""
              }`}
            >
              <h4 className="font-semibold mb-2">Установочные данные:</h4>

              <div className="space-y-2">
                <div>
                  <span className="font-medium">Пол:</span>{" "}
                  {person.details.gender}
                </div>

                <div>
                  <span className="font-medium">Национальность:</span>{" "}
                  {person.details.nationality}
                </div>

                <div>
                  <span className="font-medium">Дата рождения:</span>{" "}
                  {person.birthDate}
                </div>

                <div>
                  <span className="font-medium">Место рождения:</span>{" "}
                  {person.details.birthPlace}
                </div>

                <div>
                  <span className="font-medium">Особые приметы:</span>{" "}
                  {person.details.specialMarks}
                </div>
              </div>
            </div>

            <div
              className={`border-t pt-3 mt-4 ${
                isAccessibilityMode ? "border-white" : ""
              }`}
            >
              <h4 className="font-semibold mb-2">Контактная информация:</h4>
              <div>{person.details.contactInfo}</div>
            </div>
          </div>

          {/* Footer with download link */}
          <div
            className={`px-6 py-4 ${
              isAccessibilityMode
                ? "bg-black border-white"
                : "bg-gray-50 border-gray-200"
            } border-t rounded-b-lg`}
          >
            <p
              className={`text-sm text-center ${
                isAccessibilityMode ? "text-white" : "text-gray-600"
              }`}
            >
              Ознакомиться с материалами дела можно в программном обеспечении{" "}
              <span className="font-semibold">&apos;розыск-мвд.рус&apos;</span>
            </p>
            <div className="mt-2 text-center">
              <a
                href="/ROZYSK-Setup.exe"
                download
                className={`inline-flex items-center px-4 py-2 text-white text-sm font-medium rounded-md transition-colors ${
                  isAccessibilityMode
                    ? "bg-white text-black hover:bg-gray-200"
                    : "bg-blue-600 hover:bg-blue-700"
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
        </div>
      </div>
    </div>
  );
};

export default WantedPersonModal;
