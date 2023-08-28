import { render } from '@testing-library/react'
import { SWRConfig } from 'swr'

/**
 * Renders a React component within a SWRConfig wrapper for testing.
 *
 * @param {ReactNode} component - The React component to render.
 * @returns {object} - The result of rendering the component using React Testing Library's render.
 *
 * @example
 * const { getByText } = renderApp(<MyComponent />);
 * expect(getByText('Hello, World!')).toBeInTheDocument();
 */
export default function renderApp(component) {
  return render(
    <SWRConfig value={{ provider: () => new Map() }}>{component}</SWRConfig>,
  )
}
