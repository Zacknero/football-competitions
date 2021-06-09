import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

interface Competition {
  name: string;
  country: string;
  year: number;
  winner: string;
  runnerup: string;
}

interface ApiResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: Competition[];
}

@Component({
  selector: 'football-competitions',
  templateUrl: './footballCompetitions.component.html',
  styleUrls: ['./footballCompetitions.component.scss']
})
export class FootballCompetitions implements OnInit {
  
  listCompetitions: Array<Competition> = [];
  numberBtn = [];
  
  constructor(private http: HttpClient) {
  }
  
  ngOnInit(): void {
    this.changeList(1);
  }
  
  changeList(n: number) {
    this.http.get<ApiResponse>(`https://jsonmock.hackerrank.com/api/football_competitions?page=${n}`).subscribe(
      comp => {
        this.numberBtn = [...Array(comp.total_pages + 1).keys()];
        this.numberBtn.shift();
        this.listCompetitions = comp.data;
      }
    );
  }
  
}
