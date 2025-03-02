import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Specialization } from '../models/specialization.model';

@Injectable({
  providedIn: 'root'
})
export class SpecializationService {
  private apiUrl = 'api/shared/specializations';

  constructor(private http: HttpClient) { }

  getSpecializations(): Observable<Specialization[]> {
    return this.http.get<Specialization[]>(this.apiUrl);
  }
}
