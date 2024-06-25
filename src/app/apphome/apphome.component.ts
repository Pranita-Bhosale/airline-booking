import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-apphome',
  templateUrl: './apphome.component.html',
  styleUrls: ['./apphome.component.css']
})
export class ApphomeComponent implements OnInit {
  apphomeForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private router: Router) { }

  Cities: string[] = ["Pune", "Mumbai", "Sangali", "Solapur", "Satara", "Goa", "hyderabad", "Gudgaon"];

  ngOnInit(): void {

  }

}
