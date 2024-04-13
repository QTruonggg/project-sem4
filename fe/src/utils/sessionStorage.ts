export const getSession = (key: string) => {
    if (typeof window === 'undefined' || typeof window.sessionStorage === 'undefined') return;
    return JSON.parse(window.sessionStorage?.getItem(key) || '{}');
}

export const setSession = (key: string, value: any) => {
    if (typeof window === 'undefined' || typeof window.sessionStorage === 'undefined') return;
    return window.sessionStorage?.setItem(key, JSON.stringify(value));
}

export const removeSession = (key: string) => {
    if (typeof window === 'undefined' || typeof window.sessionStorage === 'undefined') return;
    return window.sessionStorage?.removeItem(key);
}

const sessionUtils = {
    getSession,
    setSession,
    removeSession
}


export default sessionUtils;