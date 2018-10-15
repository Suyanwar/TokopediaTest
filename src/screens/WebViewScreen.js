import React, { Component } from 'react';
import { WebView } from 'react-native';

class WebViewScreen extends Component {
    static navigationOptions = {
        title: 'ArticleDetail',
    };
    render() {
        const { url } = this.props.navigation.state.params;
        return (
            <WebView
                source={{uri: url}}
            />
        );
    }
}

export default WebViewScreen;