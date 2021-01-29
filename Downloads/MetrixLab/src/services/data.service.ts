import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable()
export class DataService {

	constructor(private http: HttpClient) { }

	getEmployees(page:number): Observable<any> {
		return this.http.get<Array<string>>( `${environment.service}users?page=${page}`);
	}

}