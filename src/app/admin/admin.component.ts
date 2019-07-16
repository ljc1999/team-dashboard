import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { SettingsService } from '../settings.service';
import { TeamService } from '../team.service';
import * as _ from 'underscore';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(
    private http: Http,
    private settingsService: SettingsService,
    private teamService: TeamService
  ) { }

  loading = true;
  stories;
  settings;
  teams;

  taskCompleted:any = {};
  costIncurred:any = {};
  bonus:any = {};

  newTeam:any = {};
  deleteTeam:any = {};
  updateTeam:any = {};

  minutes:any = [];

  ngOnInit() {
    this.http.get("./assets/stories.json").subscribe((res:any) => {
      this.stories = res.json().missions;
      this.loading = false;
    }, (error:any) => console.log(error));

    this.settings = this.settingsService.getAll();
    this.teams = this.teamService.get();

    for(let i=1; i<=50; i++) {
      this.minutes.push(i);
    }
  }

  saveTransaction(title, delta, teamName) {
    var transaction;
    if (this.taskCompleted["value"] && this.taskCompleted["value"].length > 0) {
      delta = this.taskCompleted["value"];
    } else {
      delta = delta || 0;
    }

    transaction = {
        time: new Date().getTime(),
        title: title,
        delta: delta
    };

    let team;
    this.teams = _.reject(this.teams, function(t) {
      if(teamName == t.name) {
        team = t;
      }

      return teamName == t.name;
    });

    team["balance"] = parseFloat(team["balance"]) + parseFloat(delta);
    transaction.balance = team["balance"];
    team["transactions"].push(transaction);

    if(this.taskCompleted["description"]) {
      team["currentStory"] = this.taskCompleted["description"];
    }

    this.teams.push(team);
    this.teamService.save(this.teams);
  }

  addTeam(team) {
    if(this.newTeam["name"]) {
      team.balance = team.balance || 0;
      team.transactions = [{
          time: new Date().getTime(),
          title: 'Initial Investment',
          delta: 0,
          balance: team.balance
      }];

      this.teams.push(team);
      this.teamService.save(this.teams);

      this.newTeam = {
          balance: '',
          name: ''
      };
    }
  }

  removeTeam(oldTeam) {
    if(oldTeam) {
      this.teams = _.reject(this.teams, function(team) {
        return team.name == oldTeam;
      });
    }
  }

  saveCost = function(costIncurred) {
    if (costIncurred.secret === 'secret') {
      var cost = this.settings.robotHireCost * costIncurred.value;
      this.saveTransaction('Cost Incurred', cost, costIncurred.team);
      this.costIncurred = {value: '', description: ''};
    }
  }

  savePayout(taskDetails) {
    if (taskDetails.secret === 'secret') {
      this.saveTransaction(taskDetails.description, taskDetails.value, taskDetails.team);
      this.taskCompleted = {value: '', description: ''};
    }
  }

  saveBonus(bonus) {
    if (bonus.secret === 'secret') {
      this. saveTransaction('bonus', bonus.value, bonus.team);
      this.bonus = {value: '', description: ''};
    }
  }

  updatePayout() {
    var storyID = 's' + this.taskCompleted["description"].substr(6);
    var missions = this.stories[this.settings.stories];

    for (var i = 0; i < missions.length; i++) {
      if (missions[i].id === storyID) {
        this.taskCompleted["value"] = missions[i].value;
      }
    }
  }
}
