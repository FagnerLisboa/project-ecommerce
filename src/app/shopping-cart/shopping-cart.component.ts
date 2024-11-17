import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  cartItems: any[] = [];

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
  }

  removeFromCart(productId: number): void {
    this.cartService.removeFromCart(productId);
    this.cartItems = this.cartService.getCartItems();
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.cartItems = [];
  }

  getTotalItems(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  increaseQuantity(item: any): void {
    item.quantity += 1;
  }

  decreaseQuantity(item: any): void {
    if (item.quantity > 1) {
      item.quantity -= 1;
    }
  }

  updateCart(): void {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  buyItems(): void {
    if (this.cartItems.length === 0) {
      alert('O carrinho está vazio.');
    } else {
      alert('Compra realizada com sucesso!');
      this.clearCart();
    }
  }

  getTotalItens(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity)
  } 
}