import clearDay from  './images/weather_icons/clear-day.svg'
import clearNight from  './images/weather_icons/clear-night.svg'
import cloudy from  './images/weather_icons/cloudy.svg'
import partlyCloudyDay from  './images/weather_icons/partly-cloudy-day.svg'
import partlyCloudyNight from  './images/weather_icons/partly-cloudy-night.svg'
import rainNight from  './images/weather_icons/rain-night.svg'
import rain from  './images/weather_icons/rain.svg'
import showersDay from  './images/weather_icons/showers-day.svg'
import showersNight from  './images/weather_icons/showers-night.svg'
import snow from  './images/weather_icons/snow.svg'
import windDay from  './images/weather_icons/wind-day.svg'
import windNight from  './images/weather_icons/wind-night.svg'
import umbrella from './images/weather_icons/umbrella.svg'
import drop from './images/weather_icons/drop.svg'

import {
    Home2,
    Wind,
    Drop,
    CloudDrizzle,
    Location,
    HambergerMenu,
    Refresh2,
    CloseCircle,
    ArrowRight2,
    ArrowLeft2,
    Calendar
} from 'iconsax-react-native'


export default Assets = {
    icons:{
        Home2,
        Wind,
        Drop,
        CloudDrizzle,
        Location,
        HambergerMenu,
        Refresh2,
        CloseCircle,
        ArrowRight2,
        ArrowLeft2,
        Calendar,
        weather:{
            'clear-day': clearDay,
            'clear-night': clearNight,
            'cloudy': cloudy,
            'partly-cloudy-day': partlyCloudyDay,
            'partly-cloudy-night': partlyCloudyNight,
            'rain-night': rainNight,
            'rain': rain,
            'showers-day': showersDay,
            'showers-night': showersNight,
            'snow': snow,
            'wind-day': windDay,
            'wind-night': windNight,
            'umbrella': umbrella,
            'drop': drop
        },
    },
    images:{
        loader: require('./images/loading.gif'),
        background_night: require('./images/background_night.png'),
        background_day: require('./images/background_day.png'),
    },
    colors:{
        default_blue: '#3b7c85'
    }
}