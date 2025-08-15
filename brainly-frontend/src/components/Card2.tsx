import type { ReactElement } from "react";

interface CardProps {
  title: string;
  description: string;
  logo: ReactElement;
}

export function Card2({ title, description, logo }: CardProps) {
  return (
    <div className="max-w-sm w-full transform transition-transform duration-300 hover:scale-105">
      <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:shadow-2xl transition duration-300 ease-in-out h-full flex flex-col items-center text-center">
        <div className="mb-4 text-5xl text-purple-600">{logo}</div>
        <h3 className="text-2xl font-bold mb-4">{title}</h3>
        <p className="text-gray-600 text-lg">{description}</p>
      </div>
    </div>
  );
}
