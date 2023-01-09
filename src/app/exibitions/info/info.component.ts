import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { Artwork } from 'src/app/model/artwork.model';
import { Exibition } from 'src/app/model/exibition.model';
import { MuseumService } from 'src/app/service/museum.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  exibition: Exibition = new Exibition()
  artworks: Artwork[] = []
  allArt: Artwork[] = []
  show = false;
  btnShow = true;
  closeResult = ''

  form: FormGroup = new FormGroup({
    author: new FormControl('')
  })
  constructor(private offcanvasService: NgbOffcanvas ,private route: ActivatedRoute, private museumService: MuseumService) { }

  params = {
    sort: 'author',
    sortDirection: 'asc',
    filter: {
      author: '',
    }
  }

  open(content:any) {
		this.offcanvasService.open(content, { ariaLabelledBy: 'offcanvas-basic-title' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
		);
	}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params)=> {
      this.museumService.getById(params['id']).subscribe({
        next: (response: Exibition) => this.exibition = response
      })
      this.museumService.getArt(params['id']).subscribe({
        next: (response: Artwork[]) => this.artworks =response
      })
    })
    this.getAllArtWork()
  }

  getAllArtWork() {
    this.museumService.getAllArt(this.params).subscribe({
      next: (respoonse: Artwork[]) => this.allArt = respoonse
    })
  }

  addArt(artwork: Artwork, id: number) {
    artwork.exibition_id = 0
    this.museumService.artPut(artwork, id).subscribe({
      next: (response: Artwork) => {
        this.ngOnInit()
        this.show = true;
      },
      error: (response: any) => console.log(response.statusText)
    })
  }

  deleteArt(artwork: Artwork, id: number) {
    artwork.exibition_id = -1
    this.museumService.artDelete(artwork, id).subscribe({
      next: (response: Artwork) => {
        console.log("Deleted!")
        this.ngOnInit()
        this.show = true;
      },
      error: (response: any) => console.log(response.statusText)
    })
  }

  filterTable() {
    this.params.filter.author = this.form.value.author
    this.getAllArtWork()
  }

  showTable() {
    this.show = !this.show
    this.btnShow = false;
  }

  hideTable() {
    this.show = !this.show
    this.btnShow = true;
  }
}
