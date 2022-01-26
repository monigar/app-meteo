export class Astro{
    constructor(json){
        this.sunrise = json.astronomy.astro.sunrise;
        this.sunset = json.astronomy.astro.sunset;
        this.moon = json.astronomy.astro.moon_phase;
    }
    getTraduction(){
        const moonEn = ['New Moon', 'Waxing Crescent', 'First Quarter', 'Waxing Gibbous', 'Full Moon', 'Waning Gibbous', 'Last Quarter', 'Waning Crescent'];
        const moonCast = ['Luna nueva', 'Luna creciente', 'Primer cuarto', 'Luna menguante', 'Luna llena', 'Menguante menguante', 'Último cuarto', 'Creciente menguante'];
        for(let moon = 0; moon < moonEn.length; moon++){
            if(this.moon === moonEn[moon]){
                //console.log(moon);
                const moonNom = moonCast[moon];
                //console.log(moonNom);
                return moonNom;
            }
        }
    }
    getImage(){
        const moonEn = ['New Moon', 'Waxing Crescent', 'First Quarter', 'Waxing Gibbous', 'Full Moon', 'Waning Gibbous', 'Last Quarter', 'Waning Crescent'];
        const moonImg = ['../images/new_moon.png', '../images/waxing_crescent.png', '../images/first_quarter.png', '../images/waxing_gibbous.png', '../images/full_moon.png', '../images/waning_gibbous.png', '../images/third_quarter.png', '../images/waning_crescent.png'];
        for(let moon = 0; moon < moonEn.length; moon++){
            if(this.moon === moonEn[moon]){
                //console.log(moon);
                const moonImage = moonImg[moon];
                //console.log(moonImage);
                return moonImage;
            }
        }
    }
}