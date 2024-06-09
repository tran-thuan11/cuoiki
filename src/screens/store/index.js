import {createContext, useContext, useReducer, useMemo} from "react"
import auth from "@react-native-firebase/auth"
import firestore from "@react-native-firebase/firestore"
import { Alert } from "react-native";
const MyContext = createContext()
MyContext.displayName = "MyContextContext"
function reducer(state, action){
    switch(action.type){
        case "USER_LOGIN":{
            return{...state, userLogin: action.value}
        }
        case "LOGOUT":
            return{...state, userLogin: null}
        default:{
            throw new Error(`Unhandled action type: ${action.type}`)
        }
    }
}

function MyContextControllerProvider({children}){
    const initialState={
        userLogin: null
    }
    const [controller, dispatch] = useReducer(reducer, initialState)
    const value = useMemo(()=>[controller,dispatch],[controller, dispatch])
    return <MyContext.Provider value={value}>{children}</MyContext.Provider>
}
function useMyContextController(){
    const context = useContext(MyContext)
    if(!context){
        throw new Error("useMyContextController should be used inside the MyContextControllerProvider")
    }
    return context
}
const USERS = firestore().collection("USERS")
const SERVICES = firestore().collection("BOOKS")
const createAccount = (email, password, fullName, phone,role) =>{
    auth().createUserWithEmailAndPassword(email,password)
    .then(()=>{
        console.log("Tao tai khoan thanh cong voi email: " + email)
        USERS.doc(email)
        .set(
            {
                email,
                fullName,
                phone,
                role
            }
        )
    })
    .catch(e=>console.log(e.message))
}
const login = (dispatch, email, password) => {
    auth().signInWithEmailAndPassword(email,password).then(()=>USERS.doc(email).onSnapshot(u=>{
            if(u.exists)
            {
                const value = u.data()
                dispatch({type: "USER_LOGIN", value:u.data()})
                console.log("Đăng nhập thành công với user : ", value)
               
            }else{
                Alert.alert("Tài khoản chưa đăng ký")
            }
     
        })
    )
    .catch(e=> alert("Sai user và password"))
}
const ForgotPassword = (email) =>{
    auth().sendPasswordResetEmail(email).then(()=>{
        console.log("Đã gửi link Reset tới " + email)
    })
}

const logout = (dispatch) =>{
    auth().signOut().then(()=> dispatch({type: "LOGOUT"}))
   
}

const createNewService = (newService) =>{
    newService.finalUpdate = firestore.FieldValue.serverTimestamp()
    SERVICES.add(newService).then(()=>alert("Đã thêm sách mới")).catch((e)=>alert(e))
}

export{
    MyContextControllerProvider,
    useMyContextController,
    login,
    logout,
    createAccount,
    ForgotPassword,
    createNewService
}