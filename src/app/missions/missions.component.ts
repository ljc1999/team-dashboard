import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { SettingsService } from '../settings.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from '../user.service';

@Component({
  selector: 'app-missions',
  templateUrl: './missions.component.html',
  styleUrls: ['./missions.component.scss']
})
export class MissionsComponent implements OnInit {

  constructor(
    public http: Http,
    public firestore: AngularFirestore,
    public userService: UserService
  ) { }
  
  stories;
  missions;
  missionData = {};

  ngOnInit() {
    this.http.get("./assets/stories.json").subscribe((res:any) => {
      this.stories = res.json().missions;
    }, (error:any) => console.log(error));

    this.firestore.collection("missions").get().subscribe(data => {
      this.missions = data.docs;
      console.log(data);
    });
  }

  newMission() {
    if(this.missionData['stories'] && this.missionData['robotHireCost']) {
      this.firestore.collection("missions").add({
        stories: this.missionData['stories'],
        robotHireCost: this.missionData['robotHireCost']
      }).then(ref => {
        console.log("Mission Created (" + ref.id + ")");
      }).catch(ref => {
        console.log(ref);
      });
    }
  }
}
