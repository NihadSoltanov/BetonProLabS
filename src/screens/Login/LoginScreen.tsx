// LoginScreen.tsx
import React, { useState, useEffect } from 'react';
import styles from './LoginScreen.styles';
import {
  View,
  ImageBackground,
  Image,
  TextInput,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { HomeBackgroundImage, LogoImage } from 'src/themes/images';
import { LAButton } from 'src/components/Button/LAButton';
import { COLORS } from 'src/themes/colors';
import { Dropdown } from 'react-native-element-dropdown';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useTranslate } from 'src/i18n/useTranslate';
import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { saveString, loadString } from 'src/utils/appStorage';
import { useAuth } from 'src/contexts/Auth';
import { FONT_SIZES } from 'src/themes/fonts';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LANG_DATA = [
  { label: 'English', value: 'en' },
  { label: 'Eesti', value: 'ee' },
  { label: 'Lietuvių', value: 'lt' },
  { label: 'Latviešu', value: 'lv' },
  { label: 'Русский', value: 'ru' },
  { label: 'Hrvat', value: 'cr' },
];

const REGION_DATA = [{ label: 'Lithuania', value: 'Lithuania' }];

const REMEMBER_KEY = 'remember_me';

export const LoginScreen = () => {
  const { t, i18n } = useTranslate();

  const [languageFocus, setLanguageFocus] = useState(false);
  const [regionFocus, setRegionFocus] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const auth = useAuth();
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      plant: '',
    },
  });

  // ✅ Screen açılınca remember_me oxu
  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem(REMEMBER_KEY);
      setRememberMe(saved === '1');
    })();
  }, []);

  const onSubmit: SubmitHandler<FieldValues> = async attrs => {
    const url = await loadString('base_url');

    await auth.signIn({
      username: attrs.email,
      password: attrs.password,
      base_url: url,
      rememberMe, // ✅ Auth-a ötürürük
    });
  };

  const onHandleLanguage = async (lang: string) => {
    setSelectedLanguage(lang);
    setLanguageFocus(false);

    await i18n.changeLanguage(lang);
    await saveString('language', lang);
  };

  // ✅ checkbox toggle + AsyncStorage-a yaz
  const toggleRememberMe = async () => {
    const next = !rememberMe;
    setRememberMe(next);
    await AsyncStorage.setItem(REMEMBER_KEY, next ? '1' : '0');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView>
        <ImageBackground source={HomeBackgroundImage} style={styles.image}>
          <Image source={LogoImage} style={styles.logo} />

          <View style={styles.wrapper}>
            <Text style={styles.welcomeBack}>{t('sign_in.welcome_back')}!</Text>
            <Text style={styles.pleaseLogin}>{t('sign_in.please_login')}</Text>

            <View style={styles.box}>
              {/* Email */}
              <View>
                <Text style={styles.inputLabel}>{t('sign_in.email')}</Text>
                <View style={styles.inputBottomBorder}>
                  <Controller
                    name="email"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        style={styles.input}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        textContentType="emailAddress"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                      />
                    )}
                  />
                </View>
                {errors.email && <Text>Email is required.</Text>}
              </View>

              {/* Password */}
              <View>
                <Text style={styles.inputLabel}>{t('sign_in.password')}</Text>
                <View style={styles.inputBottomBorder}>
                  <Controller
                    name="password"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        style={styles.input}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        autoCapitalize="none"
                        secureTextEntry
                      />
                    )}
                  />
                </View>
                {errors.password && <Text>Password is required.</Text>}
              </View>

              {/* Region */}
              <View>
                <Controller
                  control={control}
                  name="plant"
                  render={({ field: { value } }) => (
                  <Dropdown
                    style={[
                      styles.dropDown,
                      regionFocus && { borderBottomColor: COLORS.darkGreen },
                    ]}
                    placeholderStyle={[
                      styles.dropDownPlaceholderStyle,
                      { fontSize: 17, fontWeight: '700' },
                    ]}
                    selectedTextStyle={[
                      styles.dropDownSelectedTextStyle,
                      { fontSize: 17, fontWeight: '700' },
                    ]}
                    itemTextStyle={{ fontSize: 17, fontWeight: '700', color: COLORS.darkGreen }}
                    itemContainerStyle={{ paddingVertical: 6 }}
                    inputSearchStyle={styles.dropDownInputSearchStyle}
                    data={REGION_DATA}
                    value={value}
                    labelField="label"
                    valueField="value"
                    onChange={async item => {
                      setValue('plant', item.value);
                      setRegionFocus(false);
                      await saveString('base_url', item.value);
                    }}
                    iconColor={COLORS.darkGreen}
                    onFocus={() => setRegionFocus(true)}
                    onBlur={() => setRegionFocus(false)}
                    placeholder={!regionFocus ? t('sign_in.select_region') : '...'}
                  />

                  )}
                />
              </View>

              {/* Language */}
              <View>
                <Dropdown
                  style={[
                    styles.dropDown,
                    languageFocus && { borderBottomColor: COLORS.darkGreen },
                  ]}
                  placeholderStyle={[
                    styles.dropDownPlaceholderStyle,
                    { fontSize: 17, fontWeight: '700' },
                  ]}
                  selectedTextStyle={[
                    styles.dropDownSelectedTextStyle,
                    { fontSize: 17, fontWeight: '700' },
                  ]}
                  itemTextStyle={{ fontSize: 17, fontWeight: '700', color: COLORS.darkGreen }}
                  itemContainerStyle={{ paddingVertical: 6 }}
                  inputSearchStyle={styles.dropDownInputSearchStyle}
                  data={LANG_DATA}
                  value={selectedLanguage}
                  labelField="label"
                  valueField="value"
                  onChange={item => onHandleLanguage(item.value)}
                  iconColor={COLORS.darkGreen}
                  onFocus={() => setLanguageFocus(true)}
                  onBlur={() => setLanguageFocus(false)}
                  placeholder={!languageFocus ? t('sign_in.select_language') : '...'}
                />

              </View>

              {/* ✅ Remember me (Select Language altında) */}
             <View style={styles.rememberRow}>
               <TouchableOpacity
                 activeOpacity={0.8}
                 onPress={toggleRememberMe}
                 style={styles.rememberTouch}
               >
                 <View
                   style={[
                     styles.checkboxOuter,
                     { borderColor: COLORS.lightGreen },
                     rememberMe && { backgroundColor: COLORS.lightGreen },
                   ]}
                 >
                   {rememberMe ? <Text style={styles.checkboxTick}>✓</Text> : null}
                 </View>

<Text style={[styles.rememberText, { fontSize: 17, fontWeight: '700' }]}>
                   {t('sign_in.remember_me')}
                 </Text>
               </TouchableOpacity>
             </View>

              {/* Buttons */}
              <View style={styles.btnWrapper}>
                <View style={styles.btnHalf}>
                  <LAButton
                    onPress={handleSubmit(onSubmit)}
                    fontColor={COLORS.darkGreen}
                    buttonColor={COLORS.lightGreen}
                    title={t('sign_in.login')}
                    titleSize={FONT_SIZES.small}
                  />
                </View>

                <View style={styles.btnHalf}>
                  <LAButton
                    onPress={() => navigation.navigate('Register' as never)}
                    fontColor={COLORS.darkGreen}
                    buttonColor={COLORS.lightGreen}
                    title={t('sign_in.register')}
                    titleSize={FONT_SIZES.small}
                  />
                </View>
              </View>
            </View>
          </View>
        </ImageBackground>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
