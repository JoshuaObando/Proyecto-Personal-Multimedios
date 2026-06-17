import { useState, useRef } from 'react'
import './AudioPlayer.css'

// funcion que recibe la fuente del audio 
function AudioPlayer({ src, sectionTitle }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const audioRef = useRef(null)

  // Constante para alternar entre reproducir y pausar el audio, actualizando el estado de reproducción
  const togglePlay = () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  //Constante para actualizar el progreso del audio y mostrarlo en la barra de progreso
  const handleTimeUpdate = () => {
    if (!audioRef.current) return
    const pct = (audioRef.current.currentTime / audioRef.current.duration) * 100
    setProgress(pct || 0)
  }

  const handleEnded = () => {
    setIsPlaying(false)
    setProgress(0)
  }

  return (
    <div className={`audio-player ${isPlaying ? 'playing' : ''}`}>
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
      />
      <button
        className="audio-btn"
        onClick={togglePlay}
        aria-label={isPlaying ? 'Pausar narración' : 'Escuchar narración'}
      >
        {isPlaying ? '⏸' : '▶'}
      </button>
      <div className="audio-info">
        <span className="audio-label">Narración — {sectionTitle}</span>
        <div className="audio-progress-bar">
          <div
            className="audio-progress-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  )
}

export default AudioPlayer