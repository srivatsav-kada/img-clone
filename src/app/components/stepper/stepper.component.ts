import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApplicantDetailsNewService } from '../../services/applicant-details-new.service';
import { Router } from '@angular/router';
import { Applicant } from '../../store/applicant-details.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';



@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.css'
})
export class StepperComponent implements OnInit {
 constructor(private _formBuilder: FormBuilder,private formDataService : ApplicantDetailsNewService,private router : Router,private http : HttpClient,private authcheckdashboard: AuthService){}
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    thirdctrl : ['',Validators.required]
  });
  fourthFormGroup=this._formBuilder.group({
    fourthctrl : ['',Validators.required]
  });
  isLinear = false;

  ngOnInit(): void {
    
    this.authcheckdashboard.changeTitle('Activate Account Page');
  }
 
  onStepChange(event: any) {
    switch (event.selectedIndex) {
      case 0:
        this.authcheckdashboard.changeTitle('Activate Account Page');
        break;
      case 1:
        this.authcheckdashboard.changeTitle('Tax Form');
        break;
      case 2:
        this.authcheckdashboard.changeTitle('Activate Account Password');
        break;
      case 3:
        this.authcheckdashboard.changeTitle('Submit');
        break;
      default:
        this.authcheckdashboard.changeTitle('Dashboard');
    }
  }




  ActivateAccountOnNext(){
    console.log('Activate account next')
  }

  TaxFormOnPrevious(){
    console.log('TaxFormOnprevious account next')
  }
  TaxFormOnNext(){
    console.log('TaxFormOnNext account next')
  }
  ActivateAccountPswdOnPrevious(){
    console.log('ActivateAccountPswdOnPrevious ')
  }
  ActivateAccountPswdOnNext(){
    console.log('AActivateAccountPswdOnNext next')
  }
  onFinalSubmit(){

  }

  finalPageOnPrevious(){
    console.log('finalPageOnPrevious next')
  }
 

  onNextStepOFForm(data: Applicant) {
    console.log('StepperComponent onNextStep:', data);
    this.formDataService.setFormData(data);
  }



 

  // onSubmit() {
  //   const formData = this.formDataService.getFormData();
  //   if (formData) {
  //     console.log('Submitting data:', formData);
  //     this.submitData(formData);
  //   }
  // }

  // private submitData(data: Applicant) {
  //   const url = 'http://localhost:3000/activateaccountform'; // Use your actual JSON server URL
  //   this.http.post(url, data).subscribe({
  //     next: response => {
  //       console.log('Data submitted successfully', response);
  //     },
  //     error: (error: HttpErrorResponse) => {
  //       console.error('Error submitting data:', error);
  //       console.error('Error details:', error.message);
  //     }
  //   });
  // }


  onSubmit() {
    const combinedData = {
      ...this.formDataService.getFormData(),
      ...this.formDataService.getTaxFormData(),
      ...this.formDataService.getPasswordFormData()
    };

    this.submitData(combinedData);
  }

  private submitData(data: any) {
    this.formDataService.submitCombinedData(data).subscribe({
      next: response => {
        console.log('Data submitted successfully', response);
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error submitting data:', error);
        console.error('Error details:', error.message);
      }
    });
  }
}
