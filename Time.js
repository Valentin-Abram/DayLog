export class Time {
    
    getTimeFromMs(miliseconds){
        const secondsTotal = Math.floor(miliseconds / 1000);
      
        this.days = Math.floor(secondsTotal / (3600 * 24));
        this.hours = Math.floor((secondsTotal % (3600 * 24)) / 3600);
        this.minutes = Math.floor(((secondsTotal % (3600 * 24)) % 3600) / 60);
        this.seconds = secondsTotal % 60;
    }
}