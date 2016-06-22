evosoft.service('staffService', function(){
    return {
        city: [
            {value: 1, country: 1, name: 'München'},
            {value: 2, country: 1, name: 'Stuttgart'},
            {value: 3, country: 1, name: 'Berlin'},
            {value: 4, country: 2, name: 'Budapest'},
            {value: 5, country: 2, name: 'Szeged'},
            {value: 6, country: 2, name: 'Miskolc'}
        ],
        country: [
            {value: 1, name: 'Germany'},
            {value: 2, name: 'Hungary'}
        ],
        currentCountry: 0,
        getCity: function(){
            var currentCity = [];
            for (var k in this.city) {
                console.log(this.city[k].country, this.currentCountry);
                if (
                    parseInt(this.city[k].country) === parseInt(this.currentCountry)) {
                    currentCity.push(this.city[k]);
                }
            }
            return currentCity;
        }
    };
});