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

  public pendingClick:any;
  public clicked = 0;

  startTimer() {
    this.isRunning = !this.isRunning;
    timer(0, 1000).subscribe(() => {
      if (this.isRunning) {
        this.time++;
        this.formatTime(this.time);
      }
    });
  }

  stopTimer() {
    this.time = 0;
    this.isRunning = !this.isRunning;
    this.formatTime(0)
  }

  toggleTimer() {
    this.isRunning ? this.stopTimer() : this.startTimer();
  }

  waitTimer() {
    if (this.isRunning) {
      this.isRunning = !this.isRunning;
      this.formatTime(this.time);
    } else {
      this.startTimer();
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
        this.startTimer();
      }
      this.clicked = 0;
    }, 500);
  }

  dblClick() {
    this.waitTimer();
  }

  resetTimer() {
    if (this.isRunning) {
      this.time = 0
      this.isRunning = !this.isRunning;
      this.startTimer()
    } else {
      this.time = 0
      this.startTimer()
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
