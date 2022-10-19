import { Component, OnInit } from '@angular/core';
import { StateService } from '../services/state.service';

@Component({
  selector: 'app-pangolin',
  templateUrl: './pangolin.component.html',
  styleUrls: ['./pangolin.component.css']
})
export class PangolinComponent implements OnInit {

  constructor(private state: StateService) { }

  ngOnInit() {
    this.state.part$.next(1);
    this.state.part = 1;
  }

}
