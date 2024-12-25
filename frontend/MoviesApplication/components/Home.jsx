import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { DataTable } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

function Home() {
  const [uname, setUserName] = useState("");
  const [movies, setMovies] = useState([]); // Initialize as empty array
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    // Get username from AsyncStorage
    const getUserName = async () => {
      try {
        const reply = await AsyncStorage.getItem("userName");
        if (reply) setUserName(reply);
      } catch (error) {
        console.error("Error fetching username:", error);
      }
    };

    getUserName();
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:4444/movie/all");

        if (response.data.status === "success") {
          setMovies(response.data.movieData);
        } else {
          setError("No movies found");
        }
      } catch (error) {
        setError(error.message);
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <View>
      <Text>Welcome..! {uname}</Text>
      <View>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Movie Id</DataTable.Title>
            <DataTable.Title>Movie Name</DataTable.Title>
            <DataTable.Title>Movie Description</DataTable.Title>
            <DataTable.Title>Movie CreatedAt</DataTable.Title>
            <DataTable.Title>Movie Genre</DataTable.Title>
          </DataTable.Header>

          {movies.map((movie) => (
            <DataTable.Row key={movie.id}>
              <DataTable.Cell>{movie.id}</DataTable.Cell>
              <DataTable.Cell>{movie.title}</DataTable.Cell>
              <DataTable.Cell>{movie.description}</DataTable.Cell>
              <DataTable.Cell>
                {new Date(movie.createdAt).toLocaleDateString()}
              </DataTable.Cell>
              <DataTable.Cell>{movie.genre}</DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </View>
    </View>
  );
}

export default Home;
