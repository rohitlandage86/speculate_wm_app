import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { GamblerService } from '../gambler.service';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit  {
  isClicked = false;
  isExpanded: boolean = false;
  isMoreActive: boolean = false;
  isLessActive: boolean = false;
  isMoreClicked: boolean = false;
  isLessClicked: boolean = false;
  i: number = 0;
  page = 1;
  perPage = 50;
  total = 0;
  allSportsList: Array<any> = [];
  allBettingBetwmaList: Array<any> =[];
  allConfiguration:Array<any> = [];
  baseUrlImage = environment.baseUrlImage;
  selectedPlayers: any[] = [];
  playersList = [
    { name: 'Stephen Curry', points: 26.0, imgSrc: 'dash-point-card-stephen curry.svg', team: 'GSW-G', match: 'Vs. Sac Mon 10:10pm', clickedMore: false, clickedLess: false },
    { name: 'Derrick White', points: 4.5, imgSrc: 'white.svg', team: 'GSW-G', match: 'Vs. Sac Mon 10:10pm', clickedMore: false, clickedLess: false },
    { name: 'Dereck Lively II', points: 8.0, imgSrc: 'dereck.svg', team: 'GSW-G', match: 'Vs. Sac Mon 10:10pm', clickedMore: false, clickedLess: false },
    { name: 'Jonathan Kuminga', points: 26.0, imgSrc: 'jonathan.svg', team: 'GSW-G', match: 'Vs. Sac Mon 10:10pm', clickedMore: false, clickedLess: false },
    { name: 'Luka Doncic', points: 32.5, imgSrc: 'luka.svg', team: 'GSW-G', match: 'Vs. Sac Mon 10:10pm', clickedMore: false, clickedLess: false },
    { name: 'Donovan Mitchell', points: 25.5, imgSrc: 'Donavan.svg', team: 'GSW-G', match: 'Vs. Sac Mon 10:10pm', clickedMore: false, clickedLess: false },
    { name: 'RJ Barrett', points:22.5, imgSrc: 'RJ 1.svg', team: 'GSW-G', match: 'Vs. Sac Mon 10:10pm', clickedMore: false, clickedLess: false },
    { name: 'Tyrese Maxey', points: 9.5, imgSrc: 'Maxey.svg', team: 'GSW-G', match: 'Vs. Sac Mon 10:10pm', clickedMore: false, clickedLess: false },
    { name: 'P.J.Washington', points: 5.0, imgSrc: 'Washington.svg', team: 'GSW-G', match: 'Vs. Sac Mon 10:10pm', clickedMore: false, clickedLess: false }
  ];
  dynamicPlayControl = new FormControl(false);
  intensePlayControl = new FormControl(false);
  activeButtonIndex: number = 0;
  sport_id:any;
  constructor(private _gamblerService: GamblerService){}
  ngOnInit() {
this.getAllSportswmaList();
 
  }
  setActiveButton(index: number): void {
    this.activeButtonIndex = index;
  }
  toggleButton() {
    this.isClicked = !this.isClicked;
    this.isExpanded = !this.isExpanded;
  }
  onSelectPlayer(player: any , type: string) {
    this.selectedPlayers.push(player); 
    this.isExpanded = true;
    player.clicked = !player.clicked;
    if (type === 'more') {
      player.clickedMore = !player.clickedMore;
      player.clickedLess = false;
    } else if (type === 'less') {
      player.clickedLess = !player.clickedLess;
      player.clickedMore = false;
    }
  }
  onRemovePlayer(player: any) {
    const index = this.selectedPlayers.indexOf(player);
    if (index !== -1) {
      this.selectedPlayers.splice(index, 1); // Remove player from selected players array
    }
  }

  onCheckboxChange(type: string) {
    if (type === 'dynamic') {
      if (this.dynamicPlayControl.value) {
        this.intensePlayControl.setValue(false);
      }
    } else if (type === 'intense') {
      if (this.intensePlayControl.value) {
        this.dynamicPlayControl.setValue(false);
      }
    }
  }
  removePlayer(index: number): void {
    this.selectedPlayers.splice(index, 1);
  }
   //get all sports List...
   getAllSportswmaList() {
    this._gamblerService.getAllSportswmaList().subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.sport_id = res.data[0].sport_id
    this.getBettingBetwma(this.sport_id)
    this.getConfigurationbyBaseUrl(this.sport_id)
         this.allSportsList = res.data;
     
        }
      }
    });
  }
  //get betting bet wam sport by id
  getBettingBetwma(id:any){
    this._gamblerService.getAllBettingbetwma(id).subscribe({
      next: (res: any) => {
        if (res.data.length >= 0) {
     
        this.allBettingBetwmaList = res.data;
        }
      },
    });
}
  //get configuration base url by id
  getConfigurationbyBaseUrl(id:any){
    this._gamblerService.getConfigurationbyBaseUrl(id).subscribe({
      next: (res: any) => {
        if (res.data.length >= 0) {
     console.log('data',res);
        this.allConfiguration = res.data;
        }
      },
    });
}
}
