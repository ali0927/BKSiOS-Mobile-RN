import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import avatarImg from '../../assets/img/avatars/avatar3.jpg';
import {allTickets} from '../helper/event';
import config from '../helper/config';

export const SearchScreen = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    allTickets().then(res => {
      if (res.success) {
        setTickets(res.tickets);
      }
    });
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{marginBottom: 20}}>
          <Text style={styles.subtitle}>Categories</Text>
          <View style={styles.categoryContainer}>
            <TouchableOpacity style={styles.categoryItem}>
              <Text style={styles.categoryTitle}>Tickets</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryItem}>
              <Text style={styles.categoryTitle}>Events</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{marginBottom: 20}}>
          <Text style={styles.subtitle}>Collections</Text>
          <View style={styles.resultContainer}>
            {tickets &&
              tickets.map((ticket, i) => (
                <TouchableOpacity style={styles.resultItem}>
                  <View style={styles.resultBackImg}>
                    <Image
                      source={{
                        uri:
                          config.API_BASE_URL +
                          '/api/upload/get_file?path=' +
                          ticket.eventcard?.picture_small,
                      }}
                      style={{width: '100%', height: '100%'}}
                    />
                  </View>
                  <View style={styles.resultMeta}>
                    <Image source={avatarImg} style={styles.resultAvatarImg} />
                    <Text style={styles.resultName}>
                      {ticket.eventcard.name}
                    </Text>
                    <Text style={styles.resultDescription}>Accomodation</Text>
                  </View>
                </TouchableOpacity>
              ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#14142f',
    padding: 20,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 31,
    color: '#fff',
  },
  categoryContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  categoryItem: {
    display: 'flex',
    justifyContent: 'center',
    width: 160,
    height: 160,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 22,
    color: '#fff',
    textAlign: 'center',
    margin: 'auto',
  },
  resultContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  resultItem: {
    display: 'flex',
    width: 160,
    height: 160,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    marginBottom: 20,
    borderRadius: 12,
    overflow: 'hidden',
  },
  resultBackImg: {
    height: 70,
    width: '100%',
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.07)',
  },
  resultAvatarImg: {
    marginTop: -30,
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  resultMeta: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultName: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 20,
    color: '#fff',
  },
  resultDescription: {
    fontSize: 10,
    fontWeight: '400',
    lineHeight: 13,
    color: 'rgba(255, 255, 255, 0.66)',
  },
});
