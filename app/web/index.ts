import config from '#app/config'
import * as firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/analytics'
import { h, render } from 'preact'
import UI from '#app/UI'

firebase.initializeApp(config.firebase)
render(h(UI, { initialURL: location.href }), document.body)
