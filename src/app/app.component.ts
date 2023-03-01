import { Component, OnInit } from '@angular/core';

import { MenuService } from './services/menu.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  version: string = "1.00"

  html: any = {
    menu: {
      ru: "Меню",
      en: "Menu",
      md: "Menu"
    },
    notes: {
      ru: "Заметки",
      en: "Notes",
      md: "Note"
    }
  }



  constructor(
    public menuService: MenuService
  ) { }

  ngOnInit(): void {
    this.checkVersion();
    this.FindSavedSettings();
    this.getMenu();
  }

  checkVersion() {
    let current_version = localStorage.getItem("version");
    if (!current_version || current_version !== this.version) {
      localStorage.removeItem('language')
      localStorage.removeItem('category')
      localStorage.setItem("version", this.version)
    }
  }

  FindSavedSettings() {

    const token = localStorage.getItem("token");
    if (token) {
      this.menuService.token = token
    }

    const language = localStorage.getItem('language');
    if (language) {
      this.menuService.language = language
    }

    const category = localStorage.getItem('category');
    if (category) {
      this.menuService.category = category
    }

  }

  changeLanguage(language: string) {
    this.menuService.language = language
    localStorage.setItem("language", language)
  }

  LangClass(lang: string) {
    if (this.menuService.language === lang) {
      return "language-selected"
    } else {
      return ""
    }
  }

  getMenu() {

    this.menuService.loading = true

    this.menuService.getMenu().subscribe(
      (data) => {

        this.menuService.categories = data.categories
        if (!this.menuService.category) {
          this.menuService.category = data.categories[0]._id
        }

        this.menuService.all_positions = data.positions.map((position: any) => {

          position.total_price = position.cost ? position.cost : undefined

          if (position.option_required) {
            position.options[0].selected = true
            position.total_price = (position.cost ? position.cost : 0) + position.options[0].cost
          }

          return position
        })

        if (data.token) {
          this.menuService.token = data.token
          localStorage.setItem("token", data.token)
        }


        this.menuService.positions = this.menuService.all_positions?.filter(position => position.category === this.menuService.category)

        setTimeout(() => {
          this.menuService.loading = false
        }, 1200);

      },
      error => console.warn(error)
    )
  }

}
