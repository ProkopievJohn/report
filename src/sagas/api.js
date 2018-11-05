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

  const { method = 'GET', headers, body } = params
  const preparedUrl = `${process.env.API_URL || '/'}api/${url}`
  try {
    const response = await fetch(preparedUrl, {
      method,
      headers,
      body
    })
    return {
      ok: response.ok,
      status: response.status,
      headers: response.headers,
      payload: await response.json()
    }
  } catch (err) {
    console.log('[ERROR]', err)
    const { response = { data: { payload: {} } } } = err
    console.log('response: ', response)

    return {
      ok: response.status < 300,
      status: response.status,
      headers: new Headers(response.headers),
      payload: response.data
    }
  }
}

export function callSecureApi(url, params) {
  return callApi(`secure/${url}`, params)
}
