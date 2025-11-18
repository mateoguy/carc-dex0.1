import React, { useState } from 'react'
import './SwapCard.css'

interface SwapCardProps {
  theme: 'light' | 'dark'
}

const SwapCard: React.FC<SwapCardProps> = ({ theme }) => {
  const [fromAmount, setFromAmount] = useState<string>('')
  const [toAmount, setToAmount] = useState<string>('')
  const [fromToken, setFromToken] = useState<string>('BTC')
  const [toToken, setToToken] = useState<string>('ETH')

  const tokens = ['BTC', 'ETH', 'USDT', 'BNB', 'SOL', 'MATIC']

  const handleSwap = () => {
    console.log('Swapping', fromAmount, fromToken, 'to', toToken)
  }

  const switchTokens = () => {
    setFromToken(toToken)
    setToToken(fromToken)
    setFromAmount(toAmount)
    setToAmount(fromAmount)
  }

  return (
    <div className={`swap-card ${theme}`}>
      <div className="card-header">
        <h2><span className="header-icon">⚡</span> Swap Tokens</h2>
      </div>

      <div className="card-body">

        {/* FROM INPUT */}
        <div className={`input-group ${theme}`}>
          <label className="input-label">From</label>

          <div className={`token-input ${theme}`}>
            <input
              type="number"
              placeholder="0.0"
              value={fromAmount}
              onChange={(e) => setFromAmount(e.target.value)}
              className={`amount-input ${theme}`}
            />

            <select
              value={fromToken}
              onChange={(e) => setFromToken(e.target.value)}
              className={`token-select ${theme}`}
            >
              {tokens.map((token) => (
                <option key={token} value={token}>{token}</option>
              ))}
            </select>
          </div>

          <div className="balance">Balance: 1.234 {fromToken}</div>
        </div>

        {/* SWITCH BUTTON */}
        <div className="swap-arrow-container">
          <button
            className={`swap-arrow-btn ${theme}`}
            onClick={switchTokens}
          >
            <span className="arrow-icon">↕</span>
          </button>
        </div>

        {/* TO INPUT */}
        <div className={`input-group ${theme}`}>
          <label className="input-label">To</label>

          <div className={`token-input ${theme}`}>
            <input
              type="number"
              placeholder="0.0"
              value={toAmount}
              onChange={(e) => setToAmount(e.target.value)}
              className={`amount-input ${theme}`}
            />

            <select
              value={toToken}
              onChange={(e) => setToToken(e.target.value)}
              className={`token-select ${theme}`}
            >
              {tokens.map((token) => (
                <option key={token} value={token}>{token}</option>
              ))}
            </select>
          </div>

          <div className="balance">Balance: 5.678 {toToken}</div>
        </div>

        {/* DETAILS */}
        <div className={`swap-details ${theme}`}>
          <div className="detail-row">
            <span>Rate:</span>
            <span>1 {fromToken} = 15.234 {toToken}</span>
          </div>
          <div className="detail-row">
            <span>Fee:</span>
            <span>0.3%</span>
          </div>
          <div className="detail-row">
            <span>Slippage:</span>
            <span>0.5%</span>
          </div>
        </div>

        {/* SWAP BUTTON */}
        <button
          className={`swap-btn ${theme}`}
          onClick={handleSwap}
        >
          <span className="btn-icon">⟲</span> Swap Now
        </button>
      </div>
    </div>
  )
}

export default SwapCard
