import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {
  blogs:Array<any> = [];
  displayedColumns: string[] = ['title', 'description', 'date', 'status'];

  constructor() { }

  ngOnInit(): void {
  }

}
