import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.scss']
})
export class StoriesComponent implements OnInit {

  constructor(
    private http: Http,
    private settingsService: SettingsService
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
}
