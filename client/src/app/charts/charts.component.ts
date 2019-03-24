import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import {Router} from "@angular/router";
import { AuthSecureService } from '../services/auth-secure.service';
import { AuthenticationService } from '../services/authentication.service';
//mport { HttpClient } from '@angular/common/https';
//import { HttpErrorResponse } from '@angular/common/https';
import {HttpClientModule} from '@angular/common/http';
import {Chart} from 'chart.js';  
import { element } from '@angular/core/src/render3';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {

  temp;
  chart = [];
  tempArray=[];
  public barChartLabels =['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [];

  public pieChartLabels = ['Sales Q1', 'Sales Q2', 'Sales Q3', 'Sales Q4'];
  public pieChartData = [120, 150, 180, 90];
  public pieChartType = 'pie';
  dataLoaded=false;

  OFFENSE_CODE_GROUP: Array<Object> =[];
  objectMap={
    OFFENSE_CODE_GROUP:'',
    MONTH:0,
    DAY_OF_WEEK:''
  };

  crimePerDay={
    monday:0,
    tuesday:0,
    wednesday:0,
    thursday:0,
    friday:0,
    saturday:0,
    sunday:0
  }

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  constructor(private auth:AuthenticationService) { }

  ngOnInit() {
    
  }

  ngAfterViewInit() {
    this.getalldata();
  }

  getalldata() {
    
      this.auth.getAllData().subscribe((info) => {
          
          let count=0;
          info.forEach(element => {
             switch(element.DAY_OF_WEEK){
               case 'Monday':
                     this.crimePerDay.monday++;
                     break;
               case 'Tuesday':
                     this.crimePerDay.tuesday++;break;
               case 'Wednesday':
                     this.crimePerDay.wednesday++;break;
               case 'Thursday' :
                     this.crimePerDay.thursday++;break;
               case 'Friday':
                     this.crimePerDay.friday++;break;
               case 'Saturday':
                     this.crimePerDay.saturday++;break;
               case 'Sunday' :
                     this.crimePerDay.sunday++;break;
             }
      });
      this.tempArray.push(this.crimePerDay.monday);
      this.tempArray.push(this.crimePerDay.tuesday);
      this.tempArray.push(this.crimePerDay.wednesday);
      this.tempArray.push(this.crimePerDay.thursday);
      this.tempArray.push(this.crimePerDay.friday);
      this.tempArray.push(this.crimePerDay.saturday);
      this.tempArray.push(this.crimePerDay.sunday);
      
      this.barChartData = [
        {data: [this.crimePerDay.monday,this.crimePerDay.tuesday,this.crimePerDay.wednesday,this.crimePerDay.thursday,this.crimePerDay.friday,this.crimePerDay.saturday,this.crimePerDay.sunday], 
        label: 'Crimes Per Day',
        "fill":false,
        "backgroundColor":[  
           "rgba(255, 99, 132, 0.2)",
           "rgba(255, 159, 64, 0.2)",
           "rgba(255, 205, 86, 0.2)",
           "rgba(75, 192, 192, 0.2)",
           "rgba(54, 162, 235, 0.2)",
           "rgba(153, 102, 255, 0.2)",
           "rgba(201, 203, 207, 0.2)"
        ],
        "borderColor":[  
           "rgb(255, 99, 132)",
           "rgb(255, 159, 64)",
           "rgb(255, 205, 86)",
           "rgb(75, 192, 192)",
           "rgb(54, 162, 235)",
           "rgb(153, 102, 255)",
           "rgb(201, 203, 207)"
        ],
        "borderWidth":1
      }
        
      ];
      
      this.dataLoaded=true;
    });
  }
}
