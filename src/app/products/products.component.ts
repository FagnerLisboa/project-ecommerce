import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../services/product.service';
import { SearchService } from '../services/search.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  searchTerm: string = '';
  searchSubscription!: Subscription;
  isLoading: boolean = true;

  constructor(
    private productService: ProductService,
    public searchService: SearchService 
  ) {}

  ngOnInit(): void {
    this.isLoading = true; 
    this.productService.getProducts().subscribe((data: any) => {
      this.products = data;
      this.filteredProducts = data;
      console.log('Produtos carregados:', this.products);
  
      if (this.searchService.currentSearchTerm) {
        this.filterProducts(this.searchService.currentSearchTerm);
      }
  
      this.isLoading = false; 
    });
  
    this.searchSubscription = this.searchService.searchTerm$.subscribe((term: string) => {
      if (this.products.length > 0) {
        this.filterProducts(term);
      } else {
        console.log('Produtos ainda não carregados. Ignorando filtro.');
      }
    });
  }
  

  filterProducts(searchTerm: string): void {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    this.filteredProducts = this.products.filter(product => {
      const title = product.title ? product.title.toLowerCase() : '';
      const description = product.description ? product.description.toLowerCase() : '';
      return title.includes(lowerCaseSearchTerm) || description.includes(lowerCaseSearchTerm);
    });
    console.log('Produtos filtrados:', this.filteredProducts);
  }

  ngOnDestroy(): void {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }
}