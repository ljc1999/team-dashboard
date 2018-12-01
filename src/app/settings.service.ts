import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private settings = {};

  constructor(
    private storage: LocalStorageService
  ) {
    this.load();
  }

  get(key: string) {
    return this.settings[key];
  }

  set(key: string, value: any) {
    this.settings[key] = value;
  }

  getAll() {
    return this.settings;
  }

  load() {
    let settings = this.storage.get("settings");
    if(settings) {
      this.settings = settings;
    }
  }

  save() {
    this.storage.set("settings", this.settings);
  }

  saveNew(settings) {
    this.settings = settings;
    this.save();
  }
}
