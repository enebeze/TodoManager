import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyA5w-BLGzpnDasDCLUJ3PipVtrsdT2CUaQ',
  authDomain: 'todomanager-3307a.firebaseapp.com',
  databaseURL: 'https://todomanager-3307a.firebaseio.com',
  projectId: 'todomanager-3307a',
  storageBucket: 'todomanager-3307a.appspot.com',
  messagingSenderId: '570116033970',
  appId: '1:570116033970:web:4370830df742549202a8ab',
};

export const initializeFirebaseApi = () => firebase.initializeApp(config);

export const createUserOnFirebaseAsync = async (email, password) => {
  const { user } = await firebase
    .auth()
    .createUserWithEmailAndPassword(email, password);
  return user;
};

export async function signInOnFirebaseAsync(email, password) {
  const user = await firebase
    .auth()
    .signInWithEmailAndPassword(email, password);
  return user;
}

export const currentFirebaseUser = callback => {
  return new Promise((resolve, reject) => {
    var unsubscribe = null;
    unsubscribe = firebase.auth().onAuthStateChanged(
      user => {
        if (callback) callback(user);
        resolve(user);
      },
      error => {
        reject(error);
      },
      () => {
        unsubscribe();
      },
    );
  });
};

export const writeTaskOnFirebaseAsync = async task => {
  const user = await currentFirebaseUser();
  var tasksReference = firebase.database().ref(user.uid);
  const key = task.key ? task.key : tasksReference.child('tasks').push().key;
  return await tasksReference.child(`tasks/${key}`).update(task);
};

export const readTasksFromFirebaseAsync = async listener => {
  const user = await currentFirebaseUser();
  var tasksReference = firebase
    .database()
    .ref(user.uid)
    .child('tasks');
  tasksReference.on('value', snapshot => {
    var tasks = [];
    snapshot.forEach(function(element) {
      var task = element.val();
      task.key = element.key;
      tasks.push(task);
    });
    listener(tasks);
  });
};

export const signOut = () => {
  firebase.auth().signOut();
};
