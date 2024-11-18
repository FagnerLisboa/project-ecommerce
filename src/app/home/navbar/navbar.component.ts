import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { CartService } from 'src/app/services/cart.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  cartItems: any[] = [];
  cartSubscription!: Subscription;
  searchTerm: string = '';

  constructor(
    private cartService: CartService,
    private searchService: SearchService
  ) { }

  ngOnInit(): void {
    this.cartSubscription = this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
    });
  }

  onSearch(): void {
    this.searchService.setSearchTerm(this.searchTerm);
  }
  

  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  getTotalItems(): number {
    return this.cartItems.reduce((total, item) => total + (item.quantity || 0), 0);
  }
}
