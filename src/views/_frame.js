
import { div } from '../lib/vnodes/html'

export const Frame = slot => (state, dispatch) => {
  return div({ class: 'frame' }, [
    div([slot(state, dispatch)])
  ])
}

export default Frame
