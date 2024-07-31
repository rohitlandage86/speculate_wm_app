import { Component, OnInit } from '@angular/core'
import { FormControl } from '@angular/forms'
import { GamblerService } from '../gambler.service'
import { environment } from 'src/environments/environments'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  isClicked = false
  isExpanded: boolean = false
  isMoreActive: boolean = false
  isLessActive: boolean = false
  isMoreClicked: boolean = false
  isLessClicked: boolean = false
  i: number = 0
  page = 1
  perPage = 50
  total = 0
  allSportsList: Array<any> = []
  allBettingBetwmaList: Array<any> = []
  allConfiguration: Array<any> = []
  allSportsDatatList: Array<any> = []
  baseUrlImage = environment.baseUrlImage
  selectedPlayers: any[] = []

  dynamicPlayControl = new FormControl(false)
  intensePlayControl = new FormControl(false)
  activeButtonIndex: number = 0
  sport_id: any
  betting_bet_type_id: any
  player: any
  constructor(private _gamblerService: GamblerService) { }
  ngOnInit() {
    this.getAllSportswmaList()
  }
  setActiveButton(index: number): void {
    this.activeButtonIndex = index
  }
  toggleButton() {
    this.isClicked = !this.isClicked
    this.isExpanded = !this.isExpanded
  }
  onSelectPlayer(player: any, type: string) {
    this.selectedPlayers.push(player)
    this.isExpanded = true
    player.clicked = !player.clicked
    if (type === 'more') {
      player.clickedMore = !player.clickedMore
      player.clickedLess = false
    } else if (type === 'less') {
      player.clickedLess = !player.clickedLess
      player.clickedMore = false
    }
  }
  onRemovePlayer(player: any) {
    const index = this.selectedPlayers.indexOf(player)
    if (index !== -1) {
      this.selectedPlayers.splice(index, 1) // Remove player from selected players array
    }
  }

  onCheckboxChange(player: any, type: string) {
    if (type === 'dynamic') {
      if (this.dynamicPlayControl.value) {
        this.intensePlayControl.setValue(false)
      }
    } else if (type === 'intense') {
      if (this.intensePlayControl.value) {
        this.dynamicPlayControl.setValue(false)
      }
    }
    const selectedIndex = this.selectedPlayers.findIndex(
      p => p.id === player.id
    )
    if (selectedIndex === -1) {
      this.selectedPlayers.push(player)
    }
  }
  removePlayer(index: number) {
    const player = this.selectedPlayers[index]
    player.clickedMore = false
    player.clickedLess = false
    this.selectedPlayers.splice(index, 1)
  }

  handleButtonClick(index: number, sport_id: any): void {
    this.setActiveButton(index)
    this.sport_id = sport_id
    this.getBettingBetwma(sport_id)
  }
  //get all sports List...
  getAllSportswmaList() {
    this._gamblerService.getAllSportswmaList().subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allSportsList = res.data
          this.getBettingBetwma(this.allSportsList[0].sport_id)
          this.sport_id = this.allSportsList[0].sport_id
        }else{
          this.allSportsList = [];
        }

      }
    })
  }
  //get betting bet wam sport by id
  getBettingBetwma(id: any) {
    this._gamblerService.getAllBettingbetwma(id).subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allBettingBetwmaList = res.data
          if (this.allBettingBetwmaList[0]?.betting_bet_type_id) {
            this.getAllSportsDataList(
              this.allBettingBetwmaList[0]?.betting_bet_type_id
            )
          }
        } else {
          this.allSportsDatatList = []
        }
      }
    })
  }

  // Fetch all sports data list based on betting_bet_type_id
  getAllSportsDataList(betting_bet_type_id: any) {
    this._gamblerService
      .getAllSportsDataLists(
        this.sport_id,
        betting_bet_type_id,
        '1',
        '2024-07-14',
        '2'
      )
      .subscribe({
        next: (res: any) => {
          if (res.data.length > 0) {
            this.allSportsDatatList = res.data
          } else {
            this.allSportsDatatList = []
          }
        }
      })
  }
}
