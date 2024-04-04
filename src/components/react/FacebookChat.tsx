import React, { Component } from 'react';
import { FacebookProvider, CustomChat } from 'react-facebook';

export default class FacebookChat extends Component {
    render() {
        return (
            <FacebookProvider appId="971723654539716" chatSupport>
                <CustomChat pageId="112996710213848" minimized={true} />
            </FacebookProvider>
        );
    }
}
