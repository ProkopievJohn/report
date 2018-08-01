/* eslint-disable no-restricted-globals */
self.addEventListener('install', event => {
  event.waitUntil(self.skipWaiting())
})

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim())
})

self.addEventListener('message', event => {
  const show = (
    typeof Notification !== 'undefined' &&
    Notification.permission === 'granted'
  )
  if (!show) {
    return
  }
  switch (event.data.action) {
    case 'notify': {
      const { title, options } = event.data.payload
      self.registration &&
      self.registration.showNotification(title, options)
      break
    }
    default:
      break
  }
})
// notification click handler
self.addEventListener('notificationclick', event => {
  let target = self.origin
  if (event.notification.data.documentId) {
    target += `/documents/${event.notification.data.documentId}`
  }
  event.notification.close()
  if (!self.clients) {
    return
  }
  event.waitUntil(self.clients.matchAll({
    includeUncontrolled: true,
    type: 'window'
  }).then(clientList => {
    const alreadyOpened = clientList.filter(client => (
      client.url === target && 'focus' in client
    ))
    if (alreadyOpened[0]) {
      return alreadyOpened[0].focus()
    }
    if (clientList.length) {
      const client = clientList[0]
      return client.navigate(target).then(c => 'focus' in c && c.focus())
    }

    return self.clients.openWindow(target)
  }))
})
/* eslint-enable no-restricted-globals */
