import { Component, OnInit } from '@angular/core';
import { Exibition } from '../model/exibition.model';
import { MuseumService } from '../service/museum.service';

@Component({
  selector: 'app-exibitions',
  templateUrl: './exibitions.component.html',
  styleUrls: ['./exibitions.component.css']
})
export class ExibitionsComponent implements OnInit {
  exebitions: Exibition[] = []

  constructor(private museumService: MuseumService) { }

  ngOnInit(): void {
    this.museumService.getAll().subscribe({
      next: (response: Exibition[])=> this.exebitions = response 
    })
  }

}
