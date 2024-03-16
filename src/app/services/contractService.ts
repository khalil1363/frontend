import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../envirenment/envirenment';
import { Contract } from '../models/Contract';


@Injectable({
  providedIn: 'root'
})
export class ContractService {
  private apiUrl = `${environment.apiUrl}/contractPlayer`; // Adjust if your base URL differs

  constructor(private http: HttpClient) { }

  createContract(contract: Contract): Observable<Contract> {
    return this.http.post<Contract>(`${this.apiUrl}/add`, contract);
  }

  // Add other CRUD operations here as needed
}
