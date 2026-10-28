// Small fixed button (top right) that switches light / dark mode.
export default function ThemeToggle({ theme, onToggle }) {
  return (
    <button
      type="button"
      className="btn theme-toggle"
      onClick={onToggle}
      aria-label="Toggle light or dark mode"
    >
      {theme === 'dark' ? 'Light mode' : 'Dark mode'}
    </button>
  )
}