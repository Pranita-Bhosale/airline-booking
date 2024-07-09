import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PlaneService } from '../plane.service';
import { Plane } from '../model/Plane';

@Component({
  selector: 'app-plane',
  templateUrl: './plane.component.html',
  styleUrls: ['./plane.component.css']
})

export class PlaneComponent implements OnInit {
getAllPlane() {
throw new Error('Method not implemented.');
}

seatCapacity: any;
planeForm: FormGroup;
errorMessage:string;
successMessage:string;
Plane: any[] = [];

constructor(private formbuilder: FormBuilder, private router: Router, private planeService: PlaneService) { }

ngOnInit(): void {
  this.planeForm=this.formbuilder.group({
    
seatCapacity: ['', Validators.required],
name:  ['', Validators.required],

  })
}


addPlane() {
  let name=this.planeForm.value.name;
  let seatCapacity=this.planeForm.value.seatCapacity;
  this.planeService.addPlane(new Plane(name,seatCapacity))
    .subscribe((data: any) => {
      this.planeForm.reset();//
      this.successMessage = data;
    },
      (error: any) => {
        this.planeForm.reset();//
        this.errorMessage = error;
      }
    )
}
  }

    








 


