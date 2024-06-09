import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  Dimensions,
  TouchableHighlight,
  Alert,
  //   TouchableOpacity,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import styles from './styles';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
import DataProduct from '../../Data/DataProduct';
import firestore from '@react-native-firebase/firestore';
import {convertToNumberCommas} from '../../utilities';
const {width, height} = Dimensions.get('window');
const DataProducts = DataProduct;

const ShoppingCart = ({navigation}) => {
  const [numberProduct, setNumberProduct] = useState(1);
  const [dataShopping, setDataShopping] = useState([]);
  const [dataItemAll, setDataItemAll] = useState([]);
  const [count, setCount] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const[avatarImage, setAvataImage]=useState();
  useEffect(() => {
    const users = auth().currentUser;
    const getShoppingByUser = async () => {
      try {
        const shoppingCart = await firestore().collection('ShoppingCart').get();
        let box = shoppingCart.docs.map(doc => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        let shoppingbyUser = box.filter(element => {
          return element.email === users?.email;
        });
        for (let i = 0; i < shoppingbyUser.length; i++) {
          for (let y = 0; y < DataProducts.length; y++) {
            if (shoppingbyUser[i].idProduct == DataProducts[y].menuId) {
              // let photo = AllProducts[i].photo;
              let avatarImage = DataProducts[y].avatarImage;
              shoppingbyUser[i] = Object.assign(shoppingbyUser[i], {
                avatarImage,
              });
            }
          }
        }
        setDataShopping(shoppingbyUser);
        converTotalPrice(shoppingbyUser);
      } catch (error) {
        console.log('error_error', error);
      }
    };
    getShoppingByUser();
  }, [dataShopping]);
  const handledel = async (item, index) => {
    let DataShopping = [];
    for (let i = 0; i < dataShopping.length; i++) {
      if (item.idProduct != dataShopping[i].menuId && i != index) {
        DataShopping.push(dataShopping[i]);
      }
    }
    // console.log(DataShopping);
    setDataShopping(DataShopping);
    converTotalPrice(DataShopping);
    await firestore().collection('ShoppingCart').doc(item.id).delete();
  };
  const handleDetail = (id, count) => {
    // console.log(dataItemAll);
    if (DataProducts.length != 0) {
      for (let i = 0; i < DataProducts.length; i++) {
        if (DataProducts[i].menuId == id) {
          navigation.navigate('Detail', {
            count: count,
            dataItem: DataProducts[i],
          });
        }
      }
    }
  };
  const onHandleShopping = async (value, item, index) => {
    console.log(item.amount, index);

    if (item.amount > 0 || value == 1) {
      let data = dataShopping;
      let Count = 0;
      for (let i = 0; i < dataShopping.length; i++) {
        let count = data[i].amount;
        if (dataShopping[i].menuId == item.menuId && i == index) {
          data[i].amount = count + value;
          Count = data[i].amount;
        }
      }
      await setDataShopping(data);
      await firestore()
        .collection('ShoppingCart')
        .doc(item.id)
        .update({amount: Count});
      setCount(count + value);
      converTotalPrice(data);
    }
  };
  const converTotalPrice = totalArr => {
    let CountTotal = 0;
    for (let i = 0; i < totalArr.length; i++) {
      CountTotal = CountTotal + totalArr[i].amount * totalArr[i].priceProduct;
    }
    setTotalPrice(CountTotal);
  };
  const handlePay = async () => {
    for (let i = 0; i < dataShopping.length; i++) {
      await firestore()
        .collection('ShoppingCart')
        .doc(dataShopping[i].id)
        .get()
    };
    setDataShopping([]);
    setTotalPrice(0);
   navigation.navigate("Payment")
  };
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          height: 50,
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          backgroundColor: '#00a46c',
          alignItems: 'center',
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon1 name="arrow-back" size={30} color="white" />
        </TouchableOpacity>
        <Text style={{fontSize: 20, color: 'white'}}>Giỏ Hàng</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          style={styles.TopPlus}>
          <Icon name="plus" size={20} color="white" />
        </TouchableOpacity>
      </View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        {dataShopping.map((item, index) => {
          return (
            <View
              key={index}
              style={{
                marginTop: 16,
                height: 120,
                marginHorizontal: 6,
                backgroundColor: 'white',
                borderRadius: 20,
                flexDirection: 'row',
              }}>
              <View
                style={{
                  position: 'absolute',
                  right: -5,
                  top: -10,
                }}>
                <TouchableOpacity
                  hitSlop={{top: 10, left: 10, right: 10, bottom: 10}}
                  onPress={() => {
                    handledel(item, index);
                  }}
                  style={{
                    height: 27,
                    width: 27,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon name="closecircle" size={27} color="gray" />
                </TouchableOpacity>
              </View>
              <Image
                source={item.avatarImage}
                style={{
                  height: 120,
                  width: 120,
                  borderBottomLeftRadius: 20,
                  borderTopLeftRadius: 20,
                }}
              />
              <View
                style={{
                  marginHorizontal: 12,
                  width: width - 100 - 32,
                  paddingVertical: 6,
                }}>
                <Text
                  numberOfLines={1}
                  style={{
                    fontSize: 16,
                    color: 'green',
                    fontWeight: '500',
                    lineHeight: 24,
                  }}>
                  {' '}
                  {item.nameProduct}
                </Text>
                <Text
                  numberOfLines={1}
                  style={{
                    fontSize: 16,
                    color: 'black',
                    fontWeight: '500',
                    lineHeight: 24,
                  }}>
                  {' '}
                  Giá tiền: {convertToNumberCommas(item.priceProduct)} Đ
                </Text>
                <Text
                  numberOfLines={1}
                  style={{
                    fontSize: 16,
                    color: 'black',
                    fontWeight: '500',
                    lineHeight: 24,
                  }}>
                  {' '}
                  Tổng tiền :{' '}
                  {convertToNumberCommas(
                    Number(item.amount) * Number(item.priceProduct),
                  )}{' '}
                  Đ
                </Text>
                <View
                  style={{
                    height: 36,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginHorizontal: 10,
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      handleDetail(item.idProduct, item.amount);
                    }}>
                    <Text
                      style={{
                        color: '#00a46c',
                        fontSize: 14,
                      }}>
                      Xem chi tiêt
                    </Text>
                  </TouchableOpacity>
                  <View style={styles.ViewNumProduct}>
                    <TouchableOpacity
                      onPress={() => onHandleShopping(-1, item, index)}
                      style={styles.ButtomPlus}>
                      <Icon name="minus" size={20} color="gray" />
                    </TouchableOpacity>
                    <Text
                      style={{
                        color: '#62636a',
                        fontWeight: 'bold',
                        fontSize: 20,
                      }}>
                      {item.amount}
                    </Text>
                    <TouchableOpacity
                      onPress={() => onHandleShopping(1, item, index)}
                      style={styles.ButtomPlus}>
                      <Icon name="plus" size={20} color="gray" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          );
        })}
        {totalPrice ? (
          <View
            style={{
              height: 50,
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              borderRadius: 12,
              backgroundColor: '#00a46c',
              margin: 12,
            }}>
            <Text style={{fontSize: 18, color: 'white'}}>Tổng tiền: </Text>
            <Text style={{fontSize: 18, color: 'white'}}>
              {convertToNumberCommas(totalPrice)} Đ
            </Text>
          </View>
        ) : null}
      </ScrollView>
      <View style={styles.ViewBottomContainer}>
        <TouchableOpacity
          onPress={() => {
            handlePay();
          }}
          style={styles.ViewButtom}>
          <Text
            style={{
              color: '#FFF',
              fontSize: 18,
            }}>
            Thanh Toán
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default ShoppingCart;