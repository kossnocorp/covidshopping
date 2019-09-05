import * as firebase from 'firebase/app'
import config from '#app/config'
// Enable Firestore
// import 'firebase/firestore'
import './style'

firebase.initializeApp(config.firebase)

alert('Hello, world!')
