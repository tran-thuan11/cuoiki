import React, {useRef, useState} from 'react';

import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Keyboard,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import styles from './styles';
import Icon1 from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Ionicons';
import DataProduct from '../../Data/DataProduct';
import {convertToNumberCommas} from '../../utilities';
const DataProducts = DataProduct;

const Search = ({navigation}) => {
  const [dataSearch, setDataSearch] = useState(DataProducts);
  let timeout = useRef(null);
  const [textinput, setTextinput] = React.useState('');
  const [isLoading, setIsLoading] = useState(true);

  //Tìm kiếm theo ten của sản phẩm
  function onSearch(text) {
    setIsLoading(true);
    let term = text;
    if (term && term.length >= 1 && DataProducts.length != 0) {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        // lọc mảng các phẩn từ có tên chứa tử term/
        var menu = DataProducts.filter(menuname =>
          menuname.nameProducts.toLowerCase().includes(term.toLowerCase()),
        );
        setDataSearch(menu);
        //mảng tìm kiểm
        setIsLoading(false);
      }, 300);
    }
  }

  // render view của một sản phẩm
  const renderItemProducts = ({item, index}) => {
    return (
      <TouchableOpacity key={index} style={styles.ButtomProduct}>
        <Image source={item.avatarImage} style={styles.ImageProduct} />
        <View style={styles.ViewInfo}>
          <Text numberOfLines={3} style={styles.TxtNamePro}>
            {item.nameProducts}
          </Text>
          <Text numberOfLines={1} style={styles.TxtAuthor}>
            Tác giả : {item.author}
          </Text>
          <Text numberOfLines={1} style={styles.TxtPrice}>
            Giá tiền: {convertToNumberCommas(item.price)} Đ
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* //header */}
      <View style={styles.ViewHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon2 name="arrow-back" size={30} color="white" />
        </TouchableOpacity>
        <Text style={{fontSize: 20, color: 'white'}}>Tìm kiếm sách</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Icon1 name="shoppingcart" size={30} color="white" />
        </TouchableOpacity>
      </View>

      {/* //view Tìm kiếm */}
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={styles.ViewSearch}>
          <FontAwesome5 name="search" color="#5abd8c" />
          <TextInput
            placeholder="Nhập tên sách..."
            placeholderTextColor="#5abd8c"
            onChangeText={val => setTextinput(val)}
            style={styles.ViewTextinput}
            onEndEditing={() => {
              Keyboard.dismiss();
              onSearch(textinput);
            }}
          />
        </View>
        <TouchableOpacity
          hitSlop={{top: 10, left: 10, right: 10, bottom: 10}}
          onPress={() => {
            Keyboard.dismiss();
            onSearch(textinput);
          }}>
          <Text style={styles.ViewButtomSearch}>Tìm kiếm</Text>
        </TouchableOpacity>
      </View>

      {/* view list các sản phẩm khi tìm kiểm và tất cả các sản phẩm khi chưa tìm */}
      {textinput.length <= 1 ? (
        <>
          <Text style={styles.TxtTitle}>Dành cho bạn</Text>
          <FlatList
            data={DataProducts}
            renderItem={renderItemProducts}
            keyExtractor={(item, index) => index.toString()}
          />
        </>
      ) : (
        <>
          <Text style={styles.TxtTitle}>Kết quả tìm kiếm </Text>
          {isLoading ? (
            <ActivityIndicator size="large" color="#5abd8c" />
          ) : (
            <View>
              {dataSearch.length != 0 ? (
                <FlatList
                  data={dataSearch}
                  renderItem={renderItemProducts}
                  keyExtractor={(item, index) => index.toString()}
                />
              ) : (
                <Text style={{marginHorizontal: 12}}>Chưa có kết quả nào</Text>
              )}
            </View>
          )}
        </>
      )}
    </View>
  );
};
export default Search;