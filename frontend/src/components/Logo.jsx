// Shows the logo that matches the current theme.
// Files live in frontend/public/ (served from "/").
const LOGO_FOR_LIGHT_MODE = '/Logo-Light.png'
const LOGO_FOR_DARK_MODE = '/Logo-Dark.png'

export default function Logo({ theme }) {
  return (
    <img
      src={theme === 'light' ? LOGO_FOR_DARK_MODE : LOGO_FOR_LIGHT_MODE}
      alt="PeerForge Logo"
      className="logo"
    />
  )
}