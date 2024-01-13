import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { useEffect, useState } from "react";

const fpPromise = FingerprintJS.load();

export function useFingerprint() {
  const [visitorId, setVisitorId] = useState(null);

  useEffect(() => {
    fpPromise
      .then((fp) => fp.get())
      .then(({ visitorId }) => setVisitorId(visitorId));
  }, []);

  return visitorId;
  
}
