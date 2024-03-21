import { config } from "./apiConfig.js";

export function checkResponse(res){
    if(res.ok){
        return res.json(); 
    } else {
        throw new Error(res.status);
    }
}

export function request(endpoint, options){
    return fetch(`${config.baseUrl}${endpoint}`, options).then(checkResponse);
}