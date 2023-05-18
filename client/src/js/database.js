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
    const db = await initdb();
    const tx = db.transaction('jate', 'readwrite');
    const stringContent = String(content);
    tx.store.put({ content: stringContent }); 
    return tx.done;
  };
  

export const getDb = async () => {
  const db = await initdb();
  const tx = db.transaction('jate', 'readonly');
  const allItems = await tx.store.getAll();
  if (allItems.length > 0) {
    const { content } = allItems[allItems.length - 1];
    return String(content);
  }
  return '';
};

initdb();