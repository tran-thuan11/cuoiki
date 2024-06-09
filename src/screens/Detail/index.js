import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon1 from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/AntDesign';
import styles from './styles';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {convertToNumberCommas} from '../../utilities';

const Detail = ({navigation, route}) => {
  const [numberProduct, setNumberProduct] = useState(
    route?.params?.count ? route?.params?.count : 1,
  );
  const [dataDetail, setDataDetail] = useState(route?.params?.dataItem);

  useEffect(() => {
    console.log('Detail data:', dataDetail);
  }, [dataDetail]);

  // Handle saving the added product to Firestore
  const onhandleShoppingCart = async () => {
    const user = auth().currentUser;
    console.log(user);
    let data = dataDetail;
    let body = {
      amount: numberProduct,
      idProduct: data.menuId,
      nameProduct: data.nameProducts,
      priceProduct: data.price,
      email: user?.email,
    };
    // Add to Firestore
    await firestore().collection('ShoppingCart').add(body);
    navigation.navigate('ShoppingCart');
  };

  return (
    <View style={{flex: 1}}>
      {/* Header */}
      <View style={styles.ViewHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon2 name="arrow-back" size={30} color="white" />
        </TouchableOpacity>
        <Text style={{fontSize: 20, color: 'white'}}>Tìm kiếm sách</Text>
        <TouchableOpacity onPress={() => navigation.navigate('ShoppingCart')}>
          <Icon1 name="shoppingcart" size={30} color="white" />
        </TouchableOpacity>
      </View>

      {/* Book details view */}
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <ImageBackground
          resizeMode="stretch"
          source={require('../../images/Avatar/individualBookPage.png')}
          style={{width: '100%', height: 280}}
        />
        <View style={{marginTop: -250}}>
          <Image 
            source={dataDetail.avatarImage ? { uri: dataDetail.avatarImage } : require('../../images/Avatar/avatar.png')}
            style={styles.ImageView} 
          />
          <View style={{alignItems: 'center', marginTop: 20}}>
            <Text style={styles.TxtName}>{dataDetail.nameProducts}</Text>
            <Text style={styles.TxtAuthor}>Tác giả : {dataDetail.author}</Text>
            <Text style={styles.TxtPrice}>
              {convertToNumberCommas(dataDetail.price)} Đ
            </Text>
          </View>
          <View style={{marginVertical: 12}}>
            <Text style={styles.TxtIntroduce}>Mô tả:</Text>
            <Text style={[styles.TxtIntroduce, {color: 'black'}]}>
              {dataDetail.description}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom view: Add to cart and quantity controls */}
      <View style={styles.ViewBottomContainer}>
        <View style={styles.ViewNumProduct}>
          <TouchableOpacity
            onPress={() => {
              if (numberProduct > 0) {
                setNumberProduct(numberProduct - 1);
              }
            }}
            style={styles.ButtomPlus}>
            <Icon name="minus" size={25} color="gray" />
          </TouchableOpacity>
          <Text
            style={{
              color: '#62636a',
              fontWeight: 'bold',
              fontSize: 25,
            }}>
            {numberProduct}
          </Text>
          <TouchableOpacity
            onPress={() => {
              setNumberProduct(numberProduct + 1);
            }}
            style={styles.ButtomPlus}>
            <Icon name="plus" size={25} color="gray" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => onhandleShoppingCart()}
          style={styles.ViewButtom}>
          <Text
            style={{
              color: '#FFF',
              fontSize: 18,
            }}>
            Thêm vào giỏ
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Detail;
