export class Actuality{
    constructor(json){
        this.icon = json.current.condition.icon;
        this.temp = Math.trunc(json.current.temp_c) + "ºC";
        this.feelslike = "Sensación térmica de " + Math.trunc(json.current.feelslike_c) + "ºC";
        this.hora = json.location.localtime.substring(11) + " h.";
        this.wind = json.current.wind_kph + "Km/h " + json.current.wind_dir;
        this.rain = json.current.precip_mm + "mm";
        this.humidity = json.current.humidity + "%";
        this.pressure = json.current.pressure_mb + "mb";
    }   
}