import { useState, type ReactNode } from "react";
import { RefreshContext } from "./RefreshContext";


export default function RefreshProvider({children}: {children: ReactNode}) {
  const [refreshFlag, setRefreshFlag] = useState(0);
  function triggerRefresh() {
    setRefreshFlag(prev => prev + 1);
  }

  return (
    <RefreshContext.Provider value={{refreshFlag, triggerRefresh}}>
      {children}
    </RefreshContext.Provider>
  );
}
