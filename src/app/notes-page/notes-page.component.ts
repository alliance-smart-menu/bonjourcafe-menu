import { Component, OnInit } from '@angular/core';
import { NotesService } from '../services/notes.service';
import { MenuService } from '../services/menu.service';

@Component({
  selector: 'app-notes-page',
  templateUrl: './notes-page.component.html',
  styleUrls: ['./notes-page.component.css']
})
export class NotesPageComponent implements OnInit {

  html: any = {
    add_note: {
      ru: "Добавьте первую заметку с меню",
      en: "Add the first note with the menu",
      md: "Adăugați prima notă cu meniul"
    },
    note: {
      ru: "Моя заметка",
      en: "My note",
      md: "Nota mea"
    },
    clear: {
      ru: "Очистить",
      en: "Clear",
      md: "Сlar"
    },
    total: {
      ru: "Итого",
      en: "Total",
      md: "Total"
    }
  } 

  constructor (
    public notesService: NotesService,
    public menuService: MenuService
  ) {}

  ngOnInit(): void {
    
  }

}
