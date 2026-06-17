import './CryptoTicker.css'

//Funcion que recibe el array de tickers
function CryptoTicker({ tickers }) {
  const doubled = tickers ? [...tickers, ...tickers] : []//Duplicamos el array para crear un efecto de desplazamiento continuo

  //Renderizamos el ticker con los datos de cada criptomoneda
  return (
    <div className="ticker-wrapper">
      <div className="ticker-label">LIVE</div>
      <div className="ticker-track">
        {doubled.map((t, i) => (
          <span key={i} className="ticker-item">
            <span className="ticker-symbol">{t.symbol}</span>
            <span className="ticker-price">${t.price}</span>
            <span className={`ticker-change ${t.change.startsWith('+') ? 'up' : t.change.startsWith('-') ? 'down' : 'flat'}`}>
              {t.change}
            </span>
            <span className="ticker-divider">|</span>
          </span>
        ))}
      </div>
    </div>
  )
}

export default CryptoTicker