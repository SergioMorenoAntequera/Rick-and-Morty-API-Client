import { createContext, ReactNode, useState } from "react";
  
export const SpoilerProtectionContext = createContext({
    spoilerProtection: false,
    toggleSpoilers: () => {},
});

type SpoilerProtectionProviderProps = { children: ReactNode }
const SpoilerProtectionProvider = ({ children }: SpoilerProtectionProviderProps) => {
    
    const [spoilerProtection, setShowingSpoilers] = useState(true);

    const toggleSpoilers = () => setShowingSpoilers((prev) => !prev);

    return <SpoilerProtectionContext.Provider value={{
        spoilerProtection,
        toggleSpoilers
    }}>
        {children}
    </SpoilerProtectionContext.Provider>
}

export default SpoilerProtectionProvider