const { Harmony } = require('@harmony-js/core');
const { ChainType } = require('@harmony-js/utils');

export default new Harmony(
  // let's assume we deploy smart contract to this end-point URL
  'https://api.s0.b.hmny.io',
  {
    chainType: ChainType.Harmony,
    chainId: Number(process.env.HMY_CHAIN_ID),
  },
);
