const keyName = "user";
const keyName2 = 'ticket'

function getToken() {
    let str = localStorage.getItem(keyName);
    let obj = str ? JSON.parse(str) : "";
    return obj
}

function storeToken(token) {
    let str = JSON.stringify(token);
    localStorage.setItem(keyName, str);
    console.log("Token set : ", token)
}

function removeToken() {
    localStorage.removeItem(keyName);
}

function getTicket() {
    let str = localStorage.getItem(keyName2);
    let obj = str ? JSON.parse(str) : "";
    return obj
}

function storeTicket(obj) {
    let str = JSON.stringify(obj);
    localStorage.setItem(keyName2, str);
}

function removeTicket() {
    localStorage.removeItem(keyName2);
}


export default { getToken, storeToken, removeToken, getTicket, storeTicket, removeTicket };
