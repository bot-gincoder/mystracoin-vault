import { useState, useEffect } from "react";

export function useBalanceHidden() {
  const [isHidden, setIsHidden] = useState(() => {
    const saved = localStorage.getItem("mystracoin_balance_hidden");
    return saved === "true";
  });

  useEffect(() => {
    localStorage.setItem("mystracoin_balance_hidden", isHidden.toString());
  }, [isHidden]);

  const toggle = () => setIsHidden(prev => !prev);

  return { isHidden, toggle };
}