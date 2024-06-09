import { View, Text, Button } from 'react-native'
import React from 'react'

export default function SuccessOdered({navigation}) {
  return (
    <View style = {{justifyContent:'center',alignItems:'center', marginTop:200}}>
      <Text style= {{fontSize:26, marginBottom:50}}>Bạn đã đặt thành công</Text>
      <Button onPress={()=>navigation.navigate("Home")}title='Trở về trang chủ'></Button>
    </View>
  )
}