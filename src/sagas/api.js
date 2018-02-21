if (typeof FormData === 'undefined') {
  global.FormData = class FormData {}
}

let token

export function setToken(newToken) {
  token = newToken
}

export function getToken() {
  return token
}

export async function callApi(url, params = {}) {
  if (params.body && typeof params.body !== 'string' && !(params.body instanceof FormData)) {
    params.body = JSON.stringify(params.body)
  }
  params.headers = {
    ...(params.headers || {})
  }
  if (!(params.body instanceof FormData)) {
    params.headers['Content-Type'] = 'application/json'
  }
  if (token || params.token) {
    params.headers['Authorization'] = `Bearer ${token || params.token}`
  }

  const { method = 'GET', headers, body, onUploadProgress = () => {}, onDownloadProgress = () => {} } = params
  const preparedUrl = `${process.env.PUBLIC_URL || '/'}api/${url}`
  try {
    const response = await fetch(preparedUrl, {
      method,
      headers,
      body,
      onUploadProgress,
      onDownloadProgress
    })
    return {
      ok: response.ok,
      status: response.status,
      headers: response.headers,
      payload: await response.json()
    }
  } catch (err) {
    console.log('[ERROR]', err)
  }
}
