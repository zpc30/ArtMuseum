import { HttpClient, HttpParams } from '@angular/common/http';
import { getPlatform, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Artwork } from '../model/artwork.model';
import { Exibition } from '../model/exibition.model';
import { MuseumLocation } from '../model/location.model';

const baseUrl = 'http://localhost:3000/api/exibitions'
const artsUrl = 'http://localhost:3000/api/artworks'
const locationUrl = 'http://localhost:3000/api/locations'

@Injectable({
  providedIn: 'root'
})
export class MuseumService {

  constructor(private http: HttpClient) { }

  getAll():Observable<Exibition[]> {
    return this.http.get(baseUrl).pipe(map((data:any)=> {
      return data && data.map((el:any)=> new Exibition(el))
    }))
  }

  getById(id: number): Observable<Exibition> {
    return this.http.get(baseUrl + '/' + id).pipe(map((data:any)=> {
      return new Exibition(data)
    }))
  }
  getArt(id: number): Observable<Artwork[]> {
    return this.http.get(baseUrl + '/' + id + '/artworks').pipe(map((data:any)=> {
      return data && data.map((el:any)=> new Artwork(el))
    }))
  }

  getArtId(id: number): Observable<Artwork> {
    return this.http.get(baseUrl + '/' + id ).pipe(map((data:any)=> {
      return data && data.map((el:any)=> new Artwork(el))
    }))
  }

  getAllArt(params?: any): Observable<Artwork[]> {
    let options = {
      params: new HttpParams()
        .set('sort', params.sort || '')
        .set('sortDirection', params.sortDirection || '')
        .set('filter', params.filter && JSON.stringify(params.filter) || [])
    }
    return this.http.get(artsUrl, options).pipe(map((data:any)=> {
      return data && data.map((el:any)=> new Artwork(el))
    }))
  }
  artPut(artwork: Artwork, id: number): Observable<Artwork> {
    return this.http.put(baseUrl + '/' + artwork.exibition_id + '/artworks/' + id, artwork).pipe(map((data:any)=> {
      return new Artwork(data)
    }))
  }
  artDelete(artwork: Artwork, id: number): Observable<Artwork> {
    return this.http.put(baseUrl + '/' + artwork.exibition_id + '/artworks/' + id, artwork).pipe(map((data:any)=> {
      return new Artwork(data)
    }))
  }

  getLoc(): Observable<MuseumLocation[]> {
    return this.http.get(locationUrl).pipe(map((data:any)=> {
      return data && data.map((el:any)=> new MuseumLocation(el))
    }))
  }

  postExibition(exibit: Exibition): Observable<Exibition> {
    return this.http.post(baseUrl, exibit).pipe(map((data:any)=> {
      return new Exibition(data)
    }))
  }
  getExibition(id: number): Observable<MuseumLocation> {
    return this.http.get(locationUrl + '/' + id).pipe(map((data:any)=> {
      return new MuseumLocation(data)
    }))
  }
}
