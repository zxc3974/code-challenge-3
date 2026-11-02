import { initializeApp, cert, ServiceAccount } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";

import serviceAccount from "../../firebase.json" with { type: "json" };

initializeApp({
    credential: cert(serviceAccount as ServiceAccount),
});

const db: Firestore = getFirestore();

// optional fields such as price may be undefined, which Firestore rejects by default
db.settings({ ignoreUndefinedProperties: true });

export { db };
