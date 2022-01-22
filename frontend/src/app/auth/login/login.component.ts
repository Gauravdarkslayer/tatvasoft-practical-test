import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from 'src/app/core/services';
import { ToastrService } from 'ngx-toastr';
import { JwtService } from 'src/app/core/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!:FormGroup;

  constructor(
    private fb:FormBuilder,
    private spinner: NgxSpinnerService,
    private userService: UserService,
    private toastr:ToastrService,
    private router:Router,
    private jwtService:JwtService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email:['',Validators.required],
      password:['',Validators.required],
      role:['',Validators.required],
    })
  }

  login(){
    this.spinner.show();
    this.userService.login(this.loginForm.value).subscribe({
      next:(res)=>{
        this.spinner.hide();
        if(res.statusCode === 200){
          this.toastr.success(res.message);
          this.jwtService.saveToken(res.data.jwtToken);
          this.router.navigate(['/blogs']);
        } else {
          this.spinner.hide();
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
