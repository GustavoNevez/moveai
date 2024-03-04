import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-signup', 
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})

export class SignupPage implements OnInit {

  regForm: FormGroup;

  constructor(public formBuilder:FormBuilder,public loadingCtrl: LoadingController)   {}

  ngOnInit() {
    this.regForm = this.formBuilder.group({
      fullname:['',[Validators.required]],
      email:['',[
        Validators.required,
        Validators.email,
        Validators.pattern("/^[^\s@]+@[^\s@]+\.[^\s@]+$/")
      ]],
      password:['',
      Validators.required,
      Validators.pattern("(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}")],
    })
   }

 get errorControl(){
  return this.regForm?.controls;}
async signUp(){
  const loading = await this.loadingCtrl.create();
  await loading.present();
  if(this.regForm?.valid){
    //const user = await this.authService.registerUser(email,password)
  }
  
}

}

  

