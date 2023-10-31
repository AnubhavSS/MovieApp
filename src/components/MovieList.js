import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { image185 } from "../../api/moviedb";

let { width, height } = Dimensions.get("window");

const MovieList = ({ title, data, hideSeeAll }) => {
  const navigation = useNavigation();
  return (
    <View className="mb-8 space-y-4 mt-2">
      <View className="mx-4 flex-row justify-between items-center">
        <Text className="text-white text-xl">{title}</Text>
        {!hideSeeAll && (
          <TouchableOpacity>
            <Text className="text-lg text-blue-600">See All</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Movie row */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {data.map((item, index) => {
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => navigation.push("Movie", item)}
            >
              <View className="mr-4 space-y-1">
                <Image
                  source={{ uri: image185(item.poster_path) }}
                  className="rounded-3xl"
                  style={{ width: width * 0.33, height: height * 0.22 }}
                />
                <Text className="ml-1 text-neutral-300">
                  {item.title?.length > 14
                    ? item.title.slice(0, 14) + "..."
                    : item.title}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default MovieList;
