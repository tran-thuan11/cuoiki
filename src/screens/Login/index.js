import { useState, useEffect } from "react";
import { Alert, StyleSheet, ToastAndroid, TouchableOpacity, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { Checkbox, HelperText } from "react-native-paper";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { Image } from "react-native";

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [userLogin, setUserLogin] = useState(null);

    const handleLogin = async () => {
        try {
            if (email.trim() === "" || password.trim() === "") {
                ToastAndroid.show("Vui lòng nhập email và password!", ToastAndroid.SHORT);
                return;
            }
            if (!email.includes('@')) {
                ToastAndroid.show("Email phải chứa ký tự '@'. Vui lòng nhập lại!", ToastAndroid.SHORT);
                return;
            }
            if (password.length < 6) {
                ToastAndroid.show("Mật khẩu phải có ít nhất 6 ký tự. Vui lòng nhập lại!", ToastAndroid.SHORT);
                return;
            }

            const userCredential = await auth().signInWithEmailAndPassword(email, password);
            const user = userCredential.user;
            const userDoc = await firestore().collection('USERS').doc(user.email).get();

            if (userDoc.exists) {
                const userData = userDoc.data();
                const { state } = userData;
                console.log(state);
                if (state === 'Lock') {
                    Alert.alert("Tài khoản đang tạm khóa, vui lòng liên hệ Admin");
                    
                } else {
                    setUserLogin(userData);
                }
                
            } else {
                ToastAndroid.show("Tài khoản không tồn tại. Vui lòng nhập lại!", ToastAndroid.SHORT);
            }

        } catch (error) {
            ToastAndroid.show("Tài khoản email hoặc mật khẩu không đúng. Vui lòng nhập lại!", ToastAndroid.SHORT);
        }
    };

    useEffect(()=>{
        if(userLogin != null)
            {
                console.log(userLogin)
                if(userLogin.role == "admin" && userLogin.state =="Available") navigation.navigate("Admin")
                else if(userLogin.role =="user" && userLogin.state =="Available") navigation.navigate("Home")
            }
    },[userLogin])

    return (
        <View style={styles.container}>
            <Image
        source={require('../../images/Avatar/logo.png')}
        style={styles.logo}
      />
            <TextInput
                style={styles.input}
                label={"Email"}
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                label={"Mật khẩu"}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
            />
            <Text style={{ textAlign: 'right', paddingEnd: 30, fontWeight: 'bold', fontSize: 16 }}
                onPress={() => navigation.navigate("ForgotPassword")}>Quên mật khẩu?</Text>
            <View style={{ flexDirection: 'row', alignSelf: 'flex-start', alignItems: 'center', marginLeft: 30 }}>
                <Checkbox
                    onPress={() => setShowPassword(!showPassword)}
                    status={showPassword ? "checked" : "unchecked"}
                    style={{ marginRight: 10 }}
                />
                <Text onPress={() => setShowPassword(!showPassword)}
                    style={{ fontSize: 15 }}>Hiển thị mật khẩu</Text>
            </View>
            <TouchableOpacity onPress={handleLogin} style={styles.button}>
                <Text style={{fontSize:16, color:'white'}}>Đăng nhập</Text>
            </TouchableOpacity>
            <View style={styles.footerView}>
                <Text style={styles.footerText}>Bạn chưa có tài khoản?</Text>
                <Button style={styles.footerLink} onPress={() => navigation.navigate("Register")}>Đăng ký</Button>
            </View>
        </View>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignContent: 'center'
    },
    logo: {
        alignSelf: 'center',
        height: 200,
        width: 200,
        margin: 30,
    },
    input: {
        height: 50,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 16
    },
    button: {
        backgroundColor: '#00a46c',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        height: 48,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold"
    },
    footerView: {
        flexDirection: "row",
        justifyContent: 'center',
        alignContent: 'center',
        marginTop: 10
    },
    footerText: {
        fontSize: 16,
        color: '#000000',
        alignSelf: 'center',
        paddingLeft: 100
    },
    footerLink: {
        color: "navy",
        fontWeight: "bold",
        fontSize: 16,
        paddingRight: 80
    }
});