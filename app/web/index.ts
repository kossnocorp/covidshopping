import * as firebase from 'firebase/app'
import config from '#app/config'
// Enable Firestore
// import 'firebase/firestore'
import './style'

firebase.initializeApp(config.firebase)

const counterEl = document.getElementById('counter')
let count = 0
counterEl &&
  setInterval(() => {
    count++
    counterEl.innerText = count.toString()
  }, 1000)
