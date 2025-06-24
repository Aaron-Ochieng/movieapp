"use client";
import { useRouter } from "next/navigation";

export default function Back() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full inline-flex items-center transition-colors duration-200"
    >
      <svg
        className="w-4 h-4 mr-2"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M10 19l-7-7m0 0l7-7m-7 7h18"
        ></path>
      </svg>
      Back
    </button>
  );
}
