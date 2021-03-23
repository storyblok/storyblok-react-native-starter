import React, { useState, useEffect } from "react";
import { Text, ScrollView, StyleSheet, Button } from "react-native";
import { TouchableOpacity } from "react-native";

import storyblok from "../utilities/storyblok";

export default function About({ navigation }) {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const resp = await storyblok.get("cdn/stories", {
        starts_with: "blog/",
        version: "draft",
      });
      setStories(resp.data.stories);
    };
    fetchPosts();
  }, []);

  const goToPost = (slug) => {
    navigation.navigate("post", { slug });
  };
  const goToHome = () => {
    navigation.navigate("home");
  };
  const getMonth = (number) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return months[number];
  };

  const loadingView = (
    <ScrollView>
      <Text>Loading..</Text>
    </ScrollView>
  );

  return stories.length ? (
    <ScrollView style={styles.container}>
      {stories.map((post) => {
        const d = new Date(post.published_at);
        return (
          <TouchableOpacity
            style={styles.post}
            key={post.content.title}
            onPress={() => goToPost(post.full_slug)}
          >
            <Text style={styles.heading}>{post.content.title}</Text>
            <Text style={styles.date}>
              {d.getDay()} {getMonth(d.getMonth())} {d.getFullYear()}
            </Text>
          </TouchableOpacity>
        );
      })}
      <TouchableOpacity style={styles.button}>
        <Button
          title="Back to Home"
          color="#09b3af"
          onPress={goToHome}
        ></Button>
      </TouchableOpacity>
    </ScrollView>
  ) : (
    loadingView
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 6,
    margin: "auto",
  },
  post: {
    backgroundColor: "#F6F8F9",
    borderRadius: 4,
    padding: 20,
    margin: 20,
  },
  vertical: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 20,
    paddingTop: 10,
  },
  image: {
    width: "100%",
    height: 80,
  },
  content: {
    height: 100,
    width: "100%",
  },
});
