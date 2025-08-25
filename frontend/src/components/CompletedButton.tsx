import type { ReactNode } from "react";
import { baseButton } from "../styles/button";

interface CompletedButtonProps {
  active: boolean;
  onClick: () => void;
  children?: ReactNode;
}

export default function CompletedButton({ active, onClick, children }: CompletedButtonProps) {
  return (<button type="button" className={active ? "bg-green-500 rounded-md w-full" : "bg-gray-700 " + baseButton } onClick={onClick}>{children}</button>);
}
