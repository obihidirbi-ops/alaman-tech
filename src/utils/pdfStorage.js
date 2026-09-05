/**
 * IndexedDB storage utility for large PDF files and documents.
 * Standard `localStorage` has a strict 5MB quota limit per origin which fails when storing PDF base64 strings.
 * IndexedDB supports storing large binary objects & data URIs (up to 50MB+).
 */
const DB_NAME = 'AlamanTechPDF_DB';
const STORE_NAME = 'pdf_store';

const getDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const savePdfToIndexedDB = async (key, dataUrl) => {
  if (!key || !dataUrl) return false;
  try {
    const db = await getDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(dataUrl, key);
      req.onsuccess = () => resolve(true);
      req.onerror = () => reject(req.error);
    });
  } catch (e) {
    console.error('Failed to save PDF to IndexedDB:', e);
    return false;
  }
};

export const getPdfFromIndexedDB = async (key) => {
  if (!key) return null;
  try {
    const db = await getDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(key);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => resolve(null);
    });
  } catch (e) {
    console.error('Failed to get PDF from IndexedDB:', e);
    return null;
  }
};

export const removePdfFromIndexedDB = async (key) => {
  if (!key) return false;
  try {
    const db = await getDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.delete(key);
      req.onsuccess = () => resolve(true);
      req.onerror = () => resolve(false);
    });
  } catch (e) {
    return false;
  }
};
