import FingerprintJS from '@fingerprintjs/fingerprintjs';

const fpPromise = FingerprintJS.load();


export function useFingerprint() {

    return async () => {
        // Get the visitor identifier when you need it.
        const fp = await fpPromise;
        const result = await fp.get();
        // console.log(result.visitorId)
        return result.visitorId
    }

}

