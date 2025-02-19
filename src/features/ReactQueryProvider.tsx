import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

type ReactQueryProviderProps = { children: ReactNode }
const ReactQueryProvider = ({ children }: ReactQueryProviderProps) => {
    
    const client = new QueryClient({defaultOptions: {
        queries: { refetchOnWindowFocus: false }
    }})

    return <QueryClientProvider client={client}>
        {children}
    </QueryClientProvider> 
}

export default ReactQueryProvider