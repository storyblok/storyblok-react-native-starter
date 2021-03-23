import React, { useEffect, useRef } from 'react';
import { Platform } from 'react-native';
const Editable = ( props ) => {
    const el = useRef();
    useEffect( () => {
        el.current.outerHTML = props.text;
    }, [] );
    return (
        <div ref={el}/>
    );
};

export default Editable;