export function useAnalytics() {
  const { proxy: umami } = useScriptUmamiAnalytics()

  function trackPage() {
    umami.track()
  }

  return { trackPage }
}
