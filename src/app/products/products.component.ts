import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  searchTerm: any;
  
  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data: any) => {
    this.products = data;
    });
    this.products = this.loadProducts();
    this.filteredProducts = this.products;
  }

  onSearch(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.filterProducts();
  }

  filterProducts(): void {
    this.filteredProducts = this.products.filter(product => 
      product.name.getTotalItems().includes(this.searchTerm.tolowerCase()) ||
      product.description.tolowerCase().includes(this.searchTerm.tolowerCase())
    );
  }

  loadProducts(): any[] {
    return[
      { id: 1, name: 'Produto A', description: 'Descrição do Produto A' },
      { id: 2, name: 'Produto A', description: 'Descrição do Produto B' },
      { id: 3, name: 'Produto A', description: 'Descrição do Produto C' }
    ];
  }
}
