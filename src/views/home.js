
import { div, input, text } from 'pocket/tags/html'
import Frame from './_frame'

/**
 *
 * Actions
 *
 */

const oninputWidth = ({ resize }, value) => {
  resize.width = value

  resize.link === true
    ? resize.height = value / resize.ratio
    : resize.ratio = resize.width / resize.height

  return { resize }
}

const oninputHeight = ({ resize }, value) => {
  resize.height = value

  resize.link === true
    ? resize.width = value * resize.ratio
    : resize.ratio = resize.width / resize.height

  return { resize }
}

const onclickLink = ({ resize }) => {
  resize.link = !resize.link
  resize.ratio = resize.width / resize.height

  return { resize }
}

const onclickRatio = ({ resize }, data) => {
  resize.ratio = data.ratio
  resize.height = resize.width / resize.ratio

  return { resize }
}

const onclickCopy = ({ clipboard }) => async dispatch => {
  setTimeout(() => {
    dispatch(({ clipboard }) => {
      clipboard.copied = false
      return { clipboard }
    })
  }, 1000)

  clipboard.copied = true
  return { clipboard }
}

/**
 *
 * Components
 *
 */

const FieldComponent = dispatch => data => {
  const action = data.name === 'width'
    ? oninputWidth
    : oninputHeight

  data.placeholder = data.name
  data.type = 'number'

  data.oninput = event => {
    dispatch(action, event.target.value)
  }

  return input(data)
}

const ButtonComponent = ({ resize }, dispatch) => data => {
  const classList = resize.ratio === data.ratio
    ? 'button -active'
    : 'button'

  const onclick = () => {
    dispatch(onclickRatio, data)
  }

  return div({ class: classList, onclick }, [
    text(data.text)
  ])
}

const PlaceholderComponent = (state, dispatch) => data => {
  const width = Math.round(state.resize.width)
  const height = Math.round(state.resize.height)

  const url = `https://via.placeholder.com/${width}x${height}`
  const children = [text(state.clipboard.copied === true ? 'Copied!' : 'Copy')]

  return div({ class: 'placeholder' }, [
    input({ id: 'clipboard', type: 'text', value: url }),
    div({
      onclick: () => {
        document.getElementById('clipboard').select()
        document.execCommand('copy')
        dispatch(onclickCopy)
      }
    }, children)
  ])
}

/**
 *
 * View
 *
 */

const Home = (state, dispatch) => {
  const Field = FieldComponent(dispatch)
  const Button = ButtonComponent(state, dispatch)
  const Placeholder = PlaceholderComponent(state, dispatch)

  const currentRatio = state.resize.ratio === null
    ? '???'
    : state.resize.ratio.toFixed(3)

  return div({ class: 'home' }, [
    div({ class: 'dimensions' }, [
      Field({
        name: 'width',
        value: state.resize.width
      }),
      div({
        class: state.resize.link ? 'link' : 'link -unlink',
        onclick: () => {
          dispatch(onclickLink)
        }
      }),
      Field({
        name: 'height',
        value: state.resize.height
      })
    ]),
    div({ class: 'ratios' }, [
      div({ class: 'row' }, [
        Button({
          ratio: state.resize.ratio,
          text: 'Ratio (' + currentRatio + ')'
        }),
        Button({ ratio: 1, text: '1 x 1 (Square)' }),
        Button({ ratio: 4 / 5, text: '4 x 5 (8 x 10)' })
      ]),
      div({ class: 'row' }, [
        Button({ ratio: 8.5 / 11, text: '8.5 x 11 (Letter)' }),
        Button({ ratio: 4 / 3, text: '4 x 3' }),
        Button({ ratio: 5 / 7, text: '5 x 7' })
      ]),
      div({ class: 'row' }, [
        Button({ ratio: 2 / 3, text: '2 x 3 (4 x 6)' }),
        Button({ ratio: 16 / 9, text: '16 x 9' }),
        Button({ ratio: 64 / 27, text: '64 x 27 (21 x 9)' })
      ])
    ]),
    Placeholder()
  ])
}

/**
 *
 * Export
 *
 */

export default {
  view: Frame(Home),
  init: () => {
    console.log('/home')
  }
}
