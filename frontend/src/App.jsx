
import WalletCard from './WalletCard';
import BlockChainMessage from './BlockChainMessage';

//=====================================
function App() {
  return (
    <div style={{ fontFamily: 'sans-serif', padding: '2rem', backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
      <div style={{ maxWidth: '500px', margin: 'auto', backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        <WalletCard /> 
        <BlockChainMessage />
      </div>
    </div>
  );
}

export default App;