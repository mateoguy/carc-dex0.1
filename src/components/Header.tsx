import './Header.css'

interface HeaderProps {
  theme: 'light' | 'dark'
  onThemeToggle: () => void
  activePage: string
  setActivePage: (page: string) => void
  account: string | null
  connectWallet: () => void
  disconnectWallet: () => void
}

function Header({
  theme,
  onThemeToggle,
  activePage,
  setActivePage,
  account,
  connectWallet,
  disconnectWallet
}: HeaderProps) {
  return (
    <header className={`header ${theme}`}>
      <div className="header-container">

        <div className="logo-section">
          <h1 className="site-title">Carc DEX</h1>
        </div>

        <nav className="nav-menu">
          <button
            className={`nav-btn ${theme} ${activePage === 'trade' ? 'active' : ''}`}
            onClick={() => setActivePage('trade')}
          >
            Trade
          </button>

          <button
            className={`nav-btn ${theme} ${activePage === 'pools' ? 'active' : ''}`}
            onClick={() => setActivePage('pools')}
          >
            Pools
          </button>

          <button
            className={`nav-btn ${theme} ${activePage === 'farm' ? 'active' : ''}`}
            onClick={() => setActivePage('farm')}
          >
            Farm
          </button>

          <button
            className={`nav-btn ${theme} ${activePage === 'info' ? 'active' : ''}`}
            onClick={() => setActivePage('info')}
          >
            Info
          </button>
        </nav>

        <div className="header-actions">
          <button className={`theme-toggle ${theme}`} onClick={onThemeToggle}>
            <span className="theme-icon">{theme === 'light' ? '◐' : '◑'}</span>
          </button>

          {account ? (
            <button
              className={`connect-wallet-btn ${theme}`}
              onClick={disconnectWallet}
            >
              {account.slice(0, 6)}...{account.slice(-4)}
            </button>
          ) : (
            <button
              className={`connect-wallet-btn ${theme}`}
              onClick={connectWallet}
            >
              Connect
            </button>
          )}
        </div>

      </div>
    </header>
  )
}

export default Header
