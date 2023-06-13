import React, { useEffect, useState } from "react"
import { SafeAreaView, StatusBar, StyleSheet, View, Dimensions, Text, Image, ImageBackground, FlatList } from "react-native"
import { useApi } from "../components/api"
import { useNavigation } from '@react-navigation/native'
import Animated, { FadeInUp, FadeOutUp} from "react-native-reanimated"
import Assets from '../assets/assets'
import Button from "../components/button"
import Link from "../components/link"
import GradientText from '../components/gradientText'
import WeatherIcon from "../components/weatherIcon"

// Get screen dimensions
const SCREEN_HEIGHT = Dimensions.get('screen').height
const SCREEN_WIDTH = Dimensions.get('screen').width

const Home=()=>{
    const navigation = useNavigation()
    const { getWeather, loading } = useApi()
    const [dayState, setDayState] = useState('day')
    const [currentConditions, setCurrentConditions] = useState(null)
    const [days, setDays] = useState(null)
    const [location, setLocation] = useState(null)
    const [isMounted, setIsMounted] = useState(false)

    const getWeatherData=async()=>{
        const response = await getWeather()
        if(response){
            setCurrentConditions(response.currentConditions)
            setDayState(response.state)
            setLocation(response.location)
            setDays(response.nextDays)
            setIsMounted(true)
        }
    }
    
    useEffect(()=>{
        // Get weather data from API using axios
        !isMounted && getWeatherData()
    }, [])


    return (
        <SafeAreaView style={styles.background}>
            <StatusBar barStyle='light-content' backgroundColor='transparent' translucent={true} />
            
            <View style={styles.main}>
                {loading && <Animated.Image entering={FadeInUp} exiting={FadeOutUp} source={Assets.images.loader} style={styles.loader} />}
                {
                    currentConditions ?
                    <View style={{width: '100%', height: '100%', alignItems: 'center'}}>
                        <View style={[styles.header, {marginBottom: 50}]}>
                            <View style={{width: 45}} />
                            <View style={styles.location}>
                                <Assets.icons.Location variant="Linear" size={20} color="white" />
                                <Text style={{color: 'white', fontSize: 17, fontFamily: 'Inter-SemiBold'}}>{location && location.localityName}</Text>                         
                            </View>
                            <Button
                                icon="Refresh2"
                                iconVariant="Linear"
                                iconSize="20"
                                height={40}
                                width={40}
                                backgroundColor='rgba(187, 203, 242, 0.19)'
                                color='white'
                                disabled={loading}
                                onPress={()=>getWeatherData()}
                            />
                        </View>
                        {/* Weather details section */}
                        <View style={{width: '100%', height: 200, alignItems: 'center', marginBottom: 70}}>
                            <View style={{position: 'absolute', zIndex: 3, bottom: -60}}>
                                <WeatherIcon icon={currentConditions.icon} height={130} width={130} />    
                            </View>
                            <View style={{zIndex: 2, marginTop: 50, flexDirection: 'row'}}>
                                <GradientText fontSize={160} viewBoxWidth={190} viewBoxHeight={20} fontFamily='Inter-SemiBold'>{currentConditions.temp}</GradientText>
                                <Text style={{position: 'absolute',right: -30, top: -15, fontSize: 100, color: 'white'}}>°</Text>
                            </View>
                        </View>
                        {/* Current weather conditions */}
                        <Text style={{color: 'white', fontSize: 17, fontFamily: 'Inter-SemiBold', opacity: 0.8}}>{currentConditions.conditions}</Text>                         
                        <View style={styles.middle}>
                            <View style={styles.middle.section}>
                                <Assets.icons.Wind size={25} color="white" variant="Linear" />
                                <Text style={{color: 'white', fontSize: 16, fontFamily: 'Inter-SemiBold', opacity: 0.8}}>{currentConditions.windspeed}</Text>                         
                            </View>
                            <View style={styles.middle.section}>
                                <Assets.icons.weather.drop height={25} width={25} />
                                <Text style={{color: 'white', fontSize: 16, fontFamily: 'Inter-SemiBold', opacity: 0.8, paddingTop: 5}}>{currentConditions.humidity}</Text>                         
                            </View>
                            <View style={styles.middle.section}>
                                <Assets.icons.weather.umbrella height={25} width={25} />
                                <Text style={{color: 'white', fontSize: 16, fontFamily: 'Inter-SemiBold', opacity: 0.8}}>{currentConditions.precip}</Text>                         
                            </View>
                        </View>
                        {/* Hourly weather forecast */}
                        <View style={styles.hours}>
                            <View style={styles.header}>
                                <Text style={{color: 'white', fontSize: 16, fontFamily: 'Inter-Medium'}}>Today</Text>                         
                                <Link onPress={()=>navigation.navigate('days', {days, dayState})} style={{flexDirection: 'row', gap: 5, alignItems: 'center', opacity: 0.7}}>
                                    <Text style={{color: 'white', fontSize: 14, fontFamily: 'Inter-Medium'}}>07 Days</Text>                         
                                    <Assets.icons.ArrowRight2 variant="Linear" color="white" size={16} />
                                </Link>
                            </View>
                            <Hours hours={currentConditions.hours} />
                        </View>
                    </View>
                    :
                    <View>
                        {/* You can add a "no internet alert if wanted */}
                    </View>
                }
            </View>
            <ImageBackground source={Assets.images[`background_${dayState}`]} resizeMode="cover" style={styles.background.image} />
        </SafeAreaView>
    )

}

const Hours=React.memo(({hours})=>{
    return (
        <FlatList
            data={hours}
            keyExtractor={(item)=>item.datetime.slice(0, 5)}
            renderItem={({item})=><Item item={item} />}
            horizontal
            contentContainerStyle={{gap: 10}}
            style={{marginTop: 15}}
            showsHorizontalScrollIndicator={false}
            bounces={false}
        />
    )
})

const Item=({item})=>{
    return (
        item.temp ?
        <View style={styles.item}>
            <View style={{zIndex: 3, width: '100%', height: '100%', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 7,}}>
                <Text style={{fontFamily: 'Inter-SemiBold', fontSize: 18, color: 'white'}}>{item.temp}°</Text>
                <WeatherIcon icon={item.icon} height={30} width={30} />
                <Text style={{fontFamily: 'Inter-SemiBold', fontSize: 14, opacity: 0.7, color: 'white'}}>{item.datetime.slice(0, 5)}</Text>
            </View>      
            <View style={[{position: 'absolute', width: '100%', height: '100%', zIndex: 1, backgroundColor: 'rgba(187, 203, 242, 0.19)'}]} />
        </View>
        :
        <View style={{width: 15}} />
    )
}


const styles = StyleSheet.create({
    background:{
        height: SCREEN_HEIGHT,
        width: SCREEN_WIDTH,
        image:{
            zIndex: 1,
            flex: 1
        }
    },
    main:{
        position: 'absolute',
        zIndex: 2,
        alignItems: 'center',
        top: 30,
        width: '100%',
    },
    loader:{
        position: 'absolute',
        zIndex: 3,
        top: 50,
        width: 35, 
        height: 35, 
        tintColor: 'white'
    },
    header:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginTop: 10,
        paddingHorizontal: 25
    },
    location:{
        flexDirection: 'row',
        gap: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    middle:{
        marginTop: 70,
        width: '80%',
        height: 70,
        backgroundColor: 'rgba(13, 13, 13, 0.24)',
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#8f8f8f',
        flexDirection: 'row',
        paddingHorizontal: 30,
        paddingVertical: 5,
        alignItems: 'center',
        justifyContent: 'space-between',
        section:{
            alignItems: 'center',
            justifyContent: 'center'
        }
    },
    hours:{
        marginTop: 30,
        width: '100%'
    },
    item:{
        height: 120,
        width: 80,
        borderRadius: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        overflow: 'hidden'
    }
})

export default Home