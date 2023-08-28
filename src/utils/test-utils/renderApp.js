import { render } from '@testing-library/react'
import { SWRConfig } from 'swr'

export default function renderApp(component) {
  return render(
    <SWRConfig value={{ provider: () => new Map() }}>{component}</SWRConfig>,
  )
}
