import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<any[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  getCartItems(): any[] {
    return this.cartItemsSubject.value;
  }

  addToCart(item: any): void {
    const currentCartItems = this.cartItemsSubject.value;
    const existingItem = currentCartItems.find(cartItem => cartItem.id === item.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      currentCartItems.push({ ...item, quantity: 1 });
    }
    this.cartItemsSubject.next(currentCartItems); // Atualiza o estado
  }

  removeFromCart(itemId: number): void {
    const updatedCartItems = this.cartItemsSubject.value.filter(item => item.id !== itemId);
    this.cartItemsSubject.next(updatedCartItems);
  }

  clearCart(): void {
    this.cartItemsSubject.next([]);
  }

  getTotalItems(): number {
    return this.cartItemsSubject.value.reduce((total, item) => total + (item.quantity || 0), 0);
  }
}