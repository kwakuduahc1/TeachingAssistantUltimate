import { Component } from '@angular/core';

@Component({
    selector: 'nav-menu',
    templateUrl: './navmenu.component.html',
    styleUrls: ['./navmenu.component.css']
})
export class NavMenuComponent {
    isExpanded = false;

    collapse() {
       this.isExpanded = false;
    }

    toggle() {
        this.isExpanded = true;
    }
}
