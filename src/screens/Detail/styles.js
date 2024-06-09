import {Dimensions, StyleSheet} from 'react-native';
const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flex: 1,
  },
  ViewHeader: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    backgroundColor: '#5abd8c',
    alignItems: 'center',
  },
  ImageView: {
    width: 200,
    height: 270,
    alignSelf: 'center',
    borderRadius: 20,
  },

  TxtName: {
    fontSize: 20,
    fontWeight: 'bold',
    opacity: 0.6,
    width: '60%',
    textAlign: 'center',
  },
  TxtPrice: {
    opacity: 0.3,
    width: '60%',
    textAlign: 'center',
  },
  TxtAuthor: {
    opacity: 0.7,
    width: '60%',
    textAlign: 'center',
  },
  TxtIntroduce: {
    paddingHorizontal: 16,
    fontWeight: '500',
    color: '#00a46c',
    fontSize: 16,
  },
  ViewBottomContainer: {
    flexDirection: 'row',
    width: width,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
    borderTopWidth: 0.25,
    borderColor: 'gray',
  },
  ViewButtom: {
    width: width * 0.4,
    backgroundColor: '#00a46c',
    height: 45,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ViewNumProduct: {
    width: width * 0.5,
    alignItems: 'center',
    justifyContent: 'space-around',
    // backgroundColor: 'red',
    height: 50,
    paddingHorizontal: 12,
    flexDirection: 'row',
  },
  ButtomPlus: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderColor: 'gray',
    borderWidth: 0.5,
  },
});