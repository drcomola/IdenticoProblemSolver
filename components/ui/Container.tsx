import { type ElementType, type ReactNode } from "react";

/** Constrained, generously-padded content column used across all sections. */
export function Container({
  as: Tag = "div",
  className = "",
  children,
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}) {
  return <Tag className={`container-px ${className}`}>{children}</Tag>;
}
