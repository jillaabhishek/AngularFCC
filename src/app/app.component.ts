import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewContainerRef, Inject } from '@angular/core';
import { RoomsComponent } from './rooms/rooms.component';
import  {LocalStorageToken} from '../app/localstorage.token';
import { InitService } from './init.service';
import { ConfigService } from './services/config.service';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit, AfterViewInit{

  constructor(@Inject(LocalStorageToken) private localStorage:Storage,
            private initService: InitService, 
            private configService: ConfigService,
            private router: Router){
    localStorage.setItem('AJ', 'Abhishek');
    console.log(initService.config);
  }

  ngAfterViewInit(): void {
    // const componentRef = this.vcr.createComponent(RoomsComponent);
    // componentRef.instance.nummerOfRooms = 50;    
  }
  ngOnInit(): void {
    this.name.nativeElement.innerHTML = "Abhishek" 

    //this.router.events.subscribe((event) => {console.log(event);})
    this.router.events.pipe(
      filter((event) => event instanceof NavigationStart))
        .subscribe((event) => {
          console.log("Navigation Started");
      })

      this.router.events.pipe(
        filter((event) => event instanceof NavigationEnd))
          .subscribe((event) => {
            console.log("Navigation End");
        })
  }
  title = 'HotelInventoryApp';

  @ViewChild('user', {read:ViewContainerRef}) vcr!: ViewContainerRef;

  @ViewChild('name', {static:true}) name!: ElementRef;
}
