import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  topView: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 50,
  },
  img: {
    width: 200,
    height: 200,
  },
  bottomView: {
    flexDirection: 'column',
    paddingRight: 20,
    paddingLeft: 20,
  },
  input: {
    color: '#2e3649',
  },
  textConteiner: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  textRegister: {
    fontWeight: 'bold',
  },
});
