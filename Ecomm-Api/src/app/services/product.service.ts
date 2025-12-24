import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private http = inject(HttpClient);
    private apiUrl = 'https://fakestoreapi.com/products';

    // Watchlist stored in memory (can be extended to localStorage or API)
    private watchlistItems = signal<Product[]>([]);
    readonly watchlist = this.watchlistItems.asReadonly();

    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(this.apiUrl);
    }

    getProductById(id: number): Observable<Product> {
        return this.http.get<Product>(`${this.apiUrl}/${id}`);
    }

    getCategories(): Observable<string[]> {
        return this.http.get<string[]>(`${this.apiUrl}/categories`);
    }

    getProductsByCategory(category: string): Observable<Product[]> {
        return this.http.get<Product[]>(`${this.apiUrl}/category/${category}`);
    }

    addToWatchlist(product: Product): void {
        const current = this.watchlistItems();
        if (!current.find(p => p.id === product.id)) {
            this.watchlistItems.set([...current, product]);
        }
    }

    removeFromWatchlist(productId: number): void {
        this.watchlistItems.update(items => items.filter(p => p.id !== productId));
    }

    isInWatchlist(productId: number): boolean {
        return this.watchlistItems().some(p => p.id === productId);
    }

    buyProduct(product: Product): void {
        // Placeholder for buy logic - can integrate with cart/checkout
        console.log('Buying product:', product);
        alert(`Added "${product.title}" to cart!`);
    }
}
