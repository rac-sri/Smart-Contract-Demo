const { Harmony } = require('@harmony-js/core');
const { ChainType } = require('@harmony-js/utils');

export default new Harmony(
  // let's assume we deploy smart contract to this end-point URL
  process.env.HMY_NODE_URL,
  {
    chainType: ChainType.Harmony,
    chainId: Number(process.env.HMY_CHAIN_ID),
  },
);
