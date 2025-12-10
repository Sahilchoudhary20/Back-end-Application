import admin from '../src/config/firebase';
import process from 'process';

async function main() {
  const [uid, rolesCsv] = process.argv.slice(2);
  if (!uid || !rolesCsv) {
    console.error('Usage: npm run set-claims -- <uid> <role1,role2>');
    process.exit(1);
  }
  const roles = rolesCsv.split(',');
  try {
    if (!admin.apps.length) {
      console.error('Firebase not initialized. Make sure serviceAccountKey.json is present.');
      process.exit(1);
    }
    await admin.auth().setCustomUserClaims(uid, { roles });
    console.log(`Set roles ${roles.join(',')} for user ${uid}`);
    process.exit(0);
  } catch (err) {
    console.error('Error setting claims', err);
    process.exit(1);
  }
}

main();
