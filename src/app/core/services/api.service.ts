import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { CharacterResponse, CharacterFilters } from "../models/character.model";

@Injectable({providedIn: 'root'})
export class ApiService{
    private baseUrl= 'https://rickandmortyapi.com/api';

    constructor(private http: HttpClient){}
    
    getCharacters(filters: CharacterFilters = {}){
        let params = new HttpParams();
        
        if (filters.page) {
            params = params.set('page', filters.page.toString());
        }
        if (filters.name) {
            params = params.set('name', filters.name);
        }
        if (filters.status) {
            params = params.set('status', filters.status);
        }
        if (filters.gender) {
            params = params.set('gender', filters.gender);
        }
        
        return this.http.get<CharacterResponse>(`${this.baseUrl}/character`, { params });
    }
}