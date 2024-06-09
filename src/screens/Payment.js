import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, TextInput, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Button } from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import auth from "@react-native-firebase/auth";

const Payment = ({ navigation }) => {
    const user = auth().currentUser;
    const [cartItems, setCartItems] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [selectedValue2, setSelectedValue2] = useState("Tiền mặt");
    const [fullname, setFullname] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const userRef = firestore().collection("USERS");

    useEffect(() => {
        userRef.doc(user.email).onSnapshot(response => setFullname(response.data()));
    }, []);

    const handleOrder = async () => {
        try {
            // Add the order to the orders collection
            await firestore().collection("orderProduct").add({
                address,
                phone,
                totalAmount,
                paymentMethod: selectedValue2,
                items: cartItems,
            });

            // Clear the shopping cart
            const batch = firestore().batch();
            cartItems.forEach(item => {
                const docRef = firestore().collection('ShoppingCart').doc(item.id);
                batch.delete(docRef);
            });
            await batch.commit();

            // Navigate to the success screen
            navigation.navigate("SuccessOrdered");
        } catch (error) {
            console.error("Error placing order: ", error);
        }
    };

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const cartCollection = await firestore().collection('ShoppingCart').get();
                const items = cartCollection.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setCartItems(items);
                calculateTotal(items);
            } catch (error) {
                console.error("Error fetching cart items: ", error);
            }
        };

        const calculateTotal = (items) => {
            const total = items.reduce((sum, item) => sum + (item.priceProduct * item.amount), 0);
            setTotalAmount(total);
        };

        fetchCartItems();
    }, []);

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.contentContainer}>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>Thanh toán</Text>
                    </View>

                    <View style={styles.recyclerView}>
                        {cartItems.map((item) => (
                            <View key={item.id} style={styles.cartItem}>
                                <Text style={styles.itemName}>{item.nameProduct}</Text>
                                <Text style={styles.itemPrice}>Giá: {item.priceProduct}đ</Text>
                                <Text style={styles.itemQuantity}>Số lượng: {item.amount}</Text>
                            </View>
                        ))}
                    </View>

                    <View style={styles.detailsContainer}>
                        <Text style={styles.detailsHeaderText}>Chi tiết đơn hàng</Text>
                        <Text style={styles.subHeaderText}>Phương thức thanh toán</Text>
                        <Picker
                            style={styles.picker}
                            selectedValue={selectedValue2}
                            onValueChange={(itemValue) => setSelectedValue2(itemValue)}
                        >
                            <Picker.Item label='Tiền mặt' value="Tiền mặt" />
                            <Picker.Item label='Ví điện tử' value="Ví điện tử" />
                        </Picker>
                        <Text style={styles.subHeaderText}>Họ và tên</Text>
                        <TextInput value={fullname.fullName} onChangeText={(text) => setFullname({ ...fullname, fullName: text })} style={styles.textInput} />
                        <Text style={styles.subHeaderText}>Số điện thoại</Text>
                        <TextInput style={styles.textInput} value={phone} onChangeText={setPhone} keyboardType='numeric' />
                        <Text style={styles.subHeaderText}>Địa chỉ giao hàng</Text>
                        <TextInput style={styles.textInput} value={address} onChangeText={setAddress} />
                    </View>

                    <Text style={styles.paymentHeaderText}>Chi tiết thanh toán</Text>
                    <View style={styles.paymentContainer}>
                        <View style={styles.paymentRow}>
                            <Text style={styles.paymentText}>Tổng tiền hàng</Text>
                            <Text style={styles.paymentAmountText}>{totalAmount}đ</Text>
                        </View>

                        <View style={styles.divider} />
                        <View style={styles.paymentRow}>
                            <Text style={styles.totalText}>Tổng thành tiền</Text>
                            <Text style={styles.totalAmountText}>{totalAmount}đ</Text>
                        </View>
                    </View>

                    <Button
                        title="Đặt hàng"
                        buttonStyle={styles.placeOrderButton}
                        onPress={handleOrder}
                    />
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        width: '100%',
        height: '100%',
    },
    contentContainer: {
        padding: 16,
    },
    header: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        backgroundColor: '#00a46c',
        alignItems: 'center',
    },
    headerText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },
    recyclerView: {
        width: '100%',
        paddingVertical: 8,
    },
    cartItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    itemName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    itemPrice: {
        fontSize: 16,
        color: '#78909C',
    },
    itemQuantity: {
        fontSize: 16,
        color: '#78909C',
    },
    detailsContainer: {
        marginTop: 10,
    },
    detailsHeaderText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#78909C',
    },
    subHeaderText: {
        fontSize: 18,
        marginBottom: 10,
    },
    picker: {
        height: 50,
        backgroundColor: '#F5F5F5',
        marginBottom: 10,
    },
    textInput: {
        flex: 1,
        height: 40,
        backgroundColor: '#F5F5F5',
        paddingHorizontal: 10,
        color: '#78909C',
        marginBottom: 10,
    },
    paymentHeaderText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 16,
        color: '#78909C',
    },
    paymentContainer: {
        marginTop: 16,
        backgroundColor: '#F5F5F5',
        padding: 16,
    },
    paymentRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    paymentText: {
        fontSize: 16,
    },
    paymentAmountText: {
        fontSize: 16,
        color: '#78909C',
    },
    divider: {
        height: 1,
        backgroundColor: '#ABABAB',
        marginVertical: 8,
    },
    totalText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    totalAmountText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#78909C',
    },
    placeOrderButton: {
        backgroundColor: '#00a46c',
        marginTop: 16,
    },
});

export default Payment;
