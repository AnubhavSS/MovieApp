import {
  View,
  Text,
  ScrollView,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState,useEffect } from "react";
import { useNavigation,useRoute } from "@react-navigation/native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import MovieList from "../components/MovieList";
import Loading from "../components/Loading";
import { fetchPersonDetails,fetchPersonMovies } from "../../api/moviedb";
import { image342 } from "../../api/moviedb";
let { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";
const verticalMargin = ios ? "" : " my-3";

const Person = () => {
  const [liked, setliked] = useState(false);
  const [personMovies, setPersonMovies] = useState([]);
  const [loading, setloading] = useState(false);
  const [person, setPerson] = useState({});
  const navigation = useNavigation();
  const {params: item} = useRoute();
  useEffect(()=>{
    setloading(true);
    getPersonDetails(item.id);
    getPersonMovies(item.id);
},[item]);

const getPersonDetails = async id=>{
    const data = await fetchPersonDetails(id);
    console.log('got person details');
    setloading(false);
    if(data) {
        setPerson(data);
    }
}
const getPersonMovies = async id=>{
    const data = await fetchPersonMovies(id);
    console.log('got person movies')
    if(data && data.cast){
        setPersonMovies(data.cast);
    }

}

  return (
    <ScrollView
      className="flex-1 bg-neutral-900"
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      {/* back button and movie poster */}

      <SafeAreaView
        className={
          "absolute z-20 w-full flex-row justify-between items-center px-4 pt-10 mb-3" +
          verticalMargin
        }
      >
        <TouchableOpacity
          className="rounded-xl p-1 bg-blue-500 "
          onPress={() => navigation.goBack()}
        >
          <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setliked(!liked)}>
          <HeartIcon size="35" color={liked ? "red" : "white"} />
        </TouchableOpacity>
      </SafeAreaView>

      {/* Person Details */}
      {loading? (<Loading/>):(<View>
        <View
          className="flex-row justify-center"
          style={{
            shadowColor: "gray",
            shadowRadius: 40,
            shadowOffset: { width: 0, height: 5 },
            shadowOpacity: 1,
          }}
        >
          <View className="items-center rounded-full overflow-hidden h-72 w-72 border-neutral-500 border-2 mt-14">
            <Image
            
                source={{
                  uri: image342(person?.profile_path) 
                }}
              style={{ height: height * 0.43, width: width * 0.74 }}
            />
          </View>
        </View>

        <View className="mt-6">
          <Text className="text-3xl text-white font-bold text-center">
       
            {person?.name}
          </Text>
          <Text className="text-neutral-500 text-base text-center">
            {person?.place_of_birth}
            {/* Beirut, Lebanon */}
          </Text>
        </View>

        <View className="mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full ">
          {/* Gender */}
          <View className="border-r-2 border-r-neutral-400 px-2 items-center">
            <Text className="text-white font-semibold ">Gender</Text>
            <Text className="text-neutral-300 text-sm">
              {/* Male */}
              {
                person?.gender==1? 'Female': 'Male'
                
              }
            </Text>
          </View>
          {/* Birthday */}
          <View className="border-r-2 border-r-neutral-400 px-2 items-center">
            <Text className="text-white font-semibold">Birthday</Text>
            <Text className="text-neutral-300 text-sm">
             
              {person?.birthday}
            </Text>
          </View>
          {/* Known for */}
          <View className="border-r-2 border-r-neutral-400 px-2 items-center">
            <Text className="text-white font-semibold">known for</Text>
            <Text className="text-neutral-300 text-sm">
           
              {person?.known_for_department}
            </Text>
          </View>
          {/* Popularity */}
          <View className="px-2 items-center">
            <Text className="text-white font-semibold">Popularity</Text>
            <Text className="text-neutral-300 text-sm">
            {person?.popularity?.toFixed(2)} %
            </Text>
          </View>
        </View>
        {/* Biography */}
        <View className="my-6 mx-4 space-y-2">
          <Text className="text-white text-lg">Biography</Text>
          <Text className="text-neutral-400 tracking-wide">
            {
              person?.biography? person.biography : 'N/A'
            }
          </Text>
        </View>

        {/* Movies */}
        {<MovieList title="Movies" hideSeeAll={true} data={personMovies} />}
      </View>)}
    </ScrollView>
  );
};

export default Person;
