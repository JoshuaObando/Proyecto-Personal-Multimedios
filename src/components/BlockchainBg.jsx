import './BlockchainBg.css'

//Funcion que genera el fondo animado de nodos y enlaces representando la red blockchain
function BlockchainBg() {
  const nodes = [
    { cx: 80, cy: 120 },
    { cx: 220, cy: 60 },
    { cx: 380, cy: 160 },
    { cx: 520, cy: 80 },
    { cx: 680, cy: 180 },
    { cx: 820, cy: 90 },
    { cx: 140, cy: 280 },
    { cx: 300, cy: 320 },
    { cx: 460, cy: 260 },
    { cx: 620, cy: 340 },
    { cx: 760, cy: 240 },
    { cx: 900, cy: 300 },
  ]

  //Constante que define las conexiones entre nodos para crear la red blockchain
  const links = [
    [0,1],[1,2],[2,3],[3,4],[4,5],
    [0,6],[1,7],[2,8],[3,9],[4,10],[5,11],
    [6,7],[7,8],[8,9],[9,10],[10,11],
  ]

  //Retorna el SVG con los nodos y enlaces animados para el fondo de la infografía
  return (
    <div className="blockchain-bg" aria-hidden="true">
      <svg viewBox="0 0 960 500" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
        {links.map(([a, b], i) => (
          <line
            key={i}
            x1={nodes[a].cx} y1={nodes[a].cy}
            x2={nodes[b].cx} y2={nodes[b].cy}
            stroke="#F7931A"
            strokeWidth="0.8"
            className="blockchain-link"
            style={{ animationDelay: `${i * 0.3}s` }}
          />
        ))}
        // Renderizamos los nodos como círculos con animación de aparición
        {nodes.map((n, i) => (
          <circle
            key={i}
            cx={n.cx}
            cy={n.cy}
            r="4"
            fill="#F7931A"
            className="blockchain-node"
            style={{ animationDelay: `${i * 0.5}s` }}
          />
        ))}
      </svg>
    </div>
  )
}

export default BlockchainBg