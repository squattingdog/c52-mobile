import { JobItem } from './../../providers/campaign-service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss'],
})
export class JobComponent implements OnInit {
  @Input() job: JobItem;

  constructor() { }

  ngOnInit() {}

}
