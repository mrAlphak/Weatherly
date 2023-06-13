/*
=========================================
        Weatherly, a weather app ☁️🌞
=========================================

Author: MrAlphak

Description:
This is a weather app built with React Native. It provides real-time weather information for different locations. The app displays the current weather conditions, temperature, wind speed, humidity, and precipitation. It also provides a 7-day forecast with detailed weather information for each day.

The app utilizes various libraries and components such as React Navigation, Axios for API calls, Animated API for smooth transitions, and FlatList for rendering the weather data. It also uses custom icons and images from the Assets folder.

Feel free to modify and enhance the app according to your needs!

Enjoy coding,
MrAlphak ^^
*/


import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Screens from "./src/screens/screens"

const Stack = createNativeStackNavigator()
const App=()=>{

  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="home" component={Screens.Home} options={{headerShown: false}} />
            <Stack.Screen name="days" component={Screens.Days} options={{animation: 'slide_from_bottom', headerShown: false}} />
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App