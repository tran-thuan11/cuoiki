import React, {useState} from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
const {height, width} = Dimensions.get('window');

const Register = ({navigation}) => {
  const [data, setData] = React.useState({
    username: '',
    password: '',
    confirm_password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    confirm_secureTextEntry: true,
  });
  const textInputChange = val => {
    if (val.length !== 0) {
      setData({
        ...data,
        username: val,
        check_textInputChange: isEmail(val),
      });
    } else {
      setData({
        ...data,
        username: val,
        check_textInputChange: false,
      });
    }
  };

  const handlePasswordChange = val => {
    setData({
      ...data,
      password: val,
    });
  };

  const handleConfirmPasswordChange = val => {
    setData({
      ...data,
      confirm_password: val,
    });
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const updateConfirmSecureTextEntry = () => {
    setData({
      ...data,
      confirm_secureTextEntry: !data.confirm_secureTextEntry,
    });
  };
  const isEmail = value => {
    // eslint-disable-next-line no-useless-escape
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !!regex.test(String(value).toLowerCase());
  };
  const InserUserToTable = async () => {
    let body = {
      email: data.username,
      password: data.password,
      id: new Date().toISOString(),
    };
    await firestore().collection('USERS').add(body);
    console.log('add');
  };
  const onRegister = () => {
    if (data.username.length == 0 || data.password.length == 0) {
      Alert.alert('Thông báo', 'Vui lòng nhập đầy đủ thông tin', [
        {text: 'Okay'},
      ]);
    } else if (data.password !== data.confirm_password) {
      Alert.alert('Thông báo', 'Mật khẩu không trùng khớp!', [{text: 'Okay'}]);
    } else if (!isEmail(data.username)) {
      Alert.alert('Thông báo', 'Vui lòng nhập đúng định dạng email', [
        {text: 'Okay'},
      ]);
    } else if (data.password.length < 6) {
      Alert.alert('Thông báo', 'Mật khẩu phải nhiều hơn 6 ký tự', [
        {text: 'Okay'},
      ]);
    } else {
      try {
        auth()
          .createUserWithEmailAndPassword(data.username, data.password)
          .then(() => {
             InserUserToTable();
            navigation.goBack();
          })
          .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
              Alert.alert('Thất bại!', 'Email đã được sử dụng!', [
                {text: 'Okay'},
              ]);
            }
            if (error.code === 'auth/invalid-email') {
              Alert.alert('Thất bại!', 'Email bạn nhập không hợp lệ!', [
                {text: 'Okay'},
              ]);
            }

            console.error(error);
          });
      } catch (error) {
        Alert.alert('Register fail!', error, [{text: 'Okay'}]);
      }
    }
  };

  return (
    <SafeAreaView style={{backgroundColor: '#FFF', height: '100%', flex: 1}}>
      <Image
        source={require('../../images/Avatar/logo.png')}
        style={{
          width: 163,
          height: 119,
          alignSelf: 'center',
          marginTop: 20,
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: 55,
          borderWidth: 2,
          marginTop: 50,
          paddingHorizontal: 10,
          borderColor: '#5abd8c',
          borderRadius: 23,
          paddingVertical: 2,
        }}>
        <Icon name="mail" color="#5abd8c" size={24} />
        <TextInput
          placeholder="Email"
          placeholderTextColor="#5abd8c"
          style={{paddingHorizontal: 10, marginRight: 10, width: width / 2.2}}
          autoCapitalize="none"
          onChangeText={val => textInputChange(val)}
        />
        {data.check_textInputChange ? (
          <Animatable.View animation="bounceIn">
            <Feather name="check-circle" color="#5abd8c" size={20} />
          </Animatable.View>
        ) : null}
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: 55,
          borderWidth: 2,
          marginTop: 15,
          paddingHorizontal: 10,
          borderColor: '#5abd8c',
          borderRadius: 23,
          paddingVertical: 2,
        }}>
        <Icon name="lock-closed" color="#5abd8c" size={28} />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#5abd8c"
          style={{paddingHorizontal: 10, marginRight: 10, width: width / 2.2}}
          secureTextEntry={data.secureTextEntry ? true : false}
          autoCapitalize="none"
          onChangeText={val => handlePasswordChange(val)}
        />
        <TouchableOpacity onPress={updateSecureTextEntry}>
          {data.secureTextEntry ? (
            <Feather name="eye-off" color="#5abd8c" size={22} />
          ) : (
            <Feather name="eye" color="#5abd8c" size={22} />
          )}
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: 55,
          borderWidth: 2,
          marginTop: 15,
          paddingHorizontal: 10,
          borderColor: '#5abd8c',
          borderRadius: 23,
          paddingVertical: 2,
        }}>
        <Icon name="lock-closed" color="#5abd8c" size={28} />
        <TextInput
          placeholder=" Confirm Password"
          placeholderTextColor="#5abd8c"
          style={{paddingHorizontal: 10, marginRight: 10, width: width / 2.2}}
          secureTextEntry={data.confirm_secureTextEntry ? true : false}
          autoCapitalize="none"
          onChangeText={val => handleConfirmPasswordChange(val)}
        />
        <TouchableOpacity onPress={updateConfirmSecureTextEntry}>
          {data.confirm_secureTextEntry ? (
            <Feather name="eye-off" color="#5abd8c" size={22} />
          ) : (
            <Feather name="eye" color="#5abd8c" size={22} />
          )}
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() => {
          onRegister();
        }}
        style={{
          marginHorizontal: 55,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 30,
          backgroundColor: '#5abd8c',
          paddingVertical: 16,
          borderRadius: 23,
        }}>
        <Text
          style={{
            color: 'white',
            fontFamily: 'SemiBold',
            fontSize: 20,
          }}>
          Register
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text
          style={{
            alignSelf: 'center',
            color: '#5abd8c',
            fontFamily: 'SemiBold',
            paddingVertical: 25,
            fontSize: 18,
          }}>
          Login
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
export default Register;