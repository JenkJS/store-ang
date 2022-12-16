import { Component, OnInit } from '@angular/core';

const ROWS_HEIGHT: {[id: number]:number} = {
  1: 400, 3: 335, 4: 350
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit{
  cols=3;
  rowHeight = ROWS_HEIGHT[this.cols]
  category: string | undefined

  constructor() {
  }

  ngOnInit(){
  }

  onColumnsCountChange(colCount: number):void{
    this.cols = colCount;
    this.rowHeight = ROWS_HEIGHT[this.cols]
  }
  onShowCategory(category:string):void{
    this.category = category
  }


}
