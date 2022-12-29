import { HttpEventType } from '@angular/common/http';
import { AfterViewChecked, AfterViewInit, Component, DoCheck, OnDestroy, OnInit, QueryList, Self, SkipSelf, ViewChild, ViewChildren } from '@angular/core';
import { catchError, map, Observable, Subject, Subscription } from 'rxjs';
import { HeaderComponent } from '../header/header.component';
import { ConfigService } from '../services/config.service';
import { Room, RoomList } from './rooms'
import { RoomsService } from './services/rooms.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit, DoCheck, AfterViewInit, AfterViewChecked, OnDestroy {

  hotelName: string = "Hilton Hotel";
  nummerOfRooms = 10;
  hideRooms = true;

  rooms: Room = {
    totalRooms: 20,
    availableRooms: 10,
    bookedRooms: 5
  };

  roomList: RoomList[] = [];
  selectedRoom!: RoomList;

  stream = new Observable(observer => {
    observer.next('uesr1');
    observer.next('uesr2');
    observer.next('uesr3');
    observer.complete();
  })

  @ViewChild(HeaderComponent) 
  headerCompenent!: HeaderComponent;

  @ViewChildren(HeaderComponent) headerComponentChildren!: QueryList<HeaderComponent>;

  constructor(@SkipSelf() private _roomService: RoomsService, private configService: ConfigService) { 

  }


  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }
  ngAfterViewChecked(): void {
    
  }
  ngAfterViewInit(): void {
    this.headerCompenent.title = "Rooms View";
    console.log(this.headerComponentChildren)
  }
  ngDoCheck(): void {
    console.log("On do check is called");
  }

  totalBytes = 0;

  subscription!: Subscription

  error$: Subject<string> = new Subject<string>();

  getError$ = this.error$.asObservable();

  room$ = this._roomService.getRooms$.pipe(
    catchError((err) => {
      console.log(err);
      this.error$.next(err.message);
      return([]);
    })
  );

  roomsCount$ = this._roomService.getRooms$.pipe(
    map((rooms) => {return rooms.length})
  )

  ngOnInit(): void {
    
    // this._roomService.getPhotos().subscribe((data) => {
    //   console.log(data)
    // });

    

    this._roomService.getPhotos().subscribe((event) => {
      switch(event.type) {
        case HttpEventType.Sent: {
          console.log('request has been made!');
          break;
        }
        case HttpEventType.ResponseHeader: {
          console.log('request Success!');
          break;
        }
        case HttpEventType.DownloadProgress: {
          this.totalBytes += event.loaded;
          break;
        }
        case HttpEventType.Response: {
          console.log(event.body);
          break;
        }
      }
    });

    this.stream.subscribe(data => {console.log(data)});

    //console.log(this._roomService.getRooms());
    //  this._roomService.getRooms().subscribe(rooms => {
    //     this.roomList = rooms;
    //  });    
  //    this._roomService.getRooms$.subscribe(rooms => {
  //     this.roomList = rooms;
  //  });    
  }

  toggle() {
    this.hideRooms = !this.hideRooms;
  }

  selectRoom(room: RoomList){
    console.log(room);
    this.selectedRoom = room;
  }
  
  addRoom(){
    const room: RoomList = {
      roomNumber: '4',
      roomType: 'Deluxe Room 4',
      amentities: 'Air Conditioner, Free Wifi, TV, Bathroom',
      price: 200,
      photos: '',
      CheckInTime: new Date('11-Nov-2021'),
      CheckOutTime: new Date('15-Nov-2021'),
      rating: 3
    }

    this._roomService.addRoom(room).subscribe(rooms => {
      console.log(rooms);
      this.roomList = rooms;
    })
  }

  editRoom(){
    const room: RoomList = {
      roomNumber: '3',
      roomType: 'AJ Deluxe Room 4',
      amentities: 'Air Conditioner, Free Wifi, TV, Bathroom',
      price: 200,
      photos: '',
      CheckInTime: new Date('11-Nov-2021'),
      CheckOutTime: new Date('15-Nov-2021'),
      rating: 4
    }

    this._roomService.editRoom(room.roomNumber, room).subscribe(rooms => {
      this.roomList = rooms;
    });
  }

  deleteRoom(){
    this._roomService.deleteRoom('f73de0be-d9a5-4031-b547-806dd16f07ce').subscribe(rooms => {
      this.roomList = rooms;
    })
  }


}
