import { renderHook } from '@testing-library/react-hooks'
import { SWRConfig } from 'swr'

/**
 * Renders a React testing library hook within a specified wrapper for testing.
 *
 * @param {function} callback - The hook callback to render.
 * @returns {object} - The rendered hook result using React Testing Library's renderHook.
 *
 * @example
 * const { result } = renderAppHook(() => useCustomHook());
 * expect(result.current).toBe(...);
 */
export default function renderAppHook(callback) {
  const wrapper = ({ children }) => (
    <SWRConfig value={{ provider: () => new Map() }}>{children}</SWRConfig>
  )
  return renderHook(callback, { wrapper })
}
