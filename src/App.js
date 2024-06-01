import React, { useState } from 'react';
import './roleta.css'; // Importe o CSS para estilização
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

  // Função para lidar com o clique nos números
  const handleNumeroClick = (num) => {
    setNumerosClicados(prev => [...prev, num]); // Adiciona o número aos já clicados
    console.log(`Número clicado: ${num}`); // Exibe o número clicado no console
  };

  // Cor dos números baseado na roleta real
  const numeroCor = (num) => {
    const vermelhos = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
    return vermelhos.includes(num) ? 'vermelho' : 'preto';
  };

  // Criar matriz de números para as colunas, inverte a ordem dos números em cada coluna
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
  }

  return (
    <div 
      style={{ backgroundImage: `url(${backgroundImg})`, width: '100vw', height: '100vh', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}
    >
      <div className="roleta">
        <div className="roda"
             style={{ backgroundImage: `url(${roleta})`, transform: `rotate(${angulo}deg)` }}
             onAnimationEnd={() => alert(`Parou no prêmio: ${premios[Math.floor(angulo / 360) % premios.length]}`)}>
        </div>
        <button onClick={girarRoleta}>Girar Roleta</button>
      </div>

      <div className="mesa">
        <div className="zero-container">
          <div className="numero zero" onClick={() => handleNumeroClick(0)}>0</div>
        </div>
        <div className="numeros-container">
          {criarColunas().map((coluna, idx) => (
            <div key={idx} className="coluna">
              {coluna.map(num => (
                <div key={num} className={`numero ${numeroCor(num)}`} onClick={() => handleNumeroClick(num)}>
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
