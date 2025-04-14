export interface Paginable<T> {
    items: T[]; 
    page: number;
    totalPages: number; 
}