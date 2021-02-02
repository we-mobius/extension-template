import '@we-mobius/mobius-ui/src/statics/styles/static.css'

import {
  completeStateRD,
  globalVar, makeElementBasedMessageProxy
} from 'MobiusUtils'
import { makeAppContainerRD, runApp } from 'MobiusUI'
import { appTemplateRD } from 'Interface/app.js'
import { initLoaderService } from 'MobiusJS'

console.log('[InjectJS] start...')

initLoaderService()

completeStateRD.subscribe(() => {
  console.log('[InjectJS] initialize...')

  const appContainerRD = makeAppContainerRD('appId', {
    className: 'mobius-position--fixed mobius-position--z-toppest mobius-base'
  })
  runApp(appContainerRD, appTemplateRD)

  globalVar('messageProxy', makeElementBasedMessageProxy(
    'kit4web-message-channel-proxy',
    'extension-message',
    'inject'
  ))
  globalVar('messageProxy').send({ to: 'content', hello: 'world' })

  console.log('[InjectJS] initialize ended!')
})

console.log('[InjectJS] executed!')
