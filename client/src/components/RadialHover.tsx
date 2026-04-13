import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

export default function RadialHover({ children, className = "" }: Props) {
  return (
    <div
      className={className}
      style={{ position: "relative", display: "inline-block" }}
    >
      {/* Base Layer */}
      <div>{children}</div>
    </div>
  );
}
