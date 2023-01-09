import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Exibition } from 'src/app/model/exibition.model';
import { MuseumLocation } from 'src/app/model/location.model';
import { MuseumService } from 'src/app/service/museum.service';

@Component({
  selector: 'app-exibition-form',
  templateUrl: './exibition-form.component.html',
  styleUrls: ['./exibition-form.component.css']
})
export class ExibitionFormComponent implements OnInit {
  locations: MuseumLocation[] = []
  locationId: MuseumLocation = new MuseumLocation()
  newExibition: Exibition = new Exibition()
  form: FormGroup = new FormGroup({
    title: new FormControl('',Validators.required),
    description: new FormControl('',Validators.required),
    location: new FormControl('',Validators.required),
  })

  constructor(private museumService: MuseumService) { }
  
  ngOnInit(): void {
    this.museumService.getLoc().subscribe({
      next: (response: MuseumLocation[])=> this.locations = response
    })
  }

  selValue(event: any) {
    this.museumService.getExibition(event.target.value).subscribe({
      next: (response: MuseumLocation)=> {
        this.locationId = response
      }
    })
  }

  onSubmit() {
    this.newExibition.title = this.form.value.title
    this.newExibition.description = this.form.value.description
    this.newExibition.location = this.locationId
    this.museumService.postExibition(this.newExibition).subscribe({
      next: (response: any) => console.log("wohoooo!"),
      error: (response: any) => console.log(response.status.text)
    })
  }

}
