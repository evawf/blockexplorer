import { Alchemy, Network } from "alchemy-sdk";
import { useEffect, useState } from "react";
import moment from "moment";

import "./App.css";

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

function App() {
  const [blockNumber, setBlockNumber] = useState();
  const [blockInfo, setBlockInfo] = useState([]);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    async function getBlockNumber() {
      setBlockNumber(await alchemy.core.getBlockNumber());
    }

    getBlockNumber();

    async function getTransactions() {
      const block = await alchemy.core.getBlock("latest");

      const blockInfo = await alchemy.core.getBlockWithTransactions(block.hash);
      setBlockInfo(blockInfo);
      setTransactions(blockInfo.transactions);
    }

    getTransactions();
  }, [blockNumber]);

  console.log(blockInfo);
  console.log(transactions);

  return (
    <div className="App">
      <h1>Block Number: {blockNumber}</h1>
      <section>
        <table>
          <tr>
            <th style={{ width: "200px" }}>Block</th>
            <th style={{ width: "200px" }}>Age</th>
            <th style={{ width: "200px" }}>Gas Used</th>
            <th style={{ width: "200px" }}>Gas Limit</th>
            <th style={{ width: "200px" }}>Transactions</th>
          </tr>
          <tr>
            <td>{blockNumber}</td>
            <td>{moment().startOf("hour").fromNow()}</td>
            <td>{Number(blockInfo.gasUsed)}</td>
            <td>{Number(blockInfo.gasLimit)}</td>
            <td>{blockInfo.transactions.length}</td>
          </tr>
        </table>
      </section>
    </div>
  );
}

export default App;
