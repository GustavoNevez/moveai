import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,} from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController , ToastController} from '@ionic/angular';
import { AuthenticationService } from 'src/app/authentication.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
 resetaForm: FormGroup;

  constructor( private toastController: ToastController, public authService: AuthenticationService,public formBuilder:FormBuilder,public loadingCtrl: LoadingController,public router : Router)   {}

  ngOnInit() {
    this.resetaForm = this.formBuilder.group({
      email:['',[
        Validators.required,
        Validators.email,
        Validators.pattern("[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$")
      ]],
       })
  }

  get errorControl(){
    return this.resetaForm?.controls;}
    
  async resetPassword(){
    const loading = await this.loadingCtrl.create({
      message:'Por favor,aguarde',
    });
    await loading.present();
    try {
      const user = await this.authService.resetPassoword(this.resetaForm.value.email);
    } catch(error){
      let message:string;
      console.error(error);
      console.error(error.code);
      console.error(error.message);

    } finally {
      loading.dismiss();
      console.log('Senha Alterada')
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
}
