import React, { Suspense, lazy } from 'react';
import './ChatLoader.css';

const Chat = lazy(() => import('./Chat.tsx'));

const CircularLoader = () => (
    <div className="loader"></div>
);

const FacebookChat = () => (
    <Suspense fallback={<CircularLoader />}>
        <Chat />
    </Suspense>
);

export default FacebookChat;
