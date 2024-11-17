import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  cartItems: any[] = [];

  constructor(
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
  }

  ngOnDestroy(): void {
  }

  getTotalItems(): number {
    return this.cartItems.reduce((total, item) => total + (item.quantity || 0), 0);
  }
}
 