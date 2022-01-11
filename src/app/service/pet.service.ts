import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";
import {environment} from "../../environments/environment";
import {BehaviorSubject, catchError, map, Observable, of, tap} from "rxjs";
import {Pet} from "../model/Pet";

@Injectable({
  providedIn: 'root'
})
export class PetService {

  private readonly url: string;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {
    this.url = `${environment.backendUrl}/pets`
  }

  getPets(): Observable<any> {
    return this.http.get<Pet[]>(this.url).pipe(
      map(pets => pets.sort((pet1,pet2) => pet1.name > pet2.name ? 1 : -1))
    )
  }

  getPetByName(name: string): Observable<any> {
    return this.http.get<Pet>(this.url + '/' + name);
  }

  addPet(pet: Pet): Observable<Pet> {
    return this.http.post<Pet>(this.url,pet, this.httpOptions).pipe(
      tap( _ => this.setRefresh(true)),
      tap(_ => this.log(`added new pet`)),
      catchError(this.handleError<any>('addPet'))
    );
  }

  deletePet(id: number): Observable<any> {
    return this.http.delete(this.url+`/${id}`).pipe(
      tap( _ => this.setRefresh(true)),
      tap(_ => this.log(`deleted pet id=${id}`)),
      catchError(this.handleError<any>('deletePet'))
    )
  }

  private log(message: string){
    console.log(`PetService: ${message}`);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private refresh: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public getRefresh(): Observable<boolean> {

    return this.refresh.asObservable();
  }

  public setRefresh(value: boolean): void {

    this.refresh.next(value);
  }

}
