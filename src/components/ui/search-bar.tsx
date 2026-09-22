import { useEffect, useState } from 'react';
import { View, TextInput, Button, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HISTORY_KEY = '@app:search_history';

type SearchBarProps = {
  value: string;
  onChangeText: (text: string) => void;
  onSearch: (term: string) => void;
};

export function SearchBar({ value, onChangeText, onSearch }: SearchBarProps) {
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    loadHistory();
  }, []);

  async function loadHistory() {
    try {
      const saved = await AsyncStorage.getItem(HISTORY_KEY);
      if (saved) setHistory(JSON.parse(saved));
    } catch (error) {
      console.log('Erro ao carregar histórico:', error);
    }
  }

  async function saveHistory(text: string) {
    const term = text.trim();
    if (!term) return;

    const filtered = history.filter(
      (item) => item.toLowerCase() !== term.toLowerCase()
    );
    const updated = [term, ...filtered].slice(0, 5);

    setHistory(updated);

    try {
      await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
    } catch (error) {
      console.log('Erro ao salvar histórico:', error);
    }
  }

  function handleSearch() {
    if (!value.trim()) return;
    saveHistory(value);
    onSearch(value);
  }

  function selectHistory(term: string) {
    onChangeText(term);
    saveHistory(term);
    onSearch(term);
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder="Buscar GIFs..."
          onSubmitEditing={handleSearch}
          returnKeyType="search"
          style={styles.input}
        />
        <Button title="Buscar" onPress={handleSearch} />
      </View>

      {history.length > 0 && (
        <View style={styles.historyContainer}>
          <Text style={styles.historyTitle}>Pesquisas recentes</Text>
          {history.map((item, index) => (
            <TouchableOpacity
              key={`${item}-${index}`}
              style={styles.historyItem}
              onPress={() => selectHistory(item)}
            >
              <Text style={styles.historyText}>🔍 {item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingTop: 75,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  historyContainer: {
    marginTop: 12,
  },
  historyTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  historyItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  historyText: {
    fontSize: 14,
    backgroundColor: '#fff',
  },
});