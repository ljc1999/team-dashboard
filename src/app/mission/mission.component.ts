import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { TeamService } from '../team.service';
import { SettingsService } from '../settings.service';
import * as _ from 'underscore';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-mission',
  templateUrl: './mission.component.html',
  styleUrls: ['./mission.component.scss']
})
export class MissionComponent implements OnInit {

  constructor(
    private http: Http,
    private teamService: TeamService,
    private settingsService: SettingsService,
    private route: ActivatedRoute,
    private router: Router,
    private firestore: AngularFirestore
  ) { }

  loading = true;
  teams;
  settings;
  graphsReady = false;
  teamTotals;
  highChart;

  teamTotalsChart;
  riseFallChart;

  mission;

  ngOnInit() {
    this.route.params.subscribe(params => {
        if(params["id"]) {
            this.firestore.collection("missions").doc(params["id"]).get().subscribe(doc => {
                this.mission = doc;
                this.loading = false;
                console.log(doc);
            });
        } else {
            this.router.navigate(['/']);
        }
    });
    this.settings = this.settingsService.getAll();
    this.teams = _.sortBy(this.teamService.get(), function(data) { return -data.balance; });

    let series = [];

    _.each(this.teams, (team) => {
        series.push({
            name: team.name,
            data: [team.balance]
        });
    });

    this.teamTotalsChart = {
        chart: {
            type: 'column'
        },
        title: {
            text: ''
        },
        yAxis: {
            min: 0,
            title: {
                text: ''
            }
        },
        tooltip: {
            headerFormat: '<b>{series.name}</b><br/>',
            pointFormat: '{point.y}'
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        colors: ['#e6194B', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#42d4f4', '#f032e6', '#bfef45', '#fabebe'],
        series: _.sortBy(series, "name")
    };

    series = [];

    _.each(this.teams, (team) => {
        let data = [];

        _.each(team.transactions, (transaction) => {
            data.push([transaction.time, transaction.balance]);
        });

        series.push({
            name: team.name,
            data: data
        });
    });

    this.riseFallChart = {
        chart: {
            type: 'spline'
        },
        title: {
            text: ''
        },
        xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: {
                month: '%e. %b',
                year: '%b'
            }
        },
        yAxis: {
            title: {
                text: ''
            },
            min: 0
        },
        tooltip: {
            headerFormat: '<b>{series.name}</b><br>',
            pointFormat: '{point.y}'
        },
        plotOptions: {
            spline: {
                marker: {
                    enabled: true
                }
            }
        },
        colors: ['#e6194B', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#42d4f4', '#f032e6', '#bfef45', '#fabebe'],
        series: series
    };
  }

  buildTables() {
    for(var i = 0; i <= this.teams.length; i++) {
      var transactions = this.teams[i].transactions;
      var highestTrans = { title: 'Story 0' };

      for (var j = 1; j <= transactions.length; j++) {
        // get the number from each, saving the current highest locally
        try {
          if ( parseInt(transactions[j].title.substr(6)) > parseInt(highestTrans.title.substr(6))) {
            // save the highest trans
            highestTrans.title = transactions[j].title;
          }
        } catch (e) {}
      }
      this.teams[i].currentStory = highestTrans.title;
    }
  }
}
