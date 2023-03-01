import { Component , OnInit} from '@angular/core';

import { MenuService } from '../services/menu.service';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-menu-page',
  templateUrl: './menu-page.component.html',
  styleUrls: ['./menu-page.component.css']
})
export class MenuPageComponent implements OnInit {

  html: any = {
    no_positions: {
      ru: "Позиции отсуствуют :(",
      en: "Empty :(",
      md: "Absent :("
    }
  } 


  constructor (
    public menuService: MenuService,
    public notesService: NotesService
  ) {}

  ngOnInit(): void {
  }

  changeOption(position: any, index: number) {

    position.options.forEach((element: any) => {
      element.selected = false
    });

    position.options[index].selected = true

    position.total_price = (position.cost ? position.cost : 0) + ( position.options[index].cost ? position.options[index].cost : 0 )
  }

  changeCategory(category: string) {
    this.menuService.loading = true

    this.menuService.category = category
    localStorage.setItem('category', category)

    this.menuService.positions = this.menuService.all_positions?.filter( position => position.category === this.menuService.category )

    setTimeout(() => {
      this.menuService.loading = false
    }, 1500);
  }

  setCategoryClass(category: any) {
    if (category._id === this.menuService.category) {
      return "category-name selected-category"
    } else {
      return "category-name"
    }
  }

  setOptionClass(option: any) {
    if (option.selected) {
      return "option selected"
    } else {
      return "option"
    }
  }

}
