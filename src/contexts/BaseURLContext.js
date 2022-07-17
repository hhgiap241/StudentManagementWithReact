import {createContext} from "react";

const BaseURLContext = createContext('http://localhost:8080/api/v1');

function BaseURLProvider(props) {
    return (
        <BaseURLContext.Provider value={'http://localhost:8080/api/v1'}>
            {props.children}
        </BaseURLContext.Provider>
    );
}
export {BaseURLContext, BaseURLProvider};