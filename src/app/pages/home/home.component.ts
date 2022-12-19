import {Component, OnDestroy, OnInit} from '@angular/core';
import { CartService } from 'src/app/services/cart.service'
import {Product} from "../../models/product.module";
import {Subscription} from "rxjs";
import {StoreService} from "../../services/store.service";

const ROWS_HEIGHT: {[id: number]:number} = {
  1: 400, 3: 335, 4: 350
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit, OnDestroy{
  cols=3;
  rowHeight = ROWS_HEIGHT[this.cols]
  category: string | undefined

  products: Array<Product> | undefined;
  sort='desc';
  countLimit=12;
  productsSubscription: Subscription | undefined;

  constructor(private cartServices: CartService, private storeService: StoreService) {
  }

  ngOnInit(){
    this.getProducts()
  }

  getProducts():void{
    this.productsSubscription =  this.storeService.getAllProducts(this.countLimit,this.sort, this.category).subscribe((_products)=>{
      this.products = _products
    })
  }

  onColumnsCountChange(colCount: number):void{
    this.cols = colCount;
    this.rowHeight = ROWS_HEIGHT[this.cols]
  }
  onShowCategory(category:string):void{
    this.category = category
    this.getProducts()
  }

  onAddToCart(product: Product):void{
    this.cartServices.addToCart({
      product: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id
    })
  }

  onItemsCountChange(count:number):void{
    this.countLimit = count
    this.getProducts()
  }

  onSortChange(desc: string):void{
    this.sort = desc;
    this.getProducts()

  }
  ngOnDestroy() {
    if(this.productsSubscription){
      this.productsSubscription.unsubscribe()
    }
  }

}
