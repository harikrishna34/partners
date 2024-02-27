import { setDoc, doc } from 'firebase/firestore';

import { initialize } from '@/firebase';

const { firestore } = initialize();

export const captureOnBoardData = async (uid, data) => {
  return setDoc(doc(firestore, 'vendors', uid), { ...data });
};
