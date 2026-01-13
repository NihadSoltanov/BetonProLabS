import { FC, createContext, useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { login, deactivateAccount } from 'src/data/querys/authQuery';
import { AuthContextData, AuthData } from 'src/domain/models/AuthContextData';
import { LoginDto } from 'src/domain/models/LoginDto';
import { loadString, remove, saveString, clear } from 'src/utils/appStorage';

const REMEMBER_KEY = 'remember_me';

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: FC<any> = ({ children }) => {
  const [authData, setAuthData] = useState<AuthData | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStorageData();
  }, []);

  // 🔁 App start → yalnız remember_me = 1 isə autologin
  async function loadStorageData(): Promise<void> {
    try {
      console.log('🚀 loadStorageData CALLED');

      const remember = await loadString(REMEMBER_KEY);
      console.log('📌 REMEMBER ME:', remember);

      // ❌ remember_me OFF → autologin YOX
      if (remember !== '1') {
        setAuthData(undefined);
        return;
      }

      const user = await loadString('user');
      const user_id = await loadString('user_id');
      const token = await loadString('token');
      const expired = await loadString('expired_time');

      console.log('📦 STORAGE CONTENT:', {
        user,
        token,
        expired,
        user_id,
      });

      if (user && token) {
        const _authData: AuthData = {
          auth_token: token,
          expired: expired ?? '',
          user,
          user_id: user_id ? Number(user_id) : undefined,
        };

        setAuthData(_authData);
      } else {
        setAuthData(undefined);
      }
    } catch (error) {
      console.log('❌ loadStorageData ERROR', error);
      setAuthData(undefined);
    } finally {
      setLoading(false);
    }
  }

  // 🔐 LOGIN
  const signIn = async (data: LoginDto & { rememberMe?: boolean }) => {
    // əvvəlki auth key-ləri təmizlə
    await remove('user');
    await remove('user_id');
    await remove('token');
    await remove('expired_time');
    await remove(REMEMBER_KEY);

    // digər junk-lar üçün
    await clear();

    const result = await login(data);
    console.log('✅ LOGIN RESULT:', result);

    if (!result) {
      Alert.alert('Invalid username or password');
      return;
    }

    // 🔥 App açıqkən session işləsin deyə
    setAuthData(result);

    // remember_me flag
    const remember = data.rememberMe ? '1' : '0';
    await saveString(REMEMBER_KEY, remember);

    // ✅ YALNIZ rememberMe = true isə storage-a yaz
    if (data.rememberMe) {
      await saveString('user', data.username);
      await saveString('token', result.auth_token);
      await saveString('expired_time', String(result.expired));

      if ((result as any).user_id !== undefined) {
        await saveString('user_id', String((result as any).user_id));
      }
    }
  };

  // 🔓 LOGOUT
  const signOut = async () => {
    setAuthData(undefined);

    await remove('user');
    await remove('user_id');
    await remove('token');
    await remove('expired_time');
    await remove(REMEMBER_KEY);

    await clear();
  };

  // 🗑 DELETE ACCOUNT
  const deleteAccount = async () => {
    if (!authData?.user_id) {
      Alert.alert('User not found');
      return;
    }

    try {
      await deactivateAccount(authData.user_id);
      await signOut();
    } catch (e) {
      Alert.alert('Delete account failed');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        authData,
        loading,
        signIn,
        signOut,
        deleteAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthContext, AuthProvider, useAuth };
