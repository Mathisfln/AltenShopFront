import {
  Component,
  OnInit,
} from "@angular/core";
import { RouterModule } from "@angular/router";
import { SplitterModule } from 'primeng/splitter';
import { ToolbarModule } from 'primeng/toolbar';
import { PanelMenuComponent } from "./shared/ui/panel-menu/panel-menu.component";
import { BehaviorSubject, map, Observable } from "rxjs";
import { Cart } from "./products/data-access/cart.model";
import { CartService } from "./products/data-access/cart.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  standalone: true,
  imports: [RouterModule, SplitterModule, ToolbarModule, PanelMenuComponent],
})
export class AppComponent implements OnInit{
  itemCount: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {

    this.cartService.getCartItemCount().subscribe(count => {
      this.itemCount = count;
    });

    this.cartService.get();
  }


  title = "ALTEN SHOP";


}
