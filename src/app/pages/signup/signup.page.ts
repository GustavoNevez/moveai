import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,} from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController , ToastController} from '@ionic/angular';
import { AuthenticationService } from 'src/app/authentication.service';


@Component({
  selector: 'app-signup', 
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})

export class SignupPage implements OnInit {
  type: boolean = true;
  regForm: FormGroup;
  constructor( private toastController: ToastController, public authService: AuthenticationService,public formBuilder:FormBuilder,public loadingCtrl: LoadingController,public router : Router)   {}

  ngOnInit() {
    this.regForm = this.formBuilder.group({
      fullname:['',[Validators.required]],
      email:['',[
        Validators.required,
        Validators.email,
        Validators.pattern("[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$")
      ]],
      password:['',[
      Validators.required,
      Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{8,32}$")]],
       })
  }

  get errorControl(){
    return this.regForm?.controls;}
    
  async signUp(){
    const loading = await this.loadingCtrl.create({
      message:'Por favor,aguarde',
    });
    await loading.present();
    try {
      const user = await this.authService.registerUser(this.regForm.value.email,this.regForm.value.password);
    } catch(error){
      let message:string;
      console.error(error);
      console.error(error.code);
      console.error(error.message);
      switch(error.code){
        case 'auth/email-already-in-use':
          error.message='O email já foi utilizado para cadastro!';
          break;
      };
      this.presentToast(error.message);
      
      
    } finally {
      loading.dismiss();
      this.router.navigate['/login'];
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
  
  showpassword(){
    this.type= !this.type;
  }

}
 




  

