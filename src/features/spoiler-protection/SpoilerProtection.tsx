import { ChildrenProp } from "@/types/utils.types";
import { createContext, useState } from "react";
  
export const SpoilerProtectionContext = createContext({
    showingSpoilers: false,
    toggleSpoilers: () => {},
});

const SpoilerProtectionProvider = ({ children }: ChildrenProp) => {
    
    const [spoilerProtection, setShowingSpoilers] = useState(true);

    const toggleSpoilers = () => setShowingSpoilers((prev) => !prev);

    return <SpoilerProtectionContext.Provider value={{
        showingSpoilers: spoilerProtection,
        toggleSpoilers
    }}>
        {children}
    </SpoilerProtectionContext.Provider>
}

export default SpoilerProtectionProvider