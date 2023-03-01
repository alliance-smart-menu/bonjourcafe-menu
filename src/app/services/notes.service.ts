import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from "../../environments/environment";
import { MenuService } from './menu.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  public pennding: boolean = false

  notes: any[] = []
  total_price: number | undefined


  constructor(
    public menuService: MenuService,
    private _snackBar: MatSnackBar
  ) { }

  notesAdd(position: any) {
    this.pennding = true
    
    let query = {
      _id: position._id,
      name: position.name,
      quantity: 1,
      cost: position.cost ? position.cost : 0,
      option: {
        _id: undefined,
        name: undefined,
        cost: undefined
      },
      total_price: undefined
    }

    position.options.forEach((option: any) => {
      if (option.selected) {
        query.option._id = option._id,
        query.option.name = option.name,
        query.option.cost = option.cost
      }
    });

    const notesPosition = Object.assign({}, query)

    const candidate = this.notes.find(data => data._id === notesPosition._id)

    if (candidate) {
      if (candidate.option._id === notesPosition.option._id) {
        candidate.quantity++
        candidate.total_price = (candidate.cost + (candidate.option.cost ? candidate.option.cost : 0)) * candidate.quantity
      } else {
        notesPosition.total_price = notesPosition.cost + (notesPosition.option.cost ? notesPosition.option.cost : 0)
        this.notes.push(notesPosition)
      }
    } else {

      notesPosition.total_price = notesPosition.cost + (notesPosition.option.cost ? notesPosition.option.cost : 0)
      this.notes.push(notesPosition)
    }

    this.calculate();

    const add = {
      ru: "Добавлено!",
      en: "Added!",
      md: "Adăugat!"
    }

    const message = add[this.menuService.language as keyof typeof add]

    this._snackBar.open(
      message, "Ок",
      { duration: 1500, horizontalPosition: "right", verticalPosition: "top" })

    this.pennding = false
  }

  minusQuantity(position: any, i: number) {
    position.quantity--

    if (position.quantity <= 0) {
      this.notes.splice(i, 1)
    } else {
      position.total_price = (position.cost + (position.option.cost ? position.option.cost : 0)) * position.quantity
    }

    this.calculate()
  }

  plusQuantity(position: any) {
    position.quantity++
    position.total_price = (position.cost + (position.option.cost ? position.option.cost : 0)) * position.quantity
    this.calculate()
  }

  clear() {
    this.notes = []
    this.total_price = 0
  }

  calculate() {
    this.total_price = this.notes.reduce((total, item) => {
      return total += item.total_price
    }, 0)
  }

}
