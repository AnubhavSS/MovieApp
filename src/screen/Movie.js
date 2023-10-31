import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ArrowLeftIcon, ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { LinearGradient } from "expo-linear-gradient";
import Cast from "../components/Cast";
import MovieList from "../components/MovieList";
import Loading from "../components/Loading";
import { fetchMovieCredits,fetchMovieDetails,fetchSimilarMovies } from "../../api/moviedb";
import { image500 } from "../../api/moviedb";

let { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";
const topMargin = ios ? "" : " mt-3";

const Movie = () => {
  const { params: item } = useRoute();
 

  const [liked, setliked] = useState(false);
  const [cast, setCast] = useState([1,2,3])
  const [similarMovies, setSimilarMovies] = useState([1,2,3])
  const [loading, setloading] = useState(false);
  const [movie, setMovie] = useState({});

  useEffect(()=>{
    setloading(true);
    getMovieDetials(item.id);
    getMovieCredits(item.id);
    getSimilarMovies(item.id);
  },[item]);

  const getMovieDetials = async id=>{
    const data = await fetchMovieDetails(id);
    console.log('got movie details');
    setloading(false);
    if(data) {
        setMovie({...movie, ...data});
    }
  }
  const getMovieCredits = async id=>{
    const data = await fetchMovieCredits(id);
    console.log('got movie credits')
    if(data && data.cast){
        setCast(data.cast);
    }

  }
  const getSimilarMovies = async id=>{
    const data = await fetchSimilarMovies(id);
    console.log('got similar movies');
    if(data && data.results){
        setSimilarMovies(data.results);
    }}

  const navigation = useNavigation();
  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      className="flex-1 bg-neutral-900 "
    >
      {/* back button and movie poster */}
      <View className="w-full">
        <SafeAreaView
          className={
            "absolute z-20 w-full flex-row justify-between items-center px-4 pt-10 mb-3" +
            topMargin
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

{loading? (<Loading/>):( <View>
  <Image 
                        // source={require('../assets/images/moviePoster2.png')} 
                        source={{uri: image500(movie.poster_path) }}
                        style={{width, height: height*0.55}} 
                    />
  <LinearGradient 
                        colors={['transparent', 'rgba(23, 23, 23, 0.8)', 'rgba(23, 23, 23, 1)']} 
                        style={{width, height: height*0.30}}
                        start={{ x: 0.5, y: 0 }}
                        end={{ x: 0.5, y: 1 }}
                        className="absolute bottom-0"
                    />
</View>)
}
{/* Movie Details */}
<View className='space-y-3' style={{marginTop: -(height*0.09)}}> 
 {/* title */}
 <Text className="text-white text-center text-3xl font-bold tracking-widest">
            {
                 movie?.title
            }
        </Text>

          {/* status, release year, runtime */}
          {
            movie?.id? (
                <Text className="text-neutral-400 font-semibold text-base text-center">
                    {movie?.status} • {movie?.release_date?.split('-')[0] || 'N/A'} • {movie?.runtime} min
                </Text>
            ):null
        }

         {/* genres  */}
         <View className="flex-row justify-center mx-4 space-x-2">
            {
                movie?.genres?.map((genre,index)=>{
                    let showDot = index+1 != movie.genres.length;
                    return (
                        <Text key={index} className="text-neutral-400 font-semibold text-base text-center">
                            {genre?.name} {showDot? "•":null}
                        </Text>
                    )
                })
            }
        </View>

          {/* description */}
          <Text className="text-neutral-400 mx-4 tracking-wide">
            {
                 movie?.overview
            }
        </Text>
        
</View>

 {/* cast */}
 {
          <Cast  cast={cast} />
      }


{/* Similar Movies */}
<MovieList title={'Similar Movies'} data={similarMovies} hideSeeAll={true}/>
      </View>
    </ScrollView>
  );
};

export default Movie;
