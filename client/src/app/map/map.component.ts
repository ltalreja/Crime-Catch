import {CrimefilterService} from './../services/crimefilter.service';
import {Router} from '@angular/router';
import {HttpParams} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
	constructor(private crimefilter: CrimefilterService, private router: Router) {
	}
	ngOnInit() {
		this.getallstreets();
		this.getallcrimeTypes();
	}

	lastSelectedInfoWindow: any;
	show: boolean = false;
  inputText = '';
	crimetext = '';
	crimetype: Array < Object > = [];
  temp: Array<Object> = [];
	Street: Array < Object > = [];
  params: HttpParams;
  parameter: Array<Map<String, String>>;

	//function to allow only one tooltip visible at a time
	markerClick(infoWindow: any) {

		if (infoWindow == this.lastSelectedInfoWindow) {
			return;
    }
		if (this.lastSelectedInfoWindow != null) {
			try {
				this.lastSelectedInfoWindow.close();
			} catch {} //in case if you reload your markers
    }
		this.lastSelectedInfoWindow = infoWindow;
  }

	//function to get  filter crimes based on Street
  getcrime() {
    this.temp = [];
		let date;
    this.params = new HttpParams().set('STREET', this.inputText);
		if (this.inputText != '') {
			this.crimefilter.getCrimes(this.params).subscribe((info) => {
				for (let k = 0; k < info.length; k++) {
					this.temp.push(info[k]);
				}
			});
		}
	}

	//function to filter crimes based on  Offense_Code_Group
	filtercrimetype() {
		this.temp = [];
		let date;
		this.params = new HttpParams().set('OFFENSE_CODE_GROUP', this.crimetext);
		if (this.crimetext != '') {
      this.crimefilter.getCrimes(this.params).subscribe((info) => {

        for (let k = 0; k < info.length; k++) {

          this.temp.push(info[k]);
				}
			});
		}
  }

	//function to filter streets and OFFENSE_CODE_GROUP
	filtercrimestreet() {
		this.temp = [];
		let date;
		this.params = new HttpParams().set('OFFENSE_CODE_GROUP', this.crimetext).set('STREET', this.inputText);
		if (this.crimetext != '') {
			this.crimefilter.getCrimes(this.params).subscribe((info) => {
				for (let k = 0; k < info.length; k++) {
					this.temp.push(info[k]);
				}
			});
		}
	}
	//Function to populate dropdown with unique values for street
	getallstreets() {
		this.Street = [];
		this.crimefilter.getstreets().subscribe((crimes) => {
			for (let k = 0; k < crimes.length; k++) {

				this.Street.push(crimes[k]);
			}
    });
  }
	//Function to populate dropdown with unique values for OFFENSE_CODE_GROUP
	getallcrimeTypes() {
		this.crimetype = [];
		this.crimefilter.getoffense().subscribe((crimestype) => {
			for (let k = 0; k < crimestype.length; k++) {
				this.crimetype.push(crimestype[k]);
			}
		});
  }

	//Function to show popup if both filters and empty
	showPopup() {
		console.log(this); //Show is false
		this.show = true;
		alert("Please select a valid filter"); //Show is true but does not trigger the show class
	}
	//To execute particular function based on input parameters
	getfunction() {
		if (this.inputText === "" && this.crimetext !== "")
			this.filtercrimetype();
		else if (this.inputText !== "" && this.crimetext === "")
			this.getcrime();
		else if (this.inputText !== "" && this.crimetext !== "")
			this.filtercrimestreet();
		else if (this.inputText === "" && this.crimetext === "") {
			this.temp = [];
			this.showPopup();
		}
	}

	//Return different icon for each crime type
	getIcon(OFFENSE_CODE_GROUP) {
		switch (OFFENSE_CODE_GROUP) {
			case 'Larceny':
				return "../../assets/images/guns.png";
			case "Investigate Property":
				"../../assets/images/mask.png";;
			case "Simple Assault":
				return "../../assets/images/guns.png";
			case "Medical Assistance":
				return "../../assets/images/attack.png";
			case "Aggravated Assault":
				return "../../assets/images/attack.png";
			case "Warrant Arrests":
				return "../../assets/images/mask.png";
			case "Investigate Person":
				return "../../assets/images/spy.png";
			case "Investigate Property":
				return "../../assets/images/gun.png";
			case "Motor Vehicle Accident Response":
				return "../../assets/images/accidental.png";
			case "Robbery":
				return "../../assets/images/attack.png";
			case "ASSAULT SIMPLE - BATTERY":
				return "../../assets/images/guns.png";
			case "Larceny From Motor Vehicle":
				return "../../assets/images/cartheft.png";
			case "Vandalism":
				return "../../assets/images/vandalism.png";
			case "Property Lost":
				return "../../assets/images/pl.png";
			case "Towed":
				return "../../assets/images/towed.png";
			case "Disorderly Conduct":
				return "../../assets/images/disorderly-conduct-icon.png";
			case "Fraud":
				return "../../assets/images/Fraud.png";
			case "Auto Theft":
				return "../../assets/images/noir.png";
			case "Embezzlement":
				return "../../assets/images/gun.png";
			case "Violations":
				return "../../assets/images/violation.jpg";
			case "Liquor Violation":
				return "../../assets/images/Alcohol.png";
			case "Recovered Stolen Property":
				return "../../assets/images/recoverstolenproperty.jpg";
			case "Residential Burglary":
				return "../../assets/images/icons8-burglary-50.png";
			case "Confidence Games":
				return "../../assets/images/confidencegame.png";
			case "Residential Burglary":
				return "../../assets/images/icons8-burglary-50.png";
			case "Restraining Order Violations":
				return "../../assets/images/ordervilations.png";
			case "Missing Person Reported":
				return "../../assets/images/spy.png";
			case "Harassment":
				return "../../assets/images/harrasement.png";
			case "Ballistics":
				return "../../assets/images/Ballistics.png";
			case "Auto Theft Recovery":
				return "../../assets/images/mask.png";
			case "HOME INVASION":
				return "../../assets/images/mask.png";
			case "Verbal Disputes":
				return "../../assets/images/verbaldisputes.png";
			case "Landlord/Tenant Disputes":
				return "../../assets/images/landlord.jpg";
			case "Firearm Violations":
				return "../../assets/images/firearm.jpg";
			case "Other Burglary":
				return "../../assets/images/spy.png";
			case "Missing Person Located":
				return "../../assets/images/mask.png";
			case "Property Found":
				return "../../assets/images/noir.png";
			case "Prisoner Related Incidents":
				return "../../assets/images/prisoner.png";
			case "License Plate Related Incidents":
				return "../../assets/images/cartheft.png";
			case "Property Related Damage":
				return "../../assets/images/pl.png";
			case "Commercial Burglary":
				return "../../assets/images/icons8-burglary-50.png";
			case "Police Service Incidents":
				return "../../assets/images/spam.png";;
			case "Arson":
				return "../../assets/images/spam.png";
			case "License Violation":
				return "../../assets/images/violation.jpg";
			case "Assembly or Gathering Violations":
				return "../../assets/images/violation.jpg";
			case "Counterfeiting":
				return "../../assets/images/Fraud.png";
			case "Search Warrants":
				return "../../assets/images/handcuff.jpg";
			case "Phone Call Complaints":
				return "../../assets/images/phone.png";
			case "Firearm Discovery":
				return "../../assets/images/firearm.jpg";
			case "Homicide":
				return "../../assets/images/mask.png";
			case "Offenses Against Child / Family":
				return "../../assets/images/harrasement.png";
			case "Criminal Harassment":
				return "../../assets/images/mask.png";
			case "Aircraft":
				return "../../assets/images/guns.png";
			case "Evading Fare":
				return "../../assets/images/noir.png";
			case "Harbor Related Incidents":
				return "../../assets/images/alert.png";
			case "other":
				return "../../assets/images/others.png"
		}
	}
}
