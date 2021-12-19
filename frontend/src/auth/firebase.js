import firebase from "firebase/compat";


const firebaseConfig = {
    apiKey: "AIzaSyAYZ94tcJHjzsWA9dZ_XDfq2-5N7fshBys",
    authDomain: "getting-started-react-19e7f.firebaseapp.com",
    databaseURL: "https://getting-started-react-19e7f-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "getting-started-react-19e7f",
    storageBucket: "getting-started-react-19e7f.appspot.com",
    messagingSenderId: "1057344622688",
    appId: "1:1057344622688:web:b49976a0434d2828633305"
};

const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();


const googleProvider = new firebase.auth.GoogleAuthProvider();

const signInWithGoogle = async () => {
    try {
        const res = await auth.signInWithPopup(googleProvider);
        const user = res.user;
        await fetch('/api/user/get/' + user.uid+'/')
            .then(response => {
                if (response.status === 200) {

                    return response.json()
                }
            })
            .then(data => {
                if (!data.name) {
                    fetch('/api/user/add/',
                        {
                            method: 'POST',
                            body: JSON.stringify({
                                    uid: user.uid,
                                    name: user.displayName,
                                    authProvider: "google",
                                    email: user.email,
                                },
                            ),

                            headers: new Headers({
                                "content-type": "application/json"
                            })
                        }).then(response => {
                        return response.json()
                    }).then(data => {
                        console.log(data)
                    })
                        .catch(error => {
                            console.log('error: ' + error)
                        })
                }
            })

    } catch (err) {
        console.error(err);

    }
};
const signInWithEmailAndPassword = async (email, password) => {
    try {
        await auth.signInWithEmailAndPassword(email, password);
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const registerWithEmailAndPassword = async (name, email, password) => {
    try {
        const res = await auth.createUserWithEmailAndPassword(email, password);
        const user = res.user;

        await fetch('/api/add_user/',
            {
                method: 'POST',
                body: JSON.stringify({
                        uid: user.uid,
                        name,
                        authProvider: "local",
                        email
                    },
                ),

                headers: new Headers({
                    "content-type": "application/json"
                })
            }).then(response => {
            return response.json()
        }).then(data => {
            console.log(data)
        })
            .catch(error => {
                alert('error: ' + error)
            })

    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const sendPasswordResetEmail = async (email) => {
    try {
        await auth.sendPasswordResetEmail(email);
        alert("Password reset link sent!");
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const logout = () => {
    auth.signOut();
};

export {
    auth,
    signInWithGoogle,
    signInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordResetEmail,
    logout,
};