import { useCallback, useState } from "react";

type InputType = "password" | "text";

export function usePasswordToggle(initialType: InputType = "password") {
  const [inputType, setInputType] = useState<InputType>(initialType);

  const toggle = useCallback(() => {
    setInputType((current) => (current === "password" ? "text" : "password"));
  }, []);

  return [inputType, toggle] as const;
}
