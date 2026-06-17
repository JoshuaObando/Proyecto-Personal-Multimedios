import './SectionNav.css'

//Función que recibe el array de secciones, el id de la sección activa y una función para seleccionar una sección
function SectionNav({ secciones, activeId, onSelect }) {
  //Retorna la barra de navegación lateral con un botón para cada sección, resaltando la sección activa y permitiendo seleccionar una sección al hacer clic
  return (
    <nav className="section-nav">
      {secciones.map((sec) => (
        <button
          key={sec.id}
          className={`nav-dot ${activeId === sec.id ? 'active' : ''}`}
          onClick={() => onSelect(sec.id)}
          title={sec.titulo}
        >
          <span className="dot-label">{sec.titulo}</span>
        </button>
      ))}
    </nav>
  )
}

export default SectionNav