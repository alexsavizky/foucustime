import React from "react";
import {TouchableOpacity,Text,StyleSheet} from "react-native";


export const RoundedButton = ({
  style = {},
  textStyle = {},
  size = 125,
  ...props
}) => {
  return (
    <TouchableOpacity style = {[styles(size).radius,styles]}
    onPress={props.onPress}>
    
    <Text style={[styles(size).text,textStyle]}>{props.title}</Text>
    </TouchableOpacity>
  );

};

const styles =(size) =>StyleSheet.create({
  radius:{
    borderRadius : size/2,
    width : size,
    height :size,
    alignItems : 'center',
    borderColor : '#fff',
    borderWidth :2
  },
  text :{
    color:'#fff',
    paddingTop:size/4,
    fontSize:size/4,

  }
})