import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface BlogPost {
    id: bigint;
    title: string;
    date: string;
    author: string;
    excerpt: string;
    category: string;
}
export type Time = bigint;
export interface ContactSubmission {
    name: string;
    email: string;
    message: string;
    timestamp: Time;
    phone: string;
}
export interface Product {
    id: bigint;
    name: string;
    description: string;
    category: Category;
    rating: number;
    price: number;
    reviewCount: bigint;
}
export enum Category {
    accessories = "accessories",
    suspension = "suspension",
    brake = "brake",
    electrical = "electrical",
    engine = "engine"
}
export interface backendInterface {
    getAllBlogPosts(): Promise<Array<BlogPost>>;
    getAllContactSubmissions(): Promise<Array<ContactSubmission>>;
    getAllProducts(): Promise<Array<Product>>;
    getBlogPostsByAuthor(author: string): Promise<Array<BlogPost>>;
    getBlogPostsByCategory(category: string): Promise<Array<BlogPost>>;
    getProductsByCategory(category: Category): Promise<Array<Product>>;
    submitContactForm(name: string, email: string, phone: string, message: string): Promise<void>;
}
