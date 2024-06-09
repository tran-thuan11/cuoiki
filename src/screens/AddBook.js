import { View, Text, ScrollView,TouchableOpacity , Image, StyleSheet} from 'react-native'
import React, { useState } from 'react'
import {Button, TextInput} from 'react-native-paper'
import firestore from '@react-native-firebase/firestore'
import ImageCropPicker from "react-native-image-crop-picker"
import storage from '@react-native-firebase/storage'


export default function AddBook({navigation}) {
    const BOOKS = firestore().collection("BOOKS")
    const [avatarImage, setAvatarImage] = useState('');
    const [nameProducts, setNameProducts] = useState('');
    const [price, setPrice]=useState("")
    const [description, setDescription]= useState("")
    const[author, setAuthor]=useState("")
    const handleAddNewBook = () =>{
        BOOKS.add(
            {
                author,
                description,
                nameProducts,
                price,
            }
        ).then(response => {
            const refImage = storage().ref("/book/"+ response.id+".png")
            if(avatarImage!=""){
                refImage.putFile(avatarImage).then(()=>{
                refImage.getDownloadURL().then(
                    link => BOOKS.doc(response.id).update({avatarImage: link, idbook: response.id}))
                    navigation.navigate("Admin")
                }).catch(e => console.log(e.message))
            }
            else{
                BOOKS.doc(response.id).update({idbook: response.id})
                navigation.navigate("Admin")
            }
        }).catch(e => console.log(e.message))
    }
    const handleUploadImage=() =>{
        ImageCropPicker.openPicker({
            height: 300,
            width: 400,
            mediaType:"photo",
            cropping: true
        }).then(avatarImage => setAvatarImage(avatarImage.path))
        .catch(e => console.log(e.message))
    }
    return (
          <ScrollView style={styles.container}>
            <Button onPress={handleUploadImage}>Tải ảnh lên</Button>

             {(avatarImage!='')&&
              <Image style={{width:300,height:400,resizeMode:'stretch', alignSelf:'center'}}
              source={{uri:avatarImage}}
              />
            }
 
            <TextInput
              style={styles.input}
              label="Tên sách"
              value={nameProducts}
              onChangeText={(text) => setNameProducts(text)}
            />
            <TextInput
              style={styles.input}
              label="Mô tả"
              value={description}
              onChangeText={(text) => setDescription(text)}
            />
             <TextInput
              style={styles.input}
              label="Giá tiền"
              value={price}
              onChangeText={(text) => setPrice(text)}
            />
             <TextInput
              style={styles.input}
              label="Tác giả"
              value={author}
              onChangeText={(text) => setAuthor(text)}
            />
    
            <TouchableOpacity onPress={handleAddNewBook} style={styles.button} >
              <Text style={styles.textButton}>Cập nhật sách</Text>
            </TouchableOpacity>
            
            </ScrollView>
    )}
    const styles = StyleSheet.create({
        container: {
        
        },
        loadingContainer: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        },
      
        input: {
          marginTop: 20,
          width: 400,
        },
        textButton: {
          fontSize: 18,
          color: 'white',
          fontWeight: 'bold',
          textAlign: 'center',
        },
        button: {
          backgroundColor: '#00a46c',
          borderRadius: 5,
          padding: 10,
          margin: 20,
          
        },
      });