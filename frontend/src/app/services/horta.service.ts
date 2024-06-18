import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HortaService {
  http = inject(HttpClient)
  url = "localhost:3000/"

  getSensorData() {
    return this.http.get(this.url + "sensor-data")
  }
  
}
