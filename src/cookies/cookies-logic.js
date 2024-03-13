import Cookies from 'js-cookie';

export const retrieveCookie = (cookieName) => {
    let cookieString = Cookies.get(cookieName);
    return cookieString ? JSON.parse(cookieString) : null;
};

export const deleteCookie = (cookieName) => {
    Cookies.remove(cookieName);
};

export const retrieveToken = () => {
    const tokenCookie = Cookies.get('Token');
    const formatedToken = tokenCookie.trim();
    return formatedToken ? tokenCookie : null;
};
