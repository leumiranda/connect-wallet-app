import './App.css';
import logo from './logo.svg';
import { ethers } from 'ethers';
import { useState } from 'react';


function App() {
  const [account, setAccount] = useState(null);
  const [transactionStatus, setTransactionStatus] = useState(null);

  const handleConnect = async () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      // Garante que apenas Metamask será usada
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        setAccount(accounts[0]);
      } catch (error) {
        console.error('Erro ao conectar com a carteira Metamask', error);
        alert('Erro ao conectar. Verifique sua carteira e tente novamente.');
      }
    } else {
      alert('Certifique-se de ter a Metamask instalada para continuar.');
    }
  };

  const handleTransaction = async () => {
    if (!account) {
      alert('Conecte sua carteira primeiro!');
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const tx = await signer.sendTransaction({
        to: "0x719C23d4ED66cd6070c33fbb3382caED1C3124D7",
        value: ethers.parseEther("0.000001"),
      });

      setTransactionStatus(`Transação enviada com sucesso! Hash: ${tx.hash}`);
    } catch (error) {
      console.error('Erro ao enviar transação', error);
      setTransactionStatus('Erro ao enviar transação. Verifique sua carteira e tente novamente.');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="Metamask Logo" />
        <div className="card">
          <h1>Conecte sua Carteira</h1>
          <button className="primary-button" onClick={handleConnect}>Conectar Carteira</button>
          {account && (
            <>
              <p>Carteira conectada: {account}</p>
              <button className="secondary-button" onClick={handleTransaction}>Enviar 0,000001 ETH</button>
              <p className="warning">Este valor é para fins de teste. Não será reembolsado.</p>
            </>
          )}
          {transactionStatus && <p className="transaction-status">{transactionStatus}</p>}
        </div>
        <footer>
          <a
            className="App-link"
            href="https://www.linkedin.com/in/leumiranda/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Leandro Miranda - Blockchain Dev JR
          </a>
        </footer>
      </header>
    </div>
  );
}

export default App;
