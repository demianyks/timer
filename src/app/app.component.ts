import {Component} from '@angular/core';
import {timer} from "rxjs";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public displayTimer: string = '00:00';
  public isRunning: boolean = false;
  public time: number = 0;
  public subscriptionLive: any;
  public pendingClick: any;
  public clicked = 0;

  toggleTimer(t:number) {
    this.isRunning = !this.isRunning;
    const subscription = timer(0, 1000).subscribe(() => {
      if (this.isRunning) {
        t++;
        this.formatTime(t);
        this.subscriptionLive = subscription;
        this.time = t
      } else {
        t = 0;
        this.formatTime(t);
        subscription.unsubscribe();
      }
    })
  }

  waitTimer() {
    if (this.isRunning) {
      this.formatTime(this.time);
      console.log(this.displayTimer)
      this.isRunning = !this.isRunning;
    } else {
      this.toggleTimer(this.time);
    }
  }

  clickCheck() {
    this.clicked++;
    if (this.clicked >= 2) {
      this.dblClick()
      clearTimeout(this.pendingClick)
      this.clicked = 0;
      return;
    }
    clearTimeout(this.pendingClick)
    this.pendingClick = setTimeout(() => {
      if (!this.isRunning) {
        this.toggleTimer(this.time);
      }
      this.clicked = 0;
    }, 500);
  }

  dblClick() {
     this.waitTimer();
  }

  resetTimer() {
    if (this.isRunning && this.subscriptionLive) {
      this.isRunning = !this.isRunning;
      this.subscriptionLive.unsubscribe();
      this.toggleTimer(0);
    } else {
      this.toggleTimer(0)
    }
  }

  formatTime(time: number) {
    let min: string = '' + Math.floor(time % 3600 / 60);
    let sec: string = '' + Math.floor(time % 3600 % 60);

    if (Number(min) < 10) {
      min = '0' + min;
    }
    if (Number(sec) < 10) {
      sec = '0' + sec;
    }
    this.displayTimer = min + ':' + sec;
  }
}
