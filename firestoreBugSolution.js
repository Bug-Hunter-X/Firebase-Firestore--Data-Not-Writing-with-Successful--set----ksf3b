// Solution: Add a retry mechanism using async/await and exponential backoff
async function setDataWithRetry(collectionRef, docId, data, maxRetries = 5, retryDelay = 1000) {
  let retries = 0;
  while (retries < maxRetries) {
    try {
      await collectionRef.doc(docId).set(data);
      console.log('Data written successfully!');
      return;
    } catch (error) {
      console.error(`Error writing data: ${error.message}, retrying...`);
      retries++;
      await new Promise(resolve => setTimeout(resolve, retryDelay * retries)); //Exponential backoff
    }
  }
  console.error('Failed to write data after multiple retries.');
}

//Example Usage
// ... (Firebase initialization code) ...

const db = firebase.firestore();
const collectionRef = db.collection('myCollection');
const docId = 'myDocument';
const data = {field1: 'value1', field2: 'value2'};

setDataWithRetry(collectionRef, docId, data);
