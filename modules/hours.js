export class Hora {
    constructor(json) {
        this.hora = json.time.substring(11);
        this.icon = json.condition.icon;
        this.text = json.condition.text;
        this.tempActual = Math.trunc(json.temp_c) + "ºC";
        this.wind = "Viento: " + json.wind_kph + "Km/h " + json.wind_dir; 
        this.rain = "Lluvia: " + json.precip_mm + "mm";
        this.humidity = "Humedad: " + json.humidity + "%";
        this.pressure = "Presión: " + json.pressure_mb + "mb";
        this.feelslike = "Sensación térmica: " + Math.trunc(json.feelslike_c)  + "ºC";
        this.rocio = "Punto de rocío: " + Math.trunc(json.dewpoint_c) + "ºC";
        this.uv = json.uv + "uv";
    }
}