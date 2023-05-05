import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyA_0GPDiKi_3SK3clG1TvIxAxwvffmVbus",
    authDomain: "todolist-dcc0a.firebaseapp.com",
    projectId: "todolist-dcc0a",
    storageBucket: "todolist-dcc0a.appspot.com",
    messagingSenderId: "196415986511",
    appId: "1:196415986511:web:2d4f2a4d02f3261e14c33a"
};

export const fire = firebase.initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage(fire);

export function updateDocumentInCollection(collection, document, idDocumnent) {
    return new Promise(function (resolve, reject) {
        try {
            fire
                .firestore()
                .collection(collection)
                .doc(idDocumnent)
                .update(document)
                .then((r) => {
                    resolve({ result: r });
                })
                .catch((e) => {
                    reject(e);
                });
        } catch (e) {
            reject(e);
        }
    });
};

export function setDocumentToCollection(collection, document) {
    return new Promise(function (resolve, reject) {
        try {
            fire
                .firestore()
                .collection(collection)
                .add(document)
                .then((r) => {
                    updateDocumentInCollection(collection, { ...document, idPost: r.id }, r.id)
                        .then((res) => console.info(res))
                        .catch((e) => console.error(e));
                    resolve({ result: r });
                })
                .catch((e) => {
                    reject(e);
                });
        } catch (e) {
            reject(e);
        }
    });
};

export const getCollectionOnLimit = async (collection, limit = 5) => {
    try {
        const res = await fire.firestore().collection(collection).limit(limit).get();
        const data = [];
        res.forEach((doc) => {
            data.push({
                idPost: doc.id,
                ...doc.data(),
            });
        });
        return data;
    } catch (error) {
        throw new Error(error);
    }
};

export function getCollectionWhereKeyValueSearch(collection, key, value, limit = 16){


    return new Promise(function (resolve, reject) {
        fire
            .firestore()
            .collection(collection)
            .orderBy(key)
            .startAt(value)
            .endAt(value + '~')
            .limit(limit)
            .get()
            .then((res) => {
                const data = [];
                res.forEach((doc) => {
                    data.push({
                        idPost: doc.id,
                        ...doc.data(),
                    });
                });
                resolve(data);
            })
            .catch((err) => {
                reject(err);
            });
    });
}