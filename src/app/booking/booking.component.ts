import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';
import { exhaustMap, mergeMap, switchMap } from 'rxjs';
import { ConfigService } from '../services/config.service';
import { BookingService } from './booking.service';
import { CustomValidator } from './validators/custom-validator';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class BookingComponent implements OnInit {
  bookingForm!: FormGroup;
  get guests() {
    return this.bookingForm.get('guests') as FormArray;
  }
  constructor(
    private configService: ConfigService,
    private formBuilder: FormBuilder,
    private bookingService: BookingService
  ) {}

  //new FormControl('') or [''] both are same
  ngOnInit(): void {
    this.bookingForm = this.formBuilder.group({
      roomId: new FormControl({ value: '2', disabled: true }, {validators: [Validators.required]}),
      guestEmail: ['', {validators: [Validators.email]}],
      checkinDate: Date,
      checkoutDate: Date,
      bookingStatus: [''],
      bookingAmount: [''],
      bookingDate: Date,
      mobileNumber: ['', {validators: [Validators.required]}],
      guestName: ['', [Validators.required, Validators.minLength(5), CustomValidator.ValidateName]],
      address: this.formBuilder.group({
        AddressLine1: ['', [Validators.required]],
        AddressLine2: [''],
        City: ['', [Validators.required]],
        State: ['', [Validators.required]],
        Country: [''],
        ZipCode: [''],
      }),
      //guestCount: [''],
      guests: this.formBuilder.array([this.addGuestControl()]),
      tnc: new FormControl(false, [Validators.requiredTrue])
    }, {updateOn: 'blur', Validators: [Validators.required]});

    this.getBookingData();

    // this.bookingForm.valueChanges.subscribe((data) => {this.bookingService.bookRoom(data).subscribe((result) => console.log(result))});

    // this.bookingForm.valueChanges.pipe(
    //   mergeMap((data) => this.bookingService.bookRoom(data))
    // ).subscribe((data) => console.log(data))

    // this.bookingForm.valueChanges.pipe(
    //   switchMap((data) => this.bookingService.bookRoom(data))
    // ).subscribe((data) => console.log(data))

    this.bookingForm.valueChanges.pipe(
      exhaustMap((data) => this.bookingService.bookRoom(data))
    ).subscribe((data) => console.log(data))
  }

  addBooking() {
    console.log(this.bookingForm.getRawValue());
    // this.bookingForm.reset({
    //   roomId: '3',
    //   guestEmail: '',
    //   checkinDate: '',
    //   checkoutDate: '',
    //   bookingStatus: '',
    //   bookingAmount: '',
    //   bookingDate: '',
    //   mobileNumber: '',
    //   guestName: '',
    //   address: this.formBuilder.group({
    //     AddressLine1: '',
    //     AddressLine2: '',
    //     City: '',
    //     State: '',
    //     Country: '',
    //     ZipCode: '',
    //   }),
    //   guests: [],
    //   tnc: false
    // })

    this.bookingService.bookRoom(this.bookingForm.getRawValue()).subscribe((data) => console.log(data));
  }

  getBookingData(){
    this.bookingForm.patchValue(
      {
        roomId: '2',
        guestEmail: 'test@gmail.com',
        checkinDate: new Date('10-feb-2022'),
        checkoutDate: '',
        bookingStatus: '',
        bookingAmount: '',
        bookingDate: '',
        mobileNumber: '',
        guestName: '',
        address: this.formBuilder.group({
          AddressLine1: '',
          AddressLine2: '',
          City: '',
          State: '',
          Country: '',
          ZipCode: '',
        }),
        guests: [],
        tnc: false
    })
  }

  addGuest() {
    this.guests.push(this.addGuestControl());
  }

  addGuestControl() {
    return this.formBuilder.group({
      guestName: ['', [Validators.required]],
      age: new FormControl('', [Validators.required]),
    });
  }

  addPassword() {
    this.bookingForm.addControl('passport', new FormControl(''));
  }

  removePassword() {
    if (this.bookingForm.get('passport')) {
      this.bookingForm.removeControl('passport');
    }
  }

  RemoveGuest(i: number) {
    this.guests.removeAt(i);
  }
}
