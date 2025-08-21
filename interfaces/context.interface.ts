
export interface AuthContextType{
    user: User | null;
    loading: boolean;
    login:(username:string, password:string)=>Promise<boolean>;
    logout:()=>void;
}

export interface User {
    id:number;
    userName:string;
    password?:string;
};

export interface SearchContextType{
    searchBreed:string;
    setSearchBreed:(breed:string)=> void;
}