import { useState, useEffect } from 'react'
import { Droplets } from 'lucide-react'

// PIXEL COMPONENTS
import Header from './components/Header'
import SwapCard from './components/SwapCard'
import PoolsPage from './components/PoolsPage'
import FarmSection from './components/FarmSection'
import InfoSection from './components/InfoSection'
import StatsBar from './components/StatsBar'
import PixelBackground from './components/PixelBackground'

// CARC DEX LOGIC
import { DEXService, TokenInfo } from './lib/dex'
import { walletService, WalletType } from './lib/walletService'
import { TokenService } from './lib/tokenService'
import { NewSwapWidget } from './components/NewSwapWidget'
import { LiquidityWidget } from './components/LiquidityWidget'
import { ethers } from 'ethers'

// PIXEL CSS
import './index.css'
import './App.css'


// ENV
const DEX_ADDRESS =
  import.meta.env.VITE_DEX_ADDRESS ||
  '0x0000000000000000000000000000000000000000'

// PAGES
type Page =
  | 'trade'
  | 'pools'
  | 'farm'
  | 'info'
  | 'swap'
  | 'positions'
  | 'more'
  | 'about'

interface TokenBalance extends TokenInfo {
  balance: string
  formattedBalance: string
}


function App() {
  /* ===========================================================
     PIXEL THEME (LIGHT / DARK)
  =========================================================== */
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.body.className = next
  }

  if (!document.body.className) {
    document.body.className = theme
  }

  /* ===========================================================
     CARC DEX STATE
  =========================================================== */
  const [dexService, setDexService] = useState<DEXService | null>(null)
  const [account, setAccount] = useState<string | null>(null)
  const [walletType, setWalletType] = useState<WalletType | null>(null)
  const [tokens, setTokens] = useState<TokenBalance[]>([])
  const [activePage, setActivePage] = useState<Page>('trade')
  const [isLoading, setIsLoading] = useState(false)

  /* ===========================================================
     INIT DEX SERVICE
  =========================================================== */
  useEffect(() => {
    const service = new DEXService(DEX_ADDRESS)
    setDexService(service)
  }, [])

  /* ===========================================================
     LOAD BALANCES
  =========================================================== */
  const loadTokenBalances = async (address: string, provider: any) => {
    try {
      const tokenService = new TokenService(provider)
      const userTokens = await tokenService.getTokensWithBalances(address)

      const formattedTokens: TokenBalance[] = userTokens.map(token => ({
        ...token,
        formattedBalance: ethers.formatUnits(
          token.balance || '0',
          token.decimals
        )
      }))

      setTokens(formattedTokens)
    } catch (err) {
      console.error('Balance load error:', err)
    }
  }

  /* ===========================================================
     CONNECT WALLET
  =========================================================== */
  const connectWallet = async () => {
    if (!dexService) return
    setIsLoading(true)

    try {
      const walletInfo = await walletService.connectWallet({
        preferredMethod: 'injected'
      })

      await walletService.switchToArcNetwork()

      setAccount(walletInfo.address)
      setWalletType(walletInfo.type)

      const provider = walletService.getProvider()
      if (provider) {
        dexService.setProvider(provider)
        await loadTokenBalances(walletInfo.address, provider)
      }
    } catch (err: any) {
      alert(`Wallet Error: ${err.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  /* ===========================================================
     DISCONNECT WALLET
  =========================================================== */
  const disconnectWallet = async () => {
    await walletService.disconnect()
    setAccount(null)
    setWalletType(null)
    setTokens([])
  }

  /* ===========================================================
     UI RENDER
  =========================================================== */
  return (
    <div className="app animated-bg">

      {/* PIXEL ART BACKGROUND */}
      <PixelBackground theme={theme} />

      {/* PIXEL HEADER */}
      <Header
        theme={theme}
        onThemeToggle={toggleTheme}
        activePage={activePage}
        setActivePage={setActivePage}
        account={account}
        connectWallet={connectWallet}
        disconnectWallet={disconnectWallet}
      />

      {/* PIXEL TOP STATS */}
      {activePage !== 'trade' && <StatsBar theme={theme} />}

      {/* MAIN LAYOUT */}
      <main className="main-content">

        {/* TRADE PAGE (PIXIDEX STYLE) */}
        {activePage === 'trade' && (
          <div className="trade-container">
            <SwapCard theme={theme} />
          </div>
        )}

        {/* POOLS */}
        {activePage === 'pools' && (
          <PoolsPage theme={theme} />
        )}

        {/* FARM */}
        {activePage === 'farm' && (
          <FarmSection theme={theme} />
        )}

        {/* INFO */}
        {activePage === 'info' && (
          <InfoSection theme={theme} />
        )}

        {/* ARC SWAP = Pixel Glow Swap */}
        {activePage === 'swap' && (
          <>
            {account && tokens.length > 0 && (
              <div className="pixel-card mb-4">
                <h3 className="text-sm mb-3 text-carc">Your Tokens</h3>
                <div className="space-y-2">
                  {tokens.map(token => (
                    <div
                      key={token.address}
                      className="flex justify-between items-center"
                    >
                      <span className="text-carc-light">{token.symbol}</span>
                      <span className="font-bold">{token.formattedBalance}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <NewSwapWidget
              tokens={tokens}
              onSwap={() => {}}
            />
          </>
        )}

        {/* POSITIONS */}
        {activePage === 'positions' && (
          <div className="pixel-card text-center">
            <Droplets className="mx-auto w-12 h-12 text-carc" />
            <h3 className="text-xl mt-3">No Positions</h3>
            <p className="text-sm opacity-70">Add liquidity to get started</p>
          </div>
        )}

        {/* MORE */}
        {activePage === 'more' && (
          <div className="pixel-card">
            <h2 className="text-xl mb-4">More</h2>
            <button
              onClick={() => setActivePage('about')}
              className="pixel-button"
            >
              About Carc DEX
            </button>
          </div>
        )}

        {/* ABOUT */}
        {activePage === 'about' && (
          <div className="pixel-card">
            <h1 className="text-3xl mb-3">Carc DEX</h1>
            <p className="opacity-80">
              Pixel-art decentralized exchange powered by Arc Network.
            </p>
          </div>
        )}

      </main>

      {/* PIXEL FOOTER */}
      <footer className="pixel-footer">
        <p>© 2025 Carc Pixel DEX</p>
        <p>Trade with retro power!</p>
      </footer>
    </div>
  )
}

export default App
