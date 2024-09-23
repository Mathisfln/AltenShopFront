import { Injectable, inject, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, catchError, map, Observable, of, tap } from "rxjs";
import { Cart } from "./cart.model";


@Injectable({
    providedIn: "root"
}) export class CartService {
    private apiUrl = 'https://localhost:5001/api/cart'; // URL API

    private cartSubject = new BehaviorSubject<Cart | null>(null);
    public cart$ = this.cartSubject.asObservable();

    constructor(private http: HttpClient) { }
  
    // GET -> Contenu du panier 'product/cart'
    get(): void {
      this.http.get<Cart>(this.apiUrl).subscribe(cart => {
        this.cartSubject.next(cart);  // Mise à jour de l'état du panier
      });
    }

    getCartItemCount(): Observable<number> {
      return this.cart$.pipe(
        map(cart => cart?.items.length || 0) // nombre d'articles dans le panier avec la longueur du tableau
      );
    }

    getTotalCost(): Observable<number> { // Prix total des articles ds le panier
      return this.cart$.pipe(
        map(cart => cart?.items.reduce((total, item) => total + item.price, 0) || 0)
      );
    }
  
    // POST -> ajt au panier "product/add/id"
    add(productId: number): void {
      this.http.post<void>(`${this.apiUrl}/add?productId=${productId}`, {}).subscribe(() => {
        this.get();  // Rafraîchir le panier après l'ajout
      });
    }
  
    // DELETE -> supp du panier 'product/delete/id'
    remove(productId: number): void {
      this.http.delete<void>(`${this.apiUrl}/remove/${productId}`).subscribe(() => {
        this.get();  // Rafraîchir le panier après la suppression
      });
    }
  
   
}