import {notifyType, useNotification} from "@web3uikit/core";
import React from "react";

export const useHandleNotify=()=>{
    const dispatch = useNotification();

    const handleNewNotification = (
        type: notifyType,
        message?: string,
        title?:string,
        icon?: React.ReactElement,

    ) => {
        dispatch({
            type,
            message: message,
            title: title,
            icon,
            position:  'topR',
        });
    };
    return {handleNewNotification}
}