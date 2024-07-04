import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-transfermoney',
  templateUrl: './transfermoney.component.html',
  styleUrl: './transfermoney.component.css'
})
export class TransfermoneyComponent implements OnInit{

  constructor( private router: Router,private authcheckdashboard: AuthService) { }
  ViewBeneficiary(){
    this.router.navigate(['/home/viewBeneficiary'])
  }
  Sendmoney(){
    this.router.navigate(['/home/sendMoney'])
  }
  ngOnInit(): void {
    this.authcheckdashboard.changeTitle('Transfer Money');
  }
}
