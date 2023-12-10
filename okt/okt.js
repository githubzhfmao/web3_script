const Web3 = require("web3");
// const web3 = new Web3("https://api.avax.network/ext/bc/C/rpc");
const provider = new Web3.providers.HttpProvider(
  "https://oktc-mainnet.public.blastapi.io"
);
const web3 = new Web3(provider);
const accounts = [
  {
    address: "",
    privateKey: "",
  },
];
//okts 的 data
const hexData =
  "0x646174613a2c7b2270223a227872632d3230222c226f70223a226d696e74222c227469636b223a226f6b7473222c22616d74223a2231303030227d";
//打哪个地址
const toAddress = "";
let num = 0;
let runNum = 0;
const st = new Date().getTime();
console.log("accounts number", accounts.length, st);
for (const account of accounts) {
  runner(account.address, account.privateKey);
}

async function runner(sender, privateKey) {
  const balance = web3.utils.fromWei(
    await web3.eth.getBalance(sender),
    "ether"
  );
  console.log(
    num++,
    web3.eth.accounts.privateKeyToAccount(privateKey).address,
    balance
  );

  //   const contract = new Contract(account, "inscription.near", {
  //     changeMethods: ["inscribe"],
  //   });

  const sendTransaction = async (nonce, privateKey) => {
    try {
      //   const gasPrice = await web3.eth.getGasPrice();
      const balance = web3.utils.fromWei(
        await web3.eth.getBalance(sender),
        "ether"
      );

      const from = web3.eth.accounts.privateKeyToAccount(privateKey).address;
      //   const gasPrice = await web3.eth.getGasPrice();
      const gasPrice = parseInt(await web3.eth.getGasPrice()) * 1.2 + "";
      //   console.log(
      //     from,
      //     "sendTransaction nonce",
      //     nonce,
      //     "gasPrice",
      //     gasPrice,
      //     gasPrice > 50097311320
      //   );
      console.log(
        web3.eth.accounts.privateKeyToAccount(privateKey).address,
        balance,
        "gasPrice",
        gasPrice,
        "nonce",
        nonce
      );
      const transactionObject = {
        from: from,
        to: toAddress,
        value: "0", // 设置为 0，因为这是一笔数据交易，而不是转账
        data: hexData,
        gas: 60896,
        gasPrice: gasPrice,
        nonce,
      };
      const signedTransaction = await web3.eth.accounts.signTransaction(
        transactionObject,
        privateKey
      );
      // 发送签名交易
      const receipt = await web3.eth.sendSignedTransaction(
        signedTransaction.rawTransaction
      );
      console.log("res sucess", runNum++);
    } catch (error) {
      //   console.error(sender, "error:", error.message || error);
    }
  };
  // 执行11次交易 打不死就往死里打
  const batchRes = [0, 1, 2, 3, 4, 5, 6, 4, 5, 6, 7, 8, 9, 10]; //
  const runsend = async () => {
    let nonce = await web3.eth.getTransactionCount(sender);
    for (let i = 0; i < batchRes.length; i++) {
      sendTransaction(nonce + batchRes[i], privateKey);
    }
    setTimeout(() => {
      runsend();
    }, 6000);
  };
  runsend();
}
// runner();