import { useState, useEffect, useRef } from 'react'
import BlockchainBg from './components/BlockchainBg'
import CryptoTicker from './components/CryptoTicker'
import AudioPlayer from './components/AudioPlayer'
import './App.css'

function App() {
  const [data, setData] = useState(null)
  const [expandedRisk, setExpandedRisk] = useState(null)
  const [checkedItems, setCheckedItems] = useState({})
  const sectionRefs = useRef([])

  useEffect(() => {
    fetch('/data/cripto.json')
      .then(res => res.json())
      .then(json => setData(json))
      .catch(err => console.error('Error:', err))
  }, [])

  // Scroll reveal con IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1 }
    )
    sectionRefs.current.forEach(el => { if (el) observer.observe(el) })
    return () => observer.disconnect()
  }, [data])

  if (!data) return <div className="loading">Cargando...</div>

  const [secQueSon, secIlegales, secRiesgos, secRecomendaciones, secBlockchain] = data.secciones

  const toggleRisk = (i) => setExpandedRisk(prev => prev === i ? null : i)
  const toggleCheck = (i) => setCheckedItems(prev => ({ ...prev, [i]: !prev[i] }))

  return (
    <div className="app">
      <BlockchainBg />
      <CryptoTicker tickers={data.ticker} />

      {/* HERO */}
      <header className="hero">
        <div className="hero-inner">
          <span className="hero-badge">Guía Visual · Finanzas Digitales</span>
          <h1 className="hero-titulo">
            CRIPTO<span className="accent">ACTIVOS</span>:<br />
            LA GUÍA ESENCIAL
          </h1>
          <p className="hero-sub">
            Todo lo que necesitás saber antes de dar el primer paso en el mundo de las monedas digitales.
          </p>
          <div className="hero-arrow">↓</div>
        </div>
      </header>

      {/* SECCIÓN 1 — ¿Qué son? */}
      <div className="connector"></div>
      <section
        className="infografia-seccion"
        ref={el => sectionRefs.current[0] = el}
      >
        <div className="number-badge">1</div>
        <div className="glass-card">
          <h2 className="sec-titulo" style={{ color: secQueSon.color }}>
            {secQueSon.titulo}
          </h2>
          <p className="sec-desc">{secQueSon.descripcion}</p>
          <AudioPlayer src={secQueSon.audio} sectionTitle={secQueSon.titulo} />
          <img src="/images/crypto-intro.jpg" alt="Ilustración criptoactivos" className="seccion-imagen" />          <div className="puntos-grid">
            {secQueSon.puntos.map((p, i) => (
              <div key={i} className="punto-card">
                <span className="punto-dot" style={{ background: secQueSon.color }}></span>
                {p}
              </div>
            ))}
          </div>
          <p className="section-fuente">Fuente: {secQueSon.fuente}</p>
        </div>
      </section>

      {/* SECCIÓN 2 — ¿Son ilegales? */}
      <div className="connector"></div>
      <section
        className="infografia-seccion"
        ref={el => sectionRefs.current[1] = el}
      >
        <div className="number-badge">2</div>
        <div className="glass-card">
          <h2 className="sec-titulo" style={{ color: secIlegales.color }}>
            {secIlegales.titulo}
          </h2>
          <p className="sec-desc">{secIlegales.descripcion}</p>
          <AudioPlayer src={secIlegales.audio} sectionTitle={secIlegales.titulo} />
          <div className="legal-cols">
            <div className="legal-col si">
              <p className="legal-label verde">✅ Legal</p>
              {secIlegales.puntos.filter(p => p.startsWith('✅')).map((p, i) => (
                <p key={i} className="legal-item">{p.replace('✅ ', '')}</p>
              ))}
            </div>
            <div className="legal-col no">
              <p className="legal-label rojo">❌ Ilegal</p>
              {secIlegales.puntos.filter(p => p.startsWith('❌')).map((p, i) => (
                <p key={i} className="legal-item">{p.replace('❌ ', '')}</p>
              ))}
            </div>
          </div>
          <p className="section-fuente">Fuente: {secIlegales.fuente}</p>
        </div>
      </section>

      {/* SECCIÓN 3 — Riesgos */}
      <div className="connector"></div>
      <section
        className="infografia-seccion"
        ref={el => sectionRefs.current[2] = el}
      >
        <div className="number-badge">3</div>
        <div className="glass-card">
          <h2 className="sec-titulo" style={{ color: secRiesgos.color }}>
            {secRiesgos.titulo}
          </h2>
          <p className="sec-desc">{secRiesgos.descripcion}</p>
          <AudioPlayer src={secRiesgos.audio} sectionTitle={secRiesgos.titulo} />
          <img src="/images/crypto-riesgos.jpg" alt="Ilustración riesgos" className="seccion-imagen" />          <div className="riesgos-lista">
            {secRiesgos.riesgos.map((r, i) => (
              <div
                key={i}
                className={`riesgo-item ${expandedRisk === i ? 'open' : ''}`}
                onClick={() => toggleRisk(i)}
              >
                <div className="riesgo-row">
                  <span className="riesgo-num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="riesgo-titulo">{r.titulo}</span>
                  <span className="riesgo-arrow">{expandedRisk === i ? '▲' : '▼'}</span>
                </div>
                {expandedRisk === i && (
                  <p className="riesgo-desc">{r.desc}</p>
                )}
              </div>
            ))}
          </div>
          <p className="section-fuente">Fuente: {secRiesgos.fuente}</p>
        </div>
      </section>

      {/* SECCIÓN 4 — Recomendaciones */}
      <div className="connector"></div>
      <section
        className="infografia-seccion"
        ref={el => sectionRefs.current[3] = el}
      >
        <div className="number-badge">4</div>
        <div className="glass-card">
          <h2 className="sec-titulo" style={{ color: secRecomendaciones.color }}>
            {secRecomendaciones.titulo}
          </h2>
          <p className="sec-desc">{secRecomendaciones.descripcion}</p>
          <AudioPlayer src={secRecomendaciones.audio} sectionTitle={secRecomendaciones.titulo} />
          <div className="tips-grid">
            {secRecomendaciones.checklist.map((item, i) => (
              <div
                key={i}
                className={`tip-card ${checkedItems[i] ? 'checked' : ''}`}
                onClick={() => toggleCheck(i)}
              >
                <div className="tip-num">{String(i + 1).padStart(2, '0')}</div>
                <p className="tip-texto">{item}</p>
                {checkedItems[i] && <span className="tip-check">✓</span>}
              </div>
            ))}
          </div>
          <p className="section-fuente">Fuente: {secRecomendaciones.fuente}</p>
        </div>
      </section>

      {/* SECCIÓN 5 — Blockchain */}
      <div className="connector"></div>
      <section
        className="infografia-seccion"
        ref={el => sectionRefs.current[4] = el}
      >
        <div className="number-badge">5</div>
        <div className="glass-card">
          <h2 className="sec-titulo" style={{ color: secBlockchain.color }}>
            {secBlockchain.titulo}
          </h2>
          <p className="sec-desc">{secBlockchain.descripcion}</p>
          <AudioPlayer src={secBlockchain.audio} sectionTitle={secBlockchain.titulo} />

          {/* SVG Animado de dominancia de mercado */}
          <div className="dominancia-wrapper">
            <svg className="dominancia-svg" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
              <circle cx="200" cy="200" fill="none" r="150" stroke="#323538" strokeWidth="40" />
              <circle cx="200" cy="200" fill="none" r="150"
                stroke="#F7931A" strokeWidth="42"
                strokeDasharray="942" strokeDashoffset="376"
                strokeLinecap="round">
                <animate attributeName="stroke-dashoffset" from="942" to="376" dur="2s" fill="freeze" />
              </circle>
              <circle cx="200" cy="200" fill="none" r="150"
                stroke="#627EEA" strokeWidth="38"
                strokeDasharray="942" strokeDashoffset="800"
                strokeLinecap="round">
                <animate attributeName="stroke-dashoffset" from="942" to="800" dur="2s" begin="0.5s" fill="freeze" />
              </circle>
              <text x="200" y="195" textAnchor="middle" fill="white"
                fontFamily="Montserrat" fontSize="22" fontWeight="700">
                MERCADO
              </text>
              <text x="200" y="222" textAnchor="middle" fill="#00d2ff"
                fontFamily="JetBrains Mono" fontSize="13">
                CRYPTO GLOBAL
              </text>
            </svg>
            <div className="dominancia-leyenda">
              <div className="leyenda-item">
                <span className="leyenda-valor" style={{ color: '#F7931A' }}>60%</span>
                <span className="leyenda-label">BTC</span>
              </div>
              <div className="leyenda-item">
                <span className="leyenda-valor" style={{ color: '#627EEA' }}>25%</span>
                <span className="leyenda-label">ETH</span>
              </div>
              <div className="leyenda-item">
                <span className="leyenda-valor" style={{ color: '#00d2ff' }}>15%</span>
                <span className="leyenda-label">ALT</span>
              </div>
            </div>
          </div>

          <div className="pasos-lista">
            {secBlockchain.pasos.map((paso, i) => (
              <div key={i} className="paso">
                <div className="paso-num" style={{ background: secBlockchain.color }}>
                  {paso.num}
                </div>
                <div className="paso-body">
                  <h4 className="paso-titulo">{paso.titulo}</h4>
                  <p className="paso-desc">{paso.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="section-fuente">Fuente: {secBlockchain.fuente}</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="poster-footer">
        <p className="footer-titulo">CRIPTO_INFO</p>
        <p className="footer-sub">IF7102 Multimedios · UCR · I Ciclo 2026</p>
      </footer>

    </div>
  )
}

export default App