import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent implements OnInit {
  lat: string;
  lon: string;
  data: any = [];
  city: any;
  description : any;
  temp;
  feels_like;
  humidity;
  wind_speed;
  url = ``;
  locationUrl = ``;
  icon:any;
  constructor(private http: HttpClient) {}

  ngOnInit() {
    navigator.geolocation.getCurrentPosition((position: any) => {
      this.lat = position.coords.latitude;
      this.lon = position.coords.longitude;

      this.url =
        'http://localhost:3000/getWeather/' + this.lat + '/' + this.lon;
      this.locationUrl =
        'http://localhost:3000/getLocation/' + this.lat + '/' + this.lon;

      this.http.get(this.url).subscribe((res) => {
        this.data = res;
        this.description = this.data.current.weather[0].description;
        this.humidity = this.data.current.humidity;
        this.wind_speed = this.data.current.wind_speed;
        this.data.current.temp = (Number(this.data.current.temp) * 1.8 - 459.67).toFixed();
        this.data.current.feels_like = (Number(this.data.current.feels_like) * 1.8 - 459.67).toFixed();
        this.temp = this.data.current.temp;
        this.feels_like = this.data.current.feels_like;
        this.icon =
          `http://openweathermap.org/img/w/` +
          this.data.current.weather[0].icon +
          `.png`;

        this.http.get(this.locationUrl).subscribe((resp) => {
          this.city = resp
          let length = this.city.plus_code.compound_code.split(" ").length;
          this.city = this.city.plus_code.compound_code.split(" ").slice(1, length).toString().replaceAll(',', ' ');
        });
      });
    });
  }
}
