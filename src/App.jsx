import { useState, useEffect } from 'react'
import BlockchainBg from './components/BlockchainBg'
import CryptoTicker from './components/CryptoTicker'
import SectionNav from './components/SectionNav'
import AudioPlayer from './components/AudioPlayer'
import './App.css'

//Función principal de la aplicación que maneja el estado y la lógica de carga de datos.
function App() {
  const [data, setData] = useState(null)
  const [activeSection, setActiveSection] = useState(null)

  //Carga los datos del archivo JSON al montar el componente y establece la sección activa inicial.
  useEffect(() => {
    fetch('/data/cripto.json')
      .then(res => res.json())
      .then(json => {
        setData(json)
        setActiveSection(json.secciones[0].id)
      })
      //Manejo de errores en caso de que la carga de datos falle.
      .catch(err => console.error('Error cargando datos:', err))
  }, [])
  //Muestra un mensaje de carga mientras se obtienen los datos.
  if (!data) {
    return <div className="loading">Cargando...</div>
  }

  //Constante que encuentra la sección actualmente activa para mostrar su contenido.
  const currentSection = data.secciones.find(s => s.id === activeSection)

  //Retorna el JSX que compone la interfaz de usuario, incluyendo el fondo, el ticker, la navegación y el contenido principal basado en la sección activa.
  return (
    <div className="app">
      <BlockchainBg />
      <CryptoTicker tickers={data.ticker} />
      <SectionNav
        secciones={data.secciones}
        activeId={activeSection}
        onSelect={setActiveSection}
      />
      <main className="main-content">
        <h1 className="app-title">
          <span className="accent">Cripto</span>activos
        </h1>
        <section className="section-panel">
          <h2>{currentSection.titulo}</h2>
          <p>{currentSection.descripcion}</p>
          <AudioPlayer
            src={currentSection.audio}
            sectionTitle={currentSection.titulo}
          />
        </section>
      </main>
    </div>
  )
}

export default App