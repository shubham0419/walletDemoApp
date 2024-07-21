import React from "react";

export function Card({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}): JSX.Element {
  return (
    <div
      className="border p-6 bg-white rounded-xl bg-[#ededed]"
    >
      <h1 className="text-xl shadow-md pb-2 border-rounded-lg ps-2">
        {title}
      </h1>
      <p>{children}</p>
    </div>
  );
}
