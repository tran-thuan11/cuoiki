import {Dimensions, StyleSheet} from 'react-native';
const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
    flex: 1,
  },
  ButtomProduct: {
    marginTop: 16,
    height: 120,
    marginHorizontal: 6,
    backgroundColor: 'white',
    borderRadius: 20,
    flexDirection: 'row',
  },
  ImageProduct: {
    height: 120,
    width: 120,
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
  },
  ViewInfo: {
    marginHorizontal: 12,
    width: width - 100 - 32,
    paddingVertical: 6,
  },
  TxtNamePro: {
    fontSize: 16,
    color: 'green',
    fontWeight: '500',
    lineHeight: 24,
  },
  TxtAuthor: {
    fontSize: 14,
    color: 'black',
    fontWeight: '500',
    lineHeight: 20,
  },
  TxtPrice: {
    fontSize: 14,
    color: 'black',
    fontWeight: '500',
    lineHeight: 20,
  },
  ViewHeader: {
    height: 50,
    // width: width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    backgroundColor: '#5abd8c',
    alignItems: 'center',
  },
  ViewSearch: {
    height: 50,
    width: '75%',
    marginTop: 15,
    marginLeft: 7,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#e1e1e1',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ViewTextinput: {
    opacity: 0.7,
    marginLeft: 5,
    width: '100%',
    backgroundColor: 'transparent',
  },
  ViewButtomSearch: {
    marginTop: 15,
    marginLeft: 10,
    fontSize: 15,
    opacity: 0.7,
    fontWeight: 'bold',
    color: '#5abd8c',
  },
  TxtTitle: {
    marginTop: 3,
    fontSize: 18,
    fontWeight: '600',
    marginHorizontal: 12,
  },
});