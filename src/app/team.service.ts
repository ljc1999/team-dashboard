import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private teams = [];

  constructor(
    private storage: LocalStorageService
  ) {
    this.load();
  }

  get() {
    return this.teams;
  }

  load() {
    let teams = this.storage.get("teams");
    if(teams) {
      this.teams = <any[]>teams;
    }
  }

  save(teams) {
    this.teams = teams;
    this.storage.set("teams", this.teams);
  }
}
