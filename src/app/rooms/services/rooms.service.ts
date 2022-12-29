import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { shareReplay } from 'rxjs';
import { AppConfig } from 'src/app/AppConfig/appconfig.interface';
import { APP_SERVICE_CONFIG } from '../../AppConfig/appconfig.service';
import {RoomList} from '../rooms';


@Injectable({
  providedIn: 'root'
})
export class RoomsService {
  roomList:RoomList[] = [];
  headers = new HttpHeaders({'token': '1221212JJJJ'})

  getRooms$ = this.http.get<RoomList[]>("/api/rooms")
  .pipe(
    shareReplay(1)
  );


  constructor(@Inject(APP_SERVICE_CONFIG) private config:AppConfig,
  private http:HttpClient) { 
    console.log(this.config.apiEndPoint);
  }

  getRooms(){
        return this.http.get<RoomList[]>("/api/rooms")
  }

  addRoom(room: RoomList) {
    return this.http.post<RoomList[]>('/api/rooms', room);
  }

  editRoom(id: string | undefined, room: RoomList){
    return this.http.put<RoomList[]>(`/api/rooms/${id}`, room);
  }

  deleteRoom(id:string){
    return this.http.delete<RoomList[]>(`/api/rooms/${id}`)
  }

  getPhotos(){
    const request = new HttpRequest('GET', `https://jsonplaceholder.typicode.com/photos`, {
      reportProgess: true
    }
    );
    return this.http.request(request);
  }
}
