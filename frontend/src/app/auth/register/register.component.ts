import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from 'src/app/core/services';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!:FormGroup;
  constructor(
    private fb:FormBuilder,
    private spinner: NgxSpinnerService,
    private userService: UserService,
    private toastr:ToastrService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstname:['',Validators.required],
      lastname:['',Validators.required],
      email:['',Validators.required],
      password:['',Validators.required],
      dob:['',Validators.required],
      role:['',Validators.required],
    })
  }
  
  register(){
    this.spinner.show();
    this.userService.signup(this.registerForm.value).subscribe({
      next:(res)=>{
        this.spinner.hide();
        if(res.statusCode === 200){
          this.toastr.success(res.message);
          this.router.navigate(['/auth/login'])
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
