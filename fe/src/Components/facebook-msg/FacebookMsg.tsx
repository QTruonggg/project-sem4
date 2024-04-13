import React from "react";
import { CustomChat, FacebookProvider } from "react-facebook";

const FacebookMsg = () => {

    
    return (
        <>
        <FacebookProvider appId="827575382090379" chatSupport>
            <CustomChat pageId="106874392499812" minimized={false}/>
        </FacebookProvider>
        </>
    )
};

export default FacebookMsg;