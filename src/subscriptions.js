
/**
 * Ensure that gtm.js never affects load time performance.
 * @function gtm
 */

export const gtmanager = (state, dispatch) => data => {
  if (PROD) {
    window.addEventListener('load', () => {
      const script = document.createElement('script')

      script.defer = true // probably unnecessary
      script.src = 'https://googletagmanager.com/gtm.js?id=' + data.id

      document.body.appendChild(script)
    })
  }
}
