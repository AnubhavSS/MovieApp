import {
  View,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState,useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { XMarkIcon } from "react-native-heroicons/outline";
import { debounce } from 'lodash'
import { image185,searchMovies } from "../../api/moviedb";
const { width, height } = Dimensions.get("window");

const Search = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([])

  const handleSearch = search=>{
    if(search && search.length>2){
        setLoading(true);
        searchMovies({
            query: search,
            include_adult: false,
            language: 'en-US',
            page: '1'
        }).then(data=>{
            console.log('got search results');
            setLoading(false);
            if(data && data.results) setResults(data.results);
        })
    }else{
        setLoading(false);
        setResults([])
    }
  }

  const handleTextDebounce = useCallback(debounce(handleSearch, 300), []);    

  return (
    <SafeAreaView className="bg-neutral-800 flex-1">
      {/* search input */}
      <View className="mx-4 mb-3 mt-2 flex-row justify-between items-center border border-neutral-500 rounded-full">
        <TextInput
          onChangeText={handleTextDebounce}
          placeholder="Search Movie"
          placeholderTextColor={"lightgray"}
          className="pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider"
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          className="rounded-full p-3 m-1 bg-neutral-500"
        >
          <XMarkIcon size="25" color="white" />
        </TouchableOpacity>
      </View>

      {/* Search Result */}
      {results.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          className="space-y-3"
        >
          <Text className="text-white font-semibold ml-1">
            Results ({results.length})
          </Text>
          <View className="flex-row justify-between flex-wrap">
            {results.map((item, index) => {
              return (
                <TouchableWithoutFeedback
                  key={index}
                  onPress={() => navigation.push("Movie", item)}
                >
                  <View className="space-y-2 mb-4">
                    <Image
                      source={{uri: image185(item.poster_path) } || require('../../assets/3d-movie.png')}
                      // source={require("../../assets/ultra.jpg")}
                      className="rounded-3xl"
                      style={{ width: width * 0.44, height: height * 0.3 }}
                    />
                    <Text className="text-gray-300 ml-1">
                      {
                        // item.title.length>22? item.title.slice(0,22)+'...': item.title
                      }
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
          </View>
        </ScrollView>
      ) : (
        <View className="flex-row justify-center">
          <Image
            source={require('../../assets/3d-movie.png')}
            className="h-96 w-96"
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Search;
