import useSocialAuth from '@/hooks/useSocialAuth';
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { FontAwesome } from '@react-native-vector-icons/fontawesome';

const SignIn = () => {
  const {handleSocialAuth, loadingStrategy} = useSocialAuth()
  
  return (
    <View>
      <Image source={require("@/assets/images/sign-in-banner.jpg")} className='h-[38%]'/>
      <View className='-mt-12 h-full bg-white p-8 mb-16 rounded-tr-[2.375rem] rounded-tl-[2.375rem]'>

        <View className='flex items-center gap-2'>
          <Text className='text-cod-gray text-center text-4xl font-bold'>Discover Amazing Recipes</Text>
          <Text className='text-center text-kabul text-base'>Cook smarter with thousands of curated recipes designed for taste and skill level.</Text>
        </View>

        <View className='flex items-center gap-4 mt-6'>
          <TouchableOpacity onPress={() => handleSocialAuth("oauth_google")} className='flex flex-row gap-3 py-4 w-full items-center justify-center border border-ebb rounded-full'>
            <Image source={require("@/assets/images/google.png")} className='h-5 w-5' />
            <Text className='text-base font-semibold text-cod-gray'>Continue with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleSocialAuth('oauth_apple')} className='flex flex-row gap-3 py-4 bg-black w-full items-center justify-center border border-ebb rounded-full'>
            {/* <Image source={require("@/assets/images/apple.png")} className='h-5 w-5' /> */}
            <FontAwesome name="apple" color="#fff" size={22} />
            <Text className='text-base font-semibold text-white'>Continue with Apple</Text>
          </TouchableOpacity>
        </View>

        <View className='mt-15'>
        <Text className='text-center text-kabul text-base'>By continuing, you are agree to our Terms and Privacy Policy.</Text>
        </View>
      </View>
    </View>
  )
}

export default SignIn;