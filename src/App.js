import React, { useState } from 'react';
import './roleta.css';
import roleta from './toprolete.svg';
import backgroundImg from './fundo01.jpg';

function Roleta() {
  const [angulo, setAngulo] = useState(0);
  const [numerosClicados, setNumerosClicados] = useState([]); // Estado para armazenar os números clicados

  const premios = ["Prêmio 1", "Prêmio 2", "Prêmio 3", "Prêmio 4", "Prêmio 5"];

  const girarRoleta = () => {
    const novoAngulo = Math.floor(Math.random() * 360 + 360 * 5);
    setAngulo(novoAngulo);
  };

  // Função modificada para lidar com o clique e capturar coordenadas
  const handleNumeroClick = (num, event) => {
    const { offsetX, offsetY } = event.nativeEvent;  // Captura coordenadas relativas ao elemento
    console.log(`Número clicado: ${num}, Coordenadas: X: ${offsetX}, Y: ${offsetY}`);
    setNumerosClicados(prev => [...prev, num]);
  };

  const numeroCor = (num) => {
    const vermelhos = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
    return vermelhos.includes(num) ? 'vermelho' : 'preto';
  };

  const criarColunas = () => {
    let colunas = [];
    for (let i = 0; i < 12; i++) {
      let baseNumber = 3 * i + 1;
      colunas.push([
        baseNumber + 2, 
        baseNumber + 1, 
        baseNumber
      ]);
    }
    return colunas;
  };

  const handleRoletaClick = (event) => {
    const rect = event.target.getBoundingClientRect();
    const x = event.clientX - rect.left; // Coordenada X relativa ao elemento
    const y = event.clientY - rect.top;  // Coordenada Y relativa ao elemento
    console.log(`Coordenadas clicadas na roleta: X: ${x}, Y: ${y}`);
};

  return (
    <div 
      style={{ backgroundImage: `url(${backgroundImg})`, width: '100vw', height: '100vh', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}
    >
      <div className="roleta">
      <div className="roda"
          style={{ backgroundImage: `url(${roleta})`, transform: `rotate(${angulo}deg)` }}
          onClick={handleRoletaClick}
          onAnimationEnd={() => alert(`Parou no prêmio: ${premios[Math.floor(angulo / 360) % premios.length]}`)}>
      </div>
        <button onClick={girarRoleta}>Girar Roleta</button>
      </div>

      <div className="mesa">
        <div className="zero-container">
          <div className="numero zero" onClick={(event) => handleNumeroClick(0, event)}>0</div>
        </div>
        <div className="numeros-container">
          {criarColunas().map((coluna, idx) => (
            <div key={idx} className="coluna">
              {coluna.map(num => (
                <div key={num} className={`numero ${numeroCor(num)}`} onClick={(event) => handleNumeroClick(num, event)}>
                  {num}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Roleta;
