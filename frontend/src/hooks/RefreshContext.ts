import { createContext } from "react";

interface RefreshContextType {
  refreshFlag: number;
  triggerRefresh: () => void;
}
export const RefreshContext = createContext<RefreshContextType | undefined>(undefined);
