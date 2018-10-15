import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, ActivityIndicator, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { SearchBar } from 'react-native-elements';

import { fetchSourceDetail } from '../actions';

const formatData = (data, numColumns) => {  
    let numberOfElementsLastRow = data.length % numColumns;
    while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
      data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
      numberOfElementsLastRow++;
    }
  
    return data;
};

const numColumns = 1;

class ArticlesScreen extends Component {
    static navigationOptions = {
        title: 'Articles',
    };
    componentDidMount() {
        const { id } = this.props.navigation.state.params;
        this.props.fetchSourceDetail('', id);
    }
    renderItem = ({ item, index }) => {
        if (item.empty === true) {
            return <View style={[styles.item, styles.itemInvisible]} />;
        }
        return (
            <TouchableOpacity style={styles.item} onPress={() => this.props.navigation.navigate('WebViewScreen', { url: item.url })}>
                <Text style={styles.itemText}>{item.title}</Text>
            </TouchableOpacity>
        );
    };

    _onSearching = (query) => {
        const { id } = this.props.navigation.state.params;
        this.props.fetchSourceDetail(query, id);
    }
    
    render() {
        const { articles, loading, error } = this.props;
        return (
            <View style={{ flex: 1 }}>
                <SearchBar
                    lightTheme
                    round
                    onChangeText={query => this._onSearching(query)}
                    onClearText={() => this._onSearching('')}
                    placeholder='Type Here...' />
                {loading ?
                <View style={{ flex: 1, justifyContent: 'center' }} >
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
                : 
                error ?
                <View style={{ flex: 1, justifyContent: 'center' }} >
                    <Text>{error}</Text>
                </View>
                :
                <FlatList
                    data={formatData(articles, numColumns)}
                    style={styles.container}
                    renderItem={this.renderItem}
                    numColumns={numColumns}
                />
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 10,
    },
    item: {
        backgroundColor: '#4D243D',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        margin: 2,
        padding: 3,
        height: Dimensions.get('window').width / (numColumns * 2), // approximate a square
    },
    itemInvisible: {
        backgroundColor: 'transparent',
    },
    itemText: {
        color: '#fff',
        textAlign: 'center'
    },
});

const mapStateToProps = state => {
  let storedArticles = state.sourcesReducer.articles.map(articles => ({ key: articles.title, ...articles }));
  return {
    articles: storedArticles,
    loading: state.sourcesReducer.loading,
    error: state.sourcesReducer.error
  };
};

const mapDispatchToProps = {
    fetchSourceDetail
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesScreen);