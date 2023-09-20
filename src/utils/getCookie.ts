export default (cookie: string | undefined, key: string) => {
    if (cookie) {
        const cookieSplitted = cookie.split('; ');

        for (let i = 0; i < cookieSplitted.length; i += 1) {
            const cookieSplitted2 = cookieSplitted[i].split('=');

            if (true
                && cookieSplitted2.length >= 2
                && cookieSplitted2[0] === key
            ) {
                return decodeURIComponent(cookieSplitted2[1]);
            }
        }
    }

    return undefined;
};
