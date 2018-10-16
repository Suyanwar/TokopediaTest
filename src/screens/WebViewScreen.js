import React, { Component } from 'react';
import { View, ActivityIndicator, WebView } from 'react-native';
import { connect } from 'react-redux';

class WebViewScreen extends Component {
    static navigationOptions = {
        title: 'ArticleDetail',
    };

    render() {
        return (
            <WebView
                source={{uri: this.props.url}}
                scrollEnabled={true}
                startInLoadingState={true}
                renderLoading={() => {
                    return (
                        <View style={{ flex: 1, justifyContent: 'center' }} >
                            <ActivityIndicator size="large" color="#0000ff" />
                        </View>
                    )
                }}
            />
        );
    }
}

const mapStateToProps = state => {
    return {
      url: state.sourcesReducer.url,
      loading: state.sourcesReducer.loading
    };
  };
  
  const mapDispatchToProps = {};
  
  export default connect(mapStateToProps, mapDispatchToProps)(WebViewScreen);