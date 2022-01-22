import { Component, Inject, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from 'src/app/core/services';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import {MatBottomSheet, MatBottomSheetRef,MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import {IBlog} from './blogs.interface';
import { JwtService } from '../core/services/jwt.service';
@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {
  blogs:Array<IBlog> = [];
  blogAddForm!:FormGroup;
  displayedColumns: string[] = ['title', 'description', 'date', 'status','action'];

  constructor(
    private spinner: NgxSpinnerService,
    private userService: UserService,
    private toastr:ToastrService,
    private _bottomSheet: MatBottomSheet,
    private fb:FormBuilder,
    private jwtService:JwtService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.blogAddForm = this.fb.group({
      title:['',Validators.required],
      description:['',Validators.required],
      status:['',Validators.required],
    });
    this.getBlogs()
    
  }

  openBottomSheet(): void {
    const bottomSheetRef =this._bottomSheet.open(BottomSheetOverviewExampleSheet);
    bottomSheetRef.afterDismissed().subscribe(()=>{
      this.getBlogs();
    })
  }

  getBlogs(){
    this.spinner.show();
    this.userService.getBlogs().subscribe({
      next:(res)=>{
        this.spinner.hide();
        if(res.statusCode === 200){
          this.blogs = res.data;
        } else {
          this.toastr.error(res.message);
        }
      },
      error:(err)=>{
        this.spinner.hide();
        this.toastr.error('Error','Something went wrong');
      }
    })
  }
  deleteBlog(data:IBlog){
    if(confirm('Are you sure you want to delete this blog?')){
    this.userService.deleteBlog({_id:data._id}).subscribe({
      next:(res)=>{
        this.spinner.hide();
        if(res.statusCode === 200){
          this.getBlogs()
        } else {
          this.toastr.error(res.message);
        }
      },
      error:(err)=>{
        this.spinner.hide();
        this.toastr.error('Error','Something went wrong');
      }
    })
  }
  }
  editBlog(data:any){
    const bottomSheetRef =this._bottomSheet.open(BottomSheetOverviewExampleSheet,
      {data});

  }
  logout(){
    this.jwtService.destroyToken();
    this.router.navigate(['/auth/login'])
  }
}

@Component({
  selector: 'bottom-sheet',
  templateUrl: 'bottom-sheet.html',
})
export class BottomSheetOverviewExampleSheet {
  blogAddForm!:FormGroup;

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data:any,private _bottomSheetRef: MatBottomSheetRef<BottomSheetOverviewExampleSheet>,
    private spinner: NgxSpinnerService,
    private userService: UserService,
    private toastr:ToastrService,
    private fb:FormBuilder,
    
    ) {
    this.blogAddForm = this.fb.group({
      title:['',Validators.required],
      description:['',Validators.required],
      status:['',Validators.required],
    });
    if(data){
      this.blogAddForm.patchValue(data);
    }
  }

 
  addBlog(){
    this.spinner.show();
    this.userService.addBlog(this.blogAddForm.value).subscribe({
      next:(res)=>{
        this.spinner.hide();
        if(res.statusCode === 200){
          this._bottomSheetRef.dismiss();
          
        } else {
          this.toastr.error('Error',res.message);
        }
      },
      error:(err)=>{
        this.spinner.hide();
        this.toastr.error('Error','Something went wrong');
      }
    })
  }
  
}