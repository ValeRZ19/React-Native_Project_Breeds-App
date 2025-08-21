import { SearchContextType } from "@/interfaces/context.interface";
import { createContext, PropsWithChildren, useContext, useState } from "react";

const SearchContext = createContext<SearchContextType | null>(null);

export const useSearchContext= ():SearchContextType =>{
    const context = useContext(SearchContext);
    if(!context) throw new Error ('The authentication context cannot be accessed outside the provider')
    return context;
}

export const SearchProvider = ({children}:PropsWithChildren) =>{
    //States
    const [searchBreed, setSearchBreed] = useState<string>('');

    return (
        <SearchContext.Provider value={{
            searchBreed,
            setSearchBreed
        }}>
            {children}
        </SearchContext.Provider>
    )
}