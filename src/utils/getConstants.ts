import { adminDb } from '@/lib/firebase-admin';

export async function getConstant(resource: string) {
  const snapshot = await adminDb.ref(`opendota_constants/${resource}/value`).once('value');
  const data = snapshot.val();

  if (!data) {
    throw new Error(`Constant data for ${resource} not found`);
  }

  return data;
}

export async function getAllConstants() {
  const snapshot = await adminDb.ref('opendota_constants').once('value');
  const data = snapshot.val();

  if (!data) {
    throw new Error('No constants data found');
  }

  const constants: { [key: string]: any } = {};
  Object.keys(data).forEach(key => {
    constants[key] = data[key].value;
  });

  return constants;
}