import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.scss']
})
export class StoriesComponent implements OnInit {

  constructor(
    private http: Http,
    private firestore: AngularFirestore,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  loading = true;
  stories;
  mission;

  ngOnInit() {
    this.http.get("./assets/stories.json").subscribe((res:any) => {
      this.stories = res.json().missions;
      this.loading = false;

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
    }, (error:any) => console.log(error));
  }
}
