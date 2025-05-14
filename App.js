
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { generateMnemonic, getWalletsWithBalance } from './utils/wallet';

export default function App() {
  const [mnemonic, setMnemonic] = useState('');
  const [wallets, setWallets] = useState([]);

  const handleGenerate = async () => {
    const phrase = generateMnemonic();
    setMnemonic(phrase);
    const data = await getWalletsWithBalance(phrase);
    setWallets(data);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Wallet Generator</Text>
      <TouchableOpacity style={styles.button} onPress={handleGenerate}>
        <Text style={styles.buttonText}>Generate Wallet</Text>
      </TouchableOpacity>
      {mnemonic !== '' && (
        <View>
          <Text style={styles.mnemonic}>{mnemonic}</Text>
          {wallets.map((w, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.network}>{w.network}</Text>
              <Text style={styles.address}>{w.address}</Text>
              <Text style={styles.balance}>Balance: {w.balance}</Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, marginTop: 40, backgroundColor: '#f9f9f9' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
  button: { backgroundColor: '#4f46e5', padding: 12, borderRadius: 10, alignItems: 'center', marginBottom: 20 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  mnemonic: { fontSize: 16, marginBottom: 20, fontStyle: 'italic' },
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 10, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5 },
  network: { fontSize: 18, fontWeight: 'bold' },
  address: { fontSize: 14, color: '#555' },
  balance: { fontSize: 16, marginTop: 5 }
});
