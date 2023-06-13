import Assets from '../assets/assets'

const WeatherIcon=({icon, height, width})=>{
    const Icon = Assets.icons.weather[icon] 
    return <Icon height={height} width={width} />
}

export default WeatherIcon