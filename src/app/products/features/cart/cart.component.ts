import { CommonModule } from "@angular/common";
import { Component, OnInit, inject, signal } from "@angular/core";
import { Product } from "app/products/data-access/product.model";
import { CartService } from "app/products/data-access/cart.service";
import { ProductFormComponent } from "app/products/ui/product-form/product-form.component";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { Cart } from "app/products/data-access/cart.model";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [DataViewModule, CardModule, ButtonModule, DialogModule, ProductFormComponent, CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  private readonly cartService = inject(CartService);
  cart: Cart | null = null;  
  itemCount: number = 0;
  totalCost: number = 0;

  ngOnInit() {
    this.cartService.cart$.subscribe((cart: Cart | null) => {
      this.cart = cart; 
    });
    this.cartService.get();

    this.cartService.getCartItemCount().subscribe(count => {
      this.itemCount = count;
    });  

    this.cartService.getTotalCost().subscribe(cost => {
      this.totalCost = cost;
    });
  }

  public removeProductToCart(product: Product) {
    this.cartService.remove(product.id)
    console.log(product.name + " removed from cart ")
  }

}
