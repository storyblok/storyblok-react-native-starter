import React, { useState, useEffect } from "react";
import {
  Text,
  ScrollView,
  View,
  StyleSheet,
  Image,
  Button,
} from "react-native";
import { TouchableOpacity } from "react-native";
import storyblok from "../utilities/storyblok";
import useStoryblok from "../utilities/storyblok-hook";
import Editable from "../utilities/editable";

export default function Post({ navigation, route }) {
  const [story, setStory] = useState({});
  useStoryblok(story, setStory);

  useEffect(() => {
    const fetchPost = async () => {
      if (route.params) {
        const { slug } = route.params;
        const resp = await storyblok.get(`cdn/stories/${slug}`, {
          version: "draft",
        });
        setStory(resp.data.story);
      }
    };
    fetchPost();
  }, []);

  const goToBlog = () => {
    navigation.navigate("blog");
  };

  const getImageRatio = (imageString) => {
    const items = imageString.match(/(\d)+x(\d)+/g)[0].split("x");
    const [width, height] = items;
    return height / width;
  };

  return story.content ? (
    <View>
      {" "}
      <Editable text={story.content._editable} />
      <ScrollView style={styles.container}>
        {story.content.image && (
          <Image
            style={{
              width: 300,
              height: getImageRatio(story.content.image) * 300,
              marginVertical: 40,
            }}
            source={{ uri: story.content.image }}
          />
        )}
        <Text style={styles.heading}>{story.content.title}</Text>
        <Text style={styles.subheading}>{story.content.intro}</Text>

        <Text style={styles.long_text}>{story.content.long_text}</Text>

        <TouchableOpacity style={styles.button}>
          <Button
            title="Back to Blog"
            color="#09b3af"
            onPress={goToBlog}
          ></Button>
        </TouchableOpacity>
      </ScrollView>
    </View>
  ) : (
    <ScrollView>
      <Text>No Post Found</Text>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    margin: "auto",
  },
  vertical: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 30,
    marginBottom: 10,
  },
  subheading: {
    fontSize: 20,
    marginBottom: 20,
  },
  long_text: {
    marginBottom: 40,
  },
  content: {
    width: "100%",
  },
});
