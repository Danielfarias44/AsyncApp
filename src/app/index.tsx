import { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SearchBar } from '@/components/ui/search-bar';

const GIPHY_KEY = process.env.EXPO_PUBLIC_GIPHY_API_KEY;

type Gif = {
  id: string;
  images: {
    fixed_height: { url: string; width: string; height: string };
  };
};

const getStorageKey = (query: string) => `@app:gifs:${query.toLowerCase()}`;

export default function HomeScreen() {
  const [query, setQuery] = useState('');
  const [gifs, setGifs] = useState<Gif[]>([]);
  const [loading, setLoading] = useState(false);

  const searchGifs = async (term: string) => {
    if (!term.trim()) return;

    setLoading(true);
    const storageKey = getStorageKey(term);

    try {
      const cached = await AsyncStorage.getItem(storageKey);

      if (cached) {
        setGifs(JSON.parse(cached));
        setLoading(false);
        return;
      }

      const res = await axios.get('https://api.giphy.com/v1/gifs/search', {
        params: { api_key: GIPHY_KEY, q: term, limit: 6 },
      });

      const data: Gif[] = res.data.data;
      setGifs(data);
      await AsyncStorage.setItem(storageKey, JSON.stringify(data));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <SearchBar value={query} onChangeText={setQuery} onSearch={searchGifs} />

      <ScrollView contentContainerStyle={styles.container}>
        {loading ? (
          <Text>Carregando...</Text>
        ) : gifs.length === 0 ? (
          <Text>Pesquise algo para ver os GIFs</Text>
        ) : (
          gifs.map((gif) => (
            <Image
              key={gif.id}
              source={{ uri: gif.images.fixed_height.url }}
              style={{
                width: Number(gif.images.fixed_height.width),
                height: Number(gif.images.fixed_height.height),
              }}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 12,
    paddingVertical: 24,
  },
});