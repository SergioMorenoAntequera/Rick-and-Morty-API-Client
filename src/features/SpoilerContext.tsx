import { createContext, useState } from "react";

type SpoilerContextType = {
    spoilerProtection: boolean;
    toggleSpoilers: () => void;
}
  
export const SpoilerContext = createContext<SpoilerContextType>({
    spoilerProtection: false,
    toggleSpoilers: () => {},
});
  
export const useSpoilerContext = (): SpoilerContextType => {
    const [spoilerProtection, setShowingSpoilers] = useState(true);

    const toggleSpoilers = () => {
        setShowingSpoilers((prev) => !prev);
    };

  return {spoilerProtection, toggleSpoilers}
}