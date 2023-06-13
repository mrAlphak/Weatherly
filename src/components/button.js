import { StyleSheet, View, Text, TouchableOpacity, Pressable } from "react-native"
import Assets from "../assets/assets"
import {useState} from "react";


const Button=({
    width,
    height,
    backgroundColor,
    color,
    icon,
    iconVariant,
    iconSize,
    iconRotation,
    text,
    shadow,
    elevation,
    onPress,
    disabled,
    borderRadius,
    fontSize
    })=>{
    const CustomIcon = icon ? Assets.icons[icon] : ''

    return (
        <Pressable
            disabled={disabled}
            onPress={()=>onPress()}
            style={({ pressed })=>[
                styles.container,
                {width, height, elevation, backgroundColor},
                pressed && {opacity: 0.6},
                disabled && {opacity: 0.6},
                {borderRadius: borderRadius ? borderRadius : 15}
            ]}
        >
            {icon && <CustomIcon color={color} variant={iconVariant} size={iconSize} style={iconRotation && { transform: [{ rotate: iconRotation } ] }} /> }
            {text && <Text style={[styles.text, {color, fontSize: fontSize ? fontSize : 14}]}>{text}</Text>}
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'

    },
    text:{
        fontFamily: 'Inter-SemiBold'
    }
})

export default Button
