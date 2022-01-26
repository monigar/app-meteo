export class Day{
    constructor(json ){
        this.day = json.date;
        this.icon = json.day.condition.icon;
        this.tempMax = Math.trunc(json.day.maxtemp_c) + "ºC";
        this.tempMin = Math.trunc(json.day.mintemp_c) + "ºC";
        this.cel = json.day.condition.text;
        this.hour = json.hour;
    }
    getDiaSemana(){
        const dies = ['domingo','lunes','martes','miercoles','jueves','viernes','sábado'];
        const dia = new Date(this.day);
        const numDia = dia.getDay();
        const nomDia = dies[numDia];
        //console.log(nomDia);
        return nomDia;
    }
    getFormatDate(){
        const dia = new Date(this.day);
        const formatDate = `${dia.getDate()}-${dia.getMonth()}-${dia.getFullYear()}`;
        return formatDate; 
    }
}


