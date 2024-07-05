import Auth from './Auth';
import { useRouter } from "expo-router";
import getData from './utils/Persistant Storage/getData';
import { useState, useEffect } from "react";

export default function App() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const getUser = async () => {
      const user = await getData("authenticated");

      if(user) setIsLoggedIn(true);
    }

    getUser();
  }, [])

  if(isLoggedIn){
    router.replace("(tabs)");
  } else { 
    return <Auth /> 
  }
}