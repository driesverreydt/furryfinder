import { Component, OnInit } from '@angular/core';
import { FormBuilder } from "@angular/forms";
import { PetService } from "../service/pet.service";

@Component({
  selector: 'app-petform',
  templateUrl: './petform.component.html',
  styleUrls: ['./petform.component.css']
})
export class PetformComponent implements OnInit {

  private count: number = 100;

  constructor(
    private petService: PetService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
  }

  petForm = this.formBuilder.group({
    id: this.count,
    name: '',
    kind: '',
    image: '',
    profileText: '',
    popularity: ''
  })

  onSubmit(): void {
    this.petService.addPet(this.petForm.value)
      .subscribe(pet => console.warn('Your pet has been added', pet))
    console.warn('Your pet form has been added', this.petForm.value);
    this.petForm.reset();
    this.count++;
    this.petForm.setValue({id: this.count})
  }
}
