import { Component, OnInit } from '@angular/core';
import { PetService } from "../service/pet.service";
import { Pet } from "../model/Pet";
import  {environment} from "../../environments/environment";

@Component({
  selector: 'app-profile-gallery',
  templateUrl: './profile-gallery.component.html',
  styleUrls: ['./profile-gallery.component.css']
})
export class ProfileGalleryComponent implements OnInit {

  backendUrl: string = environment.backendUrl;
  pets: Pet[] = [];
  selectedPet?: Pet;
  searchText?: string;

  constructor(private petService: PetService) {}

  ngOnInit(): void {
    this.getPets();
    this.petService.getRefresh().subscribe((value: boolean) => {
      if(value) {
        this.getPets()
      }
    })
  }

  getPets(): void {
    this.petService.getPets()
      .subscribe(pets => this.pets = pets);
  }

  selectPet(selectedPet: Pet): void {
    this.selectedPet = selectedPet;
  }

  deletePet(id: number): void {
    this.petService.deletePet(id)
      .subscribe(pet => console.warn(`Your pet with ${id} has been deleted`, pet));
  }
}
