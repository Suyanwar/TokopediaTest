import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';

import { fetchSources } from '../actions';

const formatData = (data, numColumns) => {
    const numberOfFullRows = Math.floor(data.length / numColumns);
  
    let numberOfElementsLastRow = data.length % numColumns;
    while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
      data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
      numberOfElementsLastRow++;
    }
  
    return data;
};

const numColumns = 3;

class SourcesScreen extends Component {
    componentDidMount() {
        this.props.fetchSources();
    }
    renderItem = ({ item, index }) => {
        if (item.empty === true) {
            return <View style={[styles.item, styles.itemInvisible]} />;
        }
        return (
            <View style={styles.item}>
                <Text style={styles.itemText}>{item.name}</Text>
            </View>
        );
    };
    
    render() {
        const { sources, loading, error } = this.props;
        if (loading){
            return (
                <View style={{ flex: 1, justifyContent: 'center' }} >
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            )
        }
        if (error){
            return (
                <View style={{ flex: 1, justifyContent: 'center' }} >
                    <Text>{error}</Text>
                </View>
            )
        }
        return (
            <FlatList
                data={formatData(sources, numColumns)}
                style={styles.container}
                renderItem={this.renderItem}
                numColumns={numColumns}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 20,
    },
    item: {
        backgroundColor: '#4D243D',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        margin: 2,
        padding: 3,
        height: Dimensions.get('window').width / numColumns, // approximate a square
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
  let storedSources = state.sourcesReducer.sources.map(sources => ({ key: sources.id, ...sources }));
  return {
    sources: storedSources,
    loading: state.sourcesReducer.loading,
    error: state.sourcesReducer.error
  };
};

const mapDispatchToProps = {
    fetchSources
};

export default connect(mapStateToProps, mapDispatchToProps)(SourcesScreen);