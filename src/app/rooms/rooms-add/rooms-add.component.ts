import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RoomList } from '../rooms';
import { RoomsService } from '../services/rooms.service';

@Component({
  selector: 'app-rooms-add',
  templateUrl: './rooms-add.component.html',
  styleUrls: ['./rooms-add.component.scss']
})
export class RoomsAddComponent implements OnInit {

  room: RoomList = {
      roomType: '',
      amentities: '',            
      CheckInTime: new Date(),
      CheckOutTime: new Date(),
      photos: '',
      price: 0,
      rating: 0
  }

  successMessage: string = '';

  constructor(private roomService: RoomsService) { }

  ngOnInit(): void {
  }

  AddRoom(roomForm: NgForm){
    this.roomService.addRoom(this.room).subscribe((data) => {
      roomForm.reset();
      
      // roomForm.resetForm({roomType: '',
      // amentities: '',            
      // CheckInTime: new Date(),
      // CheckOutTime: new Date(),
      // photos: '',
      // price: 0,
      // rating: 0});
      this.successMessage = "Room Added Successfully"
    })
  }

}
