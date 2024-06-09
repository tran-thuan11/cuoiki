import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import auth from "@react-native-firebase/auth"
import firestore from "@react-native-firebase/firestore"
import { IconButton, TextInput } from "react-native-paper"
import { FlatList } from 'react-native'

export default function AdminScreen({navigation}) {
    const user = auth().currentUser;
    const [fullname, setFullname] = useState("")
    const [bookData, setBookData] = useState([])
    useEffect(() => {
        const fetchUser = async () => {
          const document = await firestore().collection('USERS').doc(user.email).get()
          setFullname(document.data().fullName)
        }
        fetchUser()
      }, [])
      const cBOOKS= firestore().collection("BOOKS")
useEffect(()=>{
       
        cBOOKS.onSnapshot(response => {
            var arr = []
            response.forEach(doc => arr.push(doc.data()))
            setBookData(arr)
        })
    },[])
const renderItem = ({item}) =>{
        const {nameProducts,price}=item;
        return(
            <TouchableOpacity onPress={()=> navigation.navigate("BookDetail", item.idbook)}
            style={{flexDirection:"row", borderWidth:1, height:60, borderRadius: 10, margin:5, justifyContent:"space-between", alignItems:"center", padding:10}}
           >
            
                <Text style={{fontSize:18, fontWeight:"bold"}}>{nameProducts}</Text>
                <Text>{price}đ</Text>
            </TouchableOpacity>
        )
    }
  return (
        
    <View style={{marginTop:10}}>
      <Text style={{fontSize:23, textAlign:'center', fontWeight:'bold'}}>Xin chào Admin {fullname}</Text>
      <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
                <Text style={{
                    fontSize:24,
                    marginLeft:5,
                    fontWeight:'bold'
                }}>
                    Danh sách truyện
                </Text>
                <IconButton icon={"plus-circle"} iconColor="red" size={40} onPress={()=>{navigation.navigate("AddBook")}}/>
            </View>
            <FlatList data={bookData} keyExtractor={item => item.id} renderItem={renderItem}/>
    </View>
  )
}