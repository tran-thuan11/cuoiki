import { StyleSheet, Text, View, TouchableOpacity, Image, Alert, ScrollView } from 'react-native';
import React, { useEffect, useState, useLayoutEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import { Button, Dialog, IconButton, Portal, Provider, TextInput } from 'react-native-paper';

const BookDetail = ({ navigation, route }) => {
  const [avatarImage, setAvatarImage] = useState('');
  const [nameProducts, setNameProducts] = useState('');
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const idbook = route.params; // Destructure id from route.params
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");

  // Function to hide the confirmation dialog

  const hideDialog = () => setVisible(false);

  // Set the header button for deletion
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: (props) => (
        <IconButton icon="delete" color='white' {...props} onPress={() => setVisible(true)} />
      ),
    });
  }, [navigation]);

  const handleDeleteBook = async () => {
    try {
      await firestore().collection('BOOKS').doc(idbook).delete(); // Use id directly
      navigation.navigate('Admin');
    } catch (error) {
      console.error('Error deleting book: ', error);
      Alert.alert('Lỗi', 'Xóa không thành công');
    }
  };

  const fetchBookData = async () => {
    try {
      const documentSnapshot = await firestore().collection('BOOKS').doc(idbook).get(); // Use id directly
      const data = documentSnapshot.data();
      const { avatarImage, nameProducts, author, price, description } = data;
      setAvatarImage(avatarImage);
      console.log(avatarImage)
      setNameProducts(nameProducts);
      setAuthor(author);
      setDescription(description);
      setPrice(price);

    } catch (error) {
      console.error('Error fetching book data: ', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <Provider>
      <ScrollView style={styles.container}>
        <TouchableOpacity>
        {avatarImage!=''&&  <Image style={{ width: 300, height: 400, resizeMode: 'stretch', alignSelf: 'center' }}
            source={{
              uri: avatarImage
            }}

          />}
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          label="Tên sách"
          value={nameProducts}
          onChangeText={(text) => setNameProducts(text)}
        />
        <Text style={{ marginTop: 20, fontSize: 18, marginLeft: 10 }}>Mô tả</Text>
        <Text style={{ fontSize: 20, marginLeft: 10 }} >

          {description}
        </Text>
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

        {/* <TouchableOpacity style={styles.button} onPress={uploadBook}>
          <Text style={styles.textButton}>Cập nhật sách</Text>
        </TouchableOpacity> */}
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Thông báo</Dialog.Title>
            <Dialog.Content>
              <Text>Bạn muốn xóa sách này không?</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>Không</Button>
              <Button onPress={handleDeleteBook}>Có</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </ScrollView>
    </Provider>
  );
};

export default BookDetail;

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
    width: 300,
    backgroundColor: '#1a1aff',
    borderRadius: 5,
    padding: 10,
    margin: 20,
  },
});
