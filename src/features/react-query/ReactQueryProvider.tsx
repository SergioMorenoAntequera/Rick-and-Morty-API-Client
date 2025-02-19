import { ChildrenProp } from "@/types/utils.types";
import { QueryClient, QueryClientProvider } from "react-query";

const ReactQueryProvider = ({ children }: ChildrenProp) => {
    
    const client = new QueryClient({defaultOptions: {
        queries: { refetchOnWindowFocus: false }
    }})

    return <QueryClientProvider client={client}>
        {children}
    </QueryClientProvider> 
}

export default ReactQueryProvider