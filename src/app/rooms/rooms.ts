export interface Room {
    totalRooms: number;
    availableRooms:number;
    bookedRooms:number;
}

export interface RoomList{
    roomNumber?:string,
    roomType: string;
    amentities: string;
    price: number;
    photos:string;
    CheckInTime:Date;
    CheckOutTime:Date;
    rating: number;
}