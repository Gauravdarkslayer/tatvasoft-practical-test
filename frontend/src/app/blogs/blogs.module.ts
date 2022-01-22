import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogsRoutingModule } from './blogs-routing.module';
import { BlogsComponent } from './blogs.component';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  declarations: [
    BlogsComponent
  ],
  imports: [
    CommonModule,
    BlogsRoutingModule,
    MatTableModule
  ]
})
export class BlogsModule { }
