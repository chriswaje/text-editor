import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

  
export const putDb = async (content) => {
  const db = await openDB('jate', 1);
  const trans = db.transaction('jate', 'readwrite');
  const store = trans.objectStore('jate');
  const request = store.put({id: 1, value: content});
  const result = await request;
};


export const getDb = async () => {
  const db = await openDB('jate', 1);
  const trans = db.transaction('jate', 'readonly');
  const store = trans.objectStore('jate');
  const request = store.get(1);
  const result = await request;
  result ? console.log(result.value) : console.log('No data found in database');
  // if result is defined, return value; if it is null, return undefined
  return result?.value;
} ;

initdb();
