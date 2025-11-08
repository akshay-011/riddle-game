"use client";

import type { ReactNode, MouseEventHandler } from "react";

type Props = {
  children?: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export default function Button({ children, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="mt-8 px-4 py-2 text-white bg-blue-500 rounded"
    >
      {children}
    </button>
  );
}
