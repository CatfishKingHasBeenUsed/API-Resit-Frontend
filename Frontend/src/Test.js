import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-foo',
    templateUrl: './pager.component.html',
    styleUrls: ['./pager.component.css']
})
export class PagerComponent implements OnInit {

    page: number = 1;

    previous() {
        this.page = this.page - 1;
    }

    next() {
        this.page = this.page + 1;
    }

    constructor() { }

    ngOnInit() {
    }
}

<button (click)="previous()">previous</button>
<p>{{page}}</p>
<button (click)="next()">next</button>
