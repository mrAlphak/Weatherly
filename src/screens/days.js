import React, { useEffect, useState } from "react"
import { SafeAreaView, StatusBar, StyleSheet, View, Dimensions, Text, Image, ImageBackground, FlatList, Pressable, ScrollView, TouchableOpacity } from "react-native"
import { useNavigation } from '@react-navigation/native'
import Animated, {useAnimatedStyle, withTiming, useSharedValue, FadeInUp} from "react-native-reanimated"
import Assets from '../assets/assets'
import Button from "../components/button"
import WeatherIcon from "../components/weatherIcon"

// Get screen dimensions
const SCREEN_HEIGHT = Dimensions.get('screen').height
const SCREEN_WIDTH = Dimensions.get('screen').width

const Days=({route})=>{
    const {days, dayState} = route.params
    const [daysList, setDayList] = useState(null)
    const [loading, setLoading] = useState(true)
    const navigation = useNavigation()

    useEffect(()=>{
        const timeout = setTimeout(()=>{
            setDayList(days)
            setLoading(false)
        }, 20)
        return()=>clearTimeout(timeout)
    }, [])


    return (
        <SafeAreaView style={styles.background}>
            <StatusBar backgroundColor='transparent' translucent={true} barStyle='white-content' />
            <View style={styles.main}>
                <View style={styles.header}>
                    <Button
                        icon="ArrowLeft2"
                        iconVariant="Linear"
                        iconSize="20"
                        height={40}
                        width={40}
                        backgroundColor='rgba(187, 203, 242, 0.19)'
                        color='white'
                        onPress={()=>navigation.goBack()}
                    />
                    <View style={{flexDirection: 'row', gap: 4, alignItems: 'center'}}>
                        <Assets.icons.Calendar variant="Bulk" size={25} color='white' />
                        <Text style={{color: 'white', fontFamily: 'Inter-SemiBold', fontSize: 16}}>07 Days</Text>
                    </View>
                <View style={{width: 35}} />
                </View>
                <View style={{flex: 1}}>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        {loading && <Animated.Image entering={FadeInUp} source={Assets.images.loader} style={styles.loader} />}
                    </View>
                    {/* Days forecast */}
                    {daysList && <List data={days} />}                    
                </View>
            </View>
            <ImageBackground source={Assets.images[`background_${dayState}`]} resizeMode="cover" style={styles.background.image} />
        </SafeAreaView>
    )
}
const List=React.memo(({data})=>{
    return (
        <FlatList
            data={data}
            keyExtractor={(item)=>item.id}
            renderItem={({item, index})=><Item item={item} index={index} />}
            contentContainerStyle={{gap: 10}}
            style={{marginTop: 5}}
            showsVerticalScrollIndicator={false}
            bounces={false}
        />
    )
})
const Item=({item, index})=>{
    const translateX = useSharedValue(-SCREEN_WIDTH)

    useEffect(()=>{
        const timeout = setTimeout(()=>{
            translateX.value = withTiming(0, {duration: 500})       
        }, index * 200)
        return()=>clearTimeout(timeout)
    }, [])

    const slideAnimation = useAnimatedStyle(()=>{
        return {
            transform:[{
                translateX: translateX.value                
            }]
        }

    })

    return (
        item.temp ?
        <Animated.View style={[styles.item, slideAnimation]}>
            <View>
                <Text style={{color: Assets.colors.dark_2, fontSize: 16, fontFamily: 'Inter-Medium', opacity: 0.6}}>{item.dayOfWeek}</Text>
                <Text style={{color: 'white', fontSize: 16, fontFamily: 'Inter-SemiBold'}}>{item.conditions}</Text>
                <Text style={{color: 'white', fontSize: 16, fontFamily: 'Inter-SemiBold'}}>{item.temp}°</Text>
            </View>
            <View>
                <WeatherIcon icon={item.icon} height={40} width={40} />
            </View>
        </Animated.View>
        :
        <View style={{width: '100%', height: 30}} />
    )
}

const styles = StyleSheet.create({
    background:{
        height: SCREEN_HEIGHT,
        width: SCREEN_WIDTH,
        image:{
            position: 'absolute',
            zIndex: 1,
            width: '100%',
            height: '100%',
        }
    },
    header:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginTop: 35,
        paddingHorizontal: 25,
        height: 50, 
        marginBottom: 5
    },
    loader:{
        zIndex: 3,
        width: 35, 
        height: 35, 
        tintColor: 'white'
    },
    main:{
        zIndex: 2,
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    item:{
        alignSelf: 'center',
        width: '90%',
        height: 100,
        borderRadius: 25,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginTop: 20,
        backgroundColor: 'rgba(187, 203, 242, 0.19)'
        //elevation: 5,
    },
})


export default Days