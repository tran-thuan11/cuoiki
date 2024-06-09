import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/Home';
import Detail from '../screens/Detail';
import Login from '../screens/Login';
import Register from '../screens/Register';
import ShoppingCart from '../screens/ShoppingCart';
import Search from '../screens/Search';
import Payment from '../screens/Payment';
import SuccessOdered from '../screens/SuccessOrdered';
import AdminScreen from '../screens/AdminScreen';
import BookDetail from '../screens/BookDetail';
import AddBook from '../screens/AddBook';
import ForgotPassword from '../screens/ForgotPassword';

const Stack = createStackNavigator();
// const screenOptionStyle = {
//   headerShown: false,
// };

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator >
      <Stack.Screen options={{headerShown:false}} name="Login" component={Login} />
      <Stack.Screen options={{headerShown:false}} name="Register" component={Register} />
      <Stack.Screen options={{headerShown:false}} name="Home" component={Home} />
      <Stack.Screen options={{headerShown:false}} name="Detail" component={Detail} />
      <Stack.Screen options={{headerTitle:'Quên mật khẩu?',headerStyle:{backgroundColor:"#00a46c"},headerTintColor:'white'}} name="ForgotPassword" component={ForgotPassword}/>
      <Stack.Screen options={{headerShown:false}} name="Search" component={Search} />
      <Stack.Screen options={{headerShown:false}} name="ShoppingCart" component={ShoppingCart} />
      <Stack.Screen options={{headerShown:false}} name="Payment" component={Payment} />
      <Stack.Screen options={{headerShown:false}} name="SuccessOrdered" component={SuccessOdered} />
      <Stack.Screen options={{headerStyle:{backgroundColor:"#00a46c"},headerTintColor:'white'}} name="Admin" component={AdminScreen}/>
      <Stack.Screen options={{headerTitle:'Chi tiết sách',headerStyle:{backgroundColor:"#00a46c"},headerTintColor:'white'}} name="BookDetail" component={BookDetail}/>
      <Stack.Screen options={{headerTitle:'Thêm sách mới',headerStyle:{backgroundColor:"#00a46c"},headerTintColor:'white'}} name="AddBook" component={AddBook}/>
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;