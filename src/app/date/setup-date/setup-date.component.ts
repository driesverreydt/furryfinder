import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import {Pet} from "../../model/Pet";
import {PetService} from "../../service/pet.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-setup-date',
  templateUrl: './setup-date.component.html',
  styleUrls: ['./setup-date.component.css']
})
export class SetupDateComponent implements OnInit {

  backendUrl: string = environment.backendUrl;
  name!: string;
  pet!: Pet;
  sendTextForm = this.formBuilder.group({
    name: ''
  })

  constructor(
    private route: ActivatedRoute,
    private petService: PetService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.name = params['name'];
    });
    this.petService.getPetByName(this.name).subscribe(pet => this.pet = pet);
  }
}
