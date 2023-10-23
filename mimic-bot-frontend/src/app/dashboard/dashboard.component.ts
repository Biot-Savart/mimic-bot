import { Component, OnInit } from '@angular/core';
import { DashboardService } from './services/dashboard.service';

interface ICommand {
  request?: string;
  response?: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  commands: ICommand[] = [];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.listen('command').subscribe((data: any) => {
      console.log(data);
      this.commands.push({
        request: data.request,
        response: data.response,
      });
    });
  }
}
