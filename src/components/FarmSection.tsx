import { useState } from 'react'
import './FarmSection.css'

function FarmSection({ theme }) {
  const [activeTab, setActiveTab] = useState('active')

  const farms = [
    {
      id: 1,
      pair: "BTC-ETH LP",
      apr: "156%",
      staked: "2.5 LP",
      earned: "0.234 PIXI",
    },
    {
      id: 2,
      pair: "ETH-USDT LP",
      apr: "92%",
      staked: "1.2 LP",
      earned: "0.108 PIXI",
    }
  ]

  return (
    <div className={`farm-section ${theme}`}>
      <h2 className="farm-title">⚒ Yield Farms</h2>

      <div className="farm-tabs">
        <button
          className={`farm-tab ${activeTab === 'active' ? 'active' : ''} ${theme}`}
          onClick={() => setActiveTab('active')}
        >
          Active
        </button>

        <button
          className={`farm-tab ${activeTab === 'all' ? 'active' : ''} ${theme}`}
          onClick={() => setActiveTab('all')}
        >
          All
        </button>
      </div>

      <div className="farm-list">
        {farms.map(farm => (
          <div key={farm.id} className={`farm-card ${theme}`}>
            <div className="farm-pair">{farm.pair}</div>
            <div className="farm-apr">APR: {farm.apr}</div>
            <div className="farm-staked">Staked: {farm.staked}</div>
            <div className="farm-earned">Earned: {farm.earned}</div>

            <button className={`farm-btn ${theme}`}>Stake</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FarmSection

