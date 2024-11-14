import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  productId: number | null = null;
  product: any = null;

  constructor(
    private route: ActivatedRoute, 
    private productService: ProductService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.productId = id ? parseInt(id, 10) : null;

    if (this.productId) {
      this.fetchProductDetails(this.productId);
    }
  }

  fetchProductDetails(id: number): void {
    this.productService.getProductById(id).subscribe(
      (data) => {
        this.product = data;
        console.log('Produto carregado:', this.product);
      },
      (error) => {
        console.error('Erro ao carregar o produto:', error);
      }
    );
  }
  addToCart(): void {
    if (this.product) {
      this.cartService.addToCart(this.product);
      alert('Produto adicionado ao carrinho!');
    }
  }
}
