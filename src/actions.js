
/**
 * Merge a new state-like object to state.
 * @function merge
 */

const merge = (state, dispatch) => data => {
  const result = {}

  for (const key in data) {
    Object.assign(result, state[key], data[key])
  }

  return result
}

/**
 * Action for the most common fetch use-case.
 * @function fetch
 */

const fetch = (state, dispatch) => (path, req) => {
  const foo = merge(state, dispatch)

  window.fetch(path, req.options)
    .then(res => res.json())
    .then(data => {
      foo(req.then(data))
    })
    .catch(error => {
      foo(req.catch(error))
    })
}

/**
 *
 */

export default { merge, fetch }
