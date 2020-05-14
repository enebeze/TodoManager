import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  topView: {
    flex: 0.2,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 25,
  },
  img: {
    width: 50,
    height: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  bottomView: {
    flex: 1,
    flexDirection: 'column',
    paddingRight: 20,
    paddingLeft: 20,
  },

  input: {
    color: '#2e3649',
  },
});
