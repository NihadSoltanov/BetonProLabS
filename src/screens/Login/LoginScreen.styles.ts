// LoginScreen.styles.ts
import { StyleSheet } from 'react-native';
import { COLORS } from 'src/themes/colors';
import { FONT_SIZES } from 'src/themes/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.darkGreen,
  },
  scrollView: {
    flex: 1,
  },
  boxElements: {
    marginTop: '10%',
  },
  logo: {
    width: '50%',
    marginLeft: '-35%',
    resizeMode: 'contain',
    height: 200,
  },
  welcomeBack: {
    fontSize: 35,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 20,
  },
  pleaseLogin: {
    fontSize: 18,
    fontWeight: '400',
    color: COLORS.white,
    marginBottom: 30,
  },
input: {
  color: COLORS.darkGreen,
  fontSize: 18,        // 🔼 büyüdü
  fontWeight: '600',   // 🔥 semi-bold
},

  box: {
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },

  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  wrapper: {
    width: '100%',
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 0,
  },

  btnWrapper: {
    padding: 10,
    paddingTop: 10,
    paddingBottom: 55,
    width: '100%',
    marginTop: 30,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },

  btnHalf: {
    width: '48%',
  },

  inputLabel: {
    fontSize: 16,
    marginTop: 30,
    color: COLORS.darkGreen,
  },

  inputBottomBorder: {
    borderBottomWidth: 1,
    marginTop: 20,
    borderBottomColor: COLORS.darkGreen,
  },

  welcome: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  error: {
    fontSize: 14,
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
  link: {
    color: 'blue',
  },

  helpButton: {
    marginTop: 15,
    alignSelf: 'flex-start',
    backgroundColor: '#008e46',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 5,
  },
  helpText: {
    color: COLORS.white,
    fontSize: 16,
  },
  dropDownLabel: {
    position: 'absolute',
    backgroundColor: COLORS.white,
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 16,
    color: COLORS.darkGreen,
  },
  dropDown: {
    height: 50,
    backgroundColor: COLORS.transparent,
    borderBottomColor: COLORS.darkGreen,
    borderBottomWidth: 1,
    marginTop: 20,
  },
  dropDownPlaceholderStyle: {
    fontSize: 16,
    color: COLORS.darkGreen,
  },
  dropDownSelectedTextStyle: {
    fontSize: 14,
    color: COLORS.darkGreen,
  },
  dropDownInputSearchStyle: {
    height: 40,
    fontSize: 14,
    color: COLORS.darkGreen,
  },
  forgotPassword: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginTop: 13,
  },
  forgotPasswordText: {
    color: COLORS.darkGreen,
    fontSize: 14,
  },

  // ✅ Remember me styles
  rememberRow: {
    marginTop: 14,
  },
  rememberTouch: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  checkboxOuter: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  checkboxTick: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 18,
  },


  // ✅ içi / işarəsi button rəngi
  checkboxInner: {
    width: 12,
    height: 12,
    borderRadius: 3,
    backgroundColor: COLORS.lightGreen,
  },

  rememberText: {
    marginLeft: 10,
    color: COLORS.darkGreen,
    fontSize: FONT_SIZES?.small ?? 14,
  },
});

export default styles;
