import { useAuth } from "@clerk/expo";
import { Redirect, Tabs } from "expo-router";
import { FontAwesome } from '@react-native-vector-icons/fontawesome';
// import { NativeTabs } from "expo-router/build/native-tabs";

export default function TabsLayout() {
    const {isLoaded, isSignedIn} = useAuth()
    if (!isLoaded) {
        return null;
    }

    if (isSignedIn) {
        return <Redirect href={"/(auth)/sign-in"}/>
    }

    return  <Tabs screenOptions={{ tabBarActiveTintColor: "#ab3500", headerShown: false}}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />
        <Tabs.Screen 
          name="search"
          options={{
            title: 'Search',
            tabBarIcon : ({color}) => <FontAwesome color={color} size={28} name="search"/>
          }}
        />
      <Tabs.Screen
        name="favourites"
        options={{
          title: 'Favourites',
          tabBarIcon: ({ color, focused }) => <FontAwesome size={28} name={ focused ? "heart" : "heart-o"} color={color} />,
        }}
      />
      <Tabs.Screen 
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({color, focused}) => <FontAwesome name={focused ? "user-circle" : "user"} color={color} size={28}/>
        }}
      />
    </Tabs>

  }
//     return <NativeTabs tintColor={"#ab3500"}>
//       <NativeTabs.Trigger name="index">
//         <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
//         <NativeTabs.Trigger.Icon sf={{ default: "house", selected: "house.fill"}} md="home" />
//       </NativeTabs.Trigger>
//       <NativeTabs.Trigger name="search">
//         <NativeTabs.Trigger.Icon sf={{ default: "magnifyingglass", selected: "magnifyingglass.circle.fill"}} md="search" />
//         <NativeTabs.Trigger.Label>Search</NativeTabs.Trigger.Label>
//       </NativeTabs.Trigger>
//       <NativeTabs.Trigger name="favourites">
//         <NativeTabs.Trigger.Icon sf={{ default: "heart", selected: "heart.fill"}} md="heart_smile" />
//         <NativeTabs.Trigger.Label>Favourites</NativeTabs.Trigger.Label>
//       </NativeTabs.Trigger>
//       <NativeTabs.Trigger name="profile">
//         <NativeTabs.Trigger.Icon sf={{ default: "person", selected: "person.fill"}} md="person" />
//         <NativeTabs.Trigger.Label>Profile</NativeTabs.Trigger.Label>
//       </NativeTabs.Trigger>
//     </NativeTabs>
// }