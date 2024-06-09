import React, {useState, useEffect} from 'react';
import { Entypo } from '@expo/vector-icons';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import firestore from '@react-native-firebase/firestore'
import Icon1 from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/Entypo';
import styles from './styles';
import {convertToNumberCommas} from '../../utilities/index';

const Home = ({navigation}) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const booksCollection = await firestore().collection('BOOKS').get();
        const booksList = booksCollection.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setBooks(booksList);
      } catch (error) {
        console.error("Error fetching books: ", error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Image
        resizeMode="stretch"
        source={require('../../images/Avatar/homeScreenGreenCircle.png')}
        style={styles.ImageHeader}
      />
      <View style={{marginTop: -210}}>
        <View style={styles.ViewHeader}>
          <TouchableOpacity
            onPress={() => {
              Alert.alert('Thông báo!', 'Bạn có muốn đăng xuất', [
                {text: 'Cannel'},
                {text: 'Okay', onPress: () => navigation.goBack()},
              ]);
            }}>
            <Entypo name="log-out" size={24} color="white" />
          </TouchableOpacity>
          <Text style={{fontSize: 22, color: 'white', fontWeight: 'bold'}}>
            BOOK SHOP TTT
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ShoppingCart');
            }}>
            <Icon1 name="shoppingcart" size={30} color="white" />
          </TouchableOpacity>
        </View>

        {/* View tìm kiếm */}
        <View style={{marginTop: 5, marginBottom: 40, alignSelf: 'center'}}>
          <Image
            source={require('../../images/Avatar/logo.png')}
            style={{height: 190, width: 200}}
            resizeMode="stretch"
          />
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <Text style={styles.TxtTextInput}>Tìm kiếm sách...</Text>
          </TouchableOpacity>
        </View>

        {/* View danh sách cách sách */}
        <View style={{marginBottom: 30}}>
          <View style={styles.ViewTitileProducts}>
            <Text style={{fontWeight: 'bold', fontSize: 22}}>Dành cho bạn</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 15,
            }}>
            <View style={styles.ViewLine} />
            <View style={styles.ViewProducts}>
              <FlatList
                data={books}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => (
                  <TouchableOpacity
                    opacity={1}
                    style={styles.ButtomDetail}
                    onPress={() => {
                      navigation.navigate('Detail', {dataItem: item});
                    }}>
                    <Image
                      source={{ uri: item.avatarImage }}
                      style={styles.ViewImageProducts}
                    />
                    <Text numberOfLines={4} style={styles.ViewTitilePro}>
                      {item.nameProducts}
                    </Text>
                    <Text numberOfLines={1} style={styles.TxtAuthor}>
                      by {item.author}
                    </Text>
                    <Text numberOfLines={1} style={styles.TxtPrice}>
                      price: {convertToNumberCommas(item.price)} Đ
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default Home;
