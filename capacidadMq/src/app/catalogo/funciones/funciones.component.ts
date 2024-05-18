import { Component} from '@angular/core';
import {CurrencyPipe} from '@angular/common';
import {MatTableModule} from '@angular/material/table';

export interface Transaction {
  item: string;
  cost: number;
}

@Component({
  selector: 'app-funciones',
  templateUrl: './funciones.component.html',
  styleUrl: './funciones.component.css',
  standalone: true,
  imports: [MatTableModule, CurrencyPipe],
})
export class FuncionesComponent {

  displayedColumns = ['item', 'cost'];
  transactions: Transaction[] = [
    {item: 'Beach ball', cost: 4},
    {item: 'Towel', cost: 10},
    {item: 'Frisbee', cost: 2},
    {item: 'Sunscreen', cost: 4},
    {item: 'Cooler', cost: 25},
    {item: 'Swim suit', cost: 15},
    {item: 'Beach ball', cost: 4},
    {item: 'Towel', cost: 10},
    {item: 'Frisbee', cost: 2},
    {item: 'Sunscreen', cost: 4},
    {item: 'Cooler', cost: 25},
    {item: 'Swim suit', cost: 15},
    {item: 'Beach ball', cost: 4},
    {item: 'Towel', cost: 10},
    {item: 'Frisbee', cost: 2},
    {item: 'Sunscreen', cost: 4},
    {item: 'Cooler', cost: 25},
    {item: 'Swim suit', cost: 15},
    {item: 'Beach ball', cost: 4},
    {item: 'Towel', cost: 10},
    {item: 'Frisbee', cost: 2},
    {item: 'Sunscreen', cost: 4},
    {item: 'Cooler', cost: 25},
    {item: 'Swim suit', cost: 15},
    {item: 'Beach ball', cost: 4},
    {item: 'Towel', cost: 10},
    {item: 'Frisbee', cost: 2},
    {item: 'Sunscreen', cost: 4},
    {item: 'Cooler', cost: 25},
    {item: 'Swim suit', cost: 15},
    {item: 'Beach ball', cost: 4},
    {item: 'Towel', cost: 10},
    {item: 'Frisbee', cost: 2},
    {item: 'Sunscreen', cost: 4},
    {item: 'Cooler', cost: 25},
    {item: 'Swim suit', cost: 15},
  ];

  /** Gets the total cost of all transactions. */
  getTotalCost() {
    return this.transactions.map(t => t.cost).reduce((acc, value) => acc + value, 0);
  }

}
