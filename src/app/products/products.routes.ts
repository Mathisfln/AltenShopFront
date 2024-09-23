import {  Routes } from "@angular/router";
import { ProductListComponent } from "./features/product-list/product-list.component";
import { CartComponent } from "app/products/features/cart/cart.component";

export const PRODUCTS_ROUTES: Routes = [
	{
		path: "list",
		component: ProductListComponent,
	},
	{
		path: "cart",
		component: CartComponent,
	},
	{ path: "**", redirectTo: "list" },

];
