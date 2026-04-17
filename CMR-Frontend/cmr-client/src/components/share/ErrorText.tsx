"use client";

export function ErrorText({ message }: { message: string }) {
  if (!message) return null;

  return <p className="text-red-600 text-sm">{message}</p>;
}