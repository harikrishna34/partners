import { updateDoc, doc } from 'firebase/firestore';

import { initialize } from '@/firebase';

const { firestore } = initialize();

export const captureDetails = async (uid, data) => {
  return updateDoc(doc(firestore, 'vendors', uid), { ...data });
};
