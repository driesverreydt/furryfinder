import { Component, OnInit } from '@angular/core';
import { PetService } from "../service/pet.service";
import { Pet } from "../model/Pet";

@Component({
  selector: 'app-profile-gallery',
  templateUrl: './profile-gallery.component.html',
  styleUrls: ['./profile-gallery.component.css']
})
export class ProfileGalleryComponent implements OnInit {

  pets: Pet[] = [];
  selectedPet: Pet | undefined;
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
}
