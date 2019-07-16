import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../settings.service';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(
    private http: Http,
    private settingsService: SettingsService,
    private router: Router
  ) { }

  loading = true;
  settings;
  stories;

  ngOnInit() {
    this.http.get("./assets/stories.json").subscribe((res:any) => {
      this.stories = res.json().missions;
      this.loading = false;
    }, (error:any) => console.log(error));

    this.settings = this.settingsService.getAll();
  }

  saveAppSettings(settings) {
    this.settingsService.saveNew(settings);
    this.router.navigate(['']);
  }

  clearAppSettings() {
    this.settings = {};
    this.settingsService.saveNew({});
  }
}
