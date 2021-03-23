import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Image, Button, Linking } from "react-native";
import { TouchableOpacity } from "react-native";
import storyblok from "../utilities/storyblok";
import useStoryblok from "../utilities/storyblok-hook";
import Editable from "../utilities/editable";

export default function Home({ navigation }) {
  const [story, setStory] = useState({});
  useStoryblok(story, setStory);

  useEffect(() => {
    const fetchPost = async () => {
      const resp = await storyblok.get("cdn/stories/home", {
        version: "draft",
      });
      setStory(resp.data.story);
    };
    fetchPost();
  }, []);

  const goToBlog = () => {
    navigation.navigate("blog");
  };

  const openLink = (url) => {
    Linking.openURL(url);
  };

  return story.content ? (
    <View style={styles.container}>
      <Editable text={story.content.body[0]._editable} />
      <View>
        {story.content.body[0].logo && (
          <Image
            style={styles.logo}
            source={{ uri: story.content.body[0].filename }}
          ></Image>
        )}
        <Text style={styles.titleText}>{story.content.body[0].headline}</Text>
        <Text style={styles.subText}>{story.content.body[0].description}</Text>
        <View style={styles.horizontal}>
          <TouchableOpacity style={styles.button}>
            <Button title="Blog" color="#09b3af" onPress={goToBlog}></Button>
          </TouchableOpacity>
        </View>
        <View style={styles.horizontal}>
          <TouchableOpacity style={styles.button}>
            <Button
              title="Storyblok Docs"
              color="#09b3af"
              onPress={() =>
                openLink("https://www.storyblok.com/docs/guide/introduction")
              }
            ></Button>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Button
              title="Expo Docs"
              color="#222"
              onPress={() => openLink("https://docs.expo.io/")}
            ></Button>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  ) : (
    <View>
      <Text>Loading..</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  horizontal: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  button: {
    margin: 20,
  },
  logo: {
    width: 320,
    height: 80,
    marginTop: 120,
    marginHorizontal: "auto",
  },
  titleText: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  subText: {
    fontSize: 20,
    textAlign: "center",
  },
});
