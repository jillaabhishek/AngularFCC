import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { RoomList } from '../rooms';

@Component({
  selector: 'app-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoomsListComponent implements OnInit, OnChanges, OnDestroy {

  @Input()
  rooms: RoomList[] | null = [];

  @Output()
  selectedRoom = new EventEmitter<RoomList>();

  constructor() { }
  ngOnDestroy(): void {
    console.log("Room List Compomemt is destory")
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);    
  }

  ngOnInit(): void {
  }

  selectRoom(room: RoomList){
    this.selectedRoom.emit(room);
  }
}


