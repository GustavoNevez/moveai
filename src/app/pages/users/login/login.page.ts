import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,} from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController , ToastController} from '@ionic/angular';
import { AuthenticationService } from 'src/app/authentication.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  type : boolean=true;

  constructor(private toastController: ToastController, public authService: AuthenticationService,public formBuilder:FormBuilder,public loadingCtrl: LoadingController,public router : Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email:['',[
        Validators.required,
        Validators.email,
        Validators.pattern("[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$")
      ]],
      password:['',[
      Validators.required,
      Validators.pattern("")]]
  })
 }
 get errorControl(){
  return this.loginForm?.controls;}
  
async login(){
  const loading = await this.loadingCtrl.create({
    message:'Por favor,aguarde',
  });
  await loading.present();
  try {
    const user = await this.authService.loginUser(this.loginForm.value.email,this.loginForm.value.password);
  } catch(error){
    let message:string;
    console.error(error);
    console.error(error.code);
    console.error(error.message);
    switch(error.code){
      case 'auth/missing-password':
        error.message='A senha esta incorreta!';
        break;
      case 'auth/invalid-email':
        error.message='O e-mail esta invalido!'
        break;
        
    };
    this.presentToast(error.message);
    
    
  } finally {
    loading.dismiss();
  }
  
}
async presentToast(message:string) {
  const toast = await this.toastController.create({
    message,
    duration: 4000,
    color:'danger',  
  });

  await toast.present();

 }
 logarComGmail(){
  this.authService.logarComGoogle()
  .then((res)=>{
    
    this.router.navigate(['/home']); })
  .catch((error)=>{
    
    console.log(error); })
  
}
showpassword(){
  this.type= !this.type;
}

redirectPage(){
  this.router.navigate(['/initial']);
}

}

