// Sample hook
import { useState } from "react";
export function useSampleHook() {
  const [value, setValue] = useState("sample");
  return { value, setValue };
}
