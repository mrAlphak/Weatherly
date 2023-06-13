import axios from "axios"
import { useState } from "react"
const moment = require('moment')
import Geolocation from '@react-native-community/geolocation'

// Configuration for geolocation
const config = {
    enableHighAccuracy: true,
    timeout: 2000,
    maximumAge: 3600000,
}
//create an account on geonames and replace by your username here
const username = ''
//create an account on visualcrossing and replace by your api key here
const API_KEY = ''

// Function to get the device coordinates using geolocation
const getCoordinates=async()=>{
    return new Promise((resolve, reject)=>{
        Geolocation.getCurrentPosition(
            position => {
                return resolve({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                })
            },
            error => reject(error),
            //add config if you got a timed out error
        )           
    })        
}

// Function to get the location details based on coordinates
export const getLocation=async()=>{
    const coordinates = await getCoordinates()
    if(coordinates){
        const latitude = coordinates.latitude
        const longitude = coordinates.longitude   
        if(latitude && longitude){
            try{
                const url = `http://api.geonames.org/findNearbyJSON?lat=${latitude}&lng=${longitude}&username=${username}`
                const response = await axios.get(url)

                if(response && response.data && response.data.geonames){
                    let localityName = response.data.geonames[0].adminName1
                    let countryName = response.data.geonames[0].countryName
                    let countryCode = response.data.geonames[0].countryCode
                    return {
                        latitude,
                        longitude,
                        localityName,
                        countryName,
                        countryCode
                    }
                }
            }catch(err){
                console.log(err)
            }            
        }

    }

    return null
}

// Custom hook for API functionality
export const useApi=()=>{    
    const [loading, setLoading] = useState(false)

    // Function to set the current conditions by modifying the input object
    const setCurrentConditions=async(arr, current)=>{
        let hours = arr        
        hours.unshift({datetime: 'left-space'})
        hours.push({datetime: 'right-space'})      
        current.hours = hours         
        return current
    }

    // Function to modify the input array of next days' weather data
    const setNextDays=async(arr)=>{
        for(let i = 0; i < arr.length; i++){
            const dayOfWeek = new Intl.DateTimeFormat('en-EN', { weekday: 'long' }).format(new Date(arr[i].datetime))
            arr[i].dayOfWeek = dayOfWeek
        }
        arr.unshift({datetime: 'top-space'})
        arr.push({datetime: 'bottom-space'})      
        return arr
    }

     // Function to determine the state (day or night) based on sunrise and sunset times
    const setDayState=async(obj)=>{
        let state
        const { sunset, sunrise, precipprob } = obj
        const now = new Date()
        const sunsetTime = new Date()
        const sunriseTime = new Date()
        const arr = [sunsetTime, sunriseTime]
        arr.forEach((time, index) => {
            const [hours, minutes, seconds] = (index === 0 ? sunset : sunrise).split(':');
            time.setHours(hours, minutes, seconds);
        })
        if(now > sunriseTime && now <= sunsetTime){
            state = 'day'
        }else{
            state = 'night'
        }
        return state
    }

    // Function to fetch weather data
    const getWeather=async()=>{
        setLoading(true)
        const today = moment().format('YYYY-MM-DD')
        const nextWeek = moment().add(7, 'days').format('YYYY-MM-DD')
        const location = await getLocation()
        if(location){
            try{
                let url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location.latitude}%2C%20${location.longitude}/${today}/${nextWeek}?unitGroup=metric&key=${API_KEY}&contentType=json`
                const response = await axios.get(url, {timeout: 5000})
                if(response && response.data){
                    location.timezone = response.data.timezone
                    const currentConditions = await setCurrentConditions(response.data.days[1].hours, response.data.currentConditions)
                    const nextDays = await setNextDays(response.data.days)
                    const state = await setDayState(currentConditions)
                    const data = {
                        state,
                        location,
                        currentConditions,
                        nextDays                       
                    }
                    return data
                }
            }catch(err){
                console.log(err)
            }finally{
                setLoading(false)
            }
        }else{
            setLoading(false)
        }
    }    

    return {
        loading,
        getWeather
    }
}
