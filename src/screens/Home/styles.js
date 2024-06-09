import {Dimensions, StyleSheet} from 'react-native';
const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
    flex: 1,
  },
  ImageHeader: {
    height: 486,
    width: 486,
    zIndex: -2,
    marginLeft: -45,
    marginTop: -274,
  },
  ViewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 15,
  },

  TxtTextInput: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#5abd8c',
    alignSelf: 'center',
  },

  ViewTitileProducts: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 12,
  },

  ViewLine: {
    marginTop: 20,
    height: 130,
    width: 160,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: '#5abd8c',
  },

  ViewProducts: {
    marginLeft: -160,
    marginRight: 1,
    flexDirection: 'row',
    marginBottom: 12,
    flex: 1,
  },
  ButtomDetail: {
    width: 130,
    marginLeft: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  ViewImageProducts: {
    width: 129,
    height: 170,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignSelf: 'center',
  },
  ViewTitilePro: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 5,
    marginHorizontal: 3,
  },
  TxtAuthor: {
    fontSize: 12,
    opacity: 0.5,
    marginTop: 3,
    marginHorizontal: 6,
    marginBottom: 3,
  },
  TxtPrice: {
    fontSize: 12,
    opacity: 0.5,
    marginHorizontal: 6,
    marginBottom: 3,
  },
});