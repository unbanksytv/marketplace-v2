import { arbitrum, mainnet, polygon, optimism, Chain, bsc } from 'wagmi/chains'

//Chains that are missing from wagmi:
export const zora = {
  id: 7777777,
  name: 'ZORA',
  network: 'zora',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://rpc.zora.co'],
      webSocket: ['wss://rpc.zora.co'],
    },
    public: {
      http: ['https://rpc.zora.co'],
      webSocket: ['wss://rpc.zora.co'],
    },
  },
  blockExplorers: {
    etherscan: {
      name: 'ZORA',
      url: 'https://explorer.zora.energy',
    },
    default: {
      name: 'ZORA',
      url: 'https://explorer.zora.energy',
    },
  },
} as const satisfies Chain

//CONFIGURABLE: The default export controls the supported chains for the marketplace. Removing
// or adding chains will result in adding more or less chains to the marketplace.
// They are an extension of the wagmi chain objects

type ReservoirChain = Chain & {
  lightIconUrl: string
  darkIconUrl: string
  reservoirBaseUrl: string
  proxyApi: string
  routePrefix: string
  apiKey?: string
  coingeckoId?: string
  collectionSetId?: string
  community?: string
}

export const DefaultChain: ReservoirChain = {
  ...mainnet,
  // Any url to display the logo of the chain in light mode
  lightIconUrl: '/icons/eth-icon-dark.svg',
  // Any url to display the logo of the chain in dark mode
  darkIconUrl: '/icons/eth-icon-light.svg',
  // The base url of the reservoir api, this is used in the app when
  // directly interacting with the reservoir indexer servers (in the api proxy for example)
  // or when prefetching server side rendered data
  reservoirBaseUrl: 'https://api.reservoir.tools',
  // Used on the client side portions of the marketplace that need an api key added
  // Prevents the api key from being leaked in the clientside requests
  // If you'd like to disable proxying you can just change the proxyApi to the reservoirBaseUrl
  // Doing so will omit the api key unless further changes are made
  proxyApi: '/api/reservoir/ethereum',
  // A prefix used in the asset specific routes on the app (tokens/collections)
  routePrefix: 'ethereum',
  // Reservoir API key which you can generate at https://reservoir.tools/
  // This is a protected key and displays as 'undefined' on the browser
  // DO NOT add NEXT_PUBLIC to the key or you'll risk leaking it on the browser
  apiKey: process.env.ETH_RESERVOIR_API_KEY,
  // Coingecko id, used to convert the chain's native prices to usd. Can be found here:
  // https://www.coingecko.com/en/api/documentation#operations-coins-get_coins_list
  coingeckoId: 'ethereum',
  collectionSetId: process.env.NEXT_PUBLIC_ETH_COLLECTION_SET_ID,
  community: process.env.NEXT_PUBLIC_ETH_COMMUNITY,
}

export default [
  DefaultChain,
  {
    ...polygon,
    lightIconUrl: '/icons/polygon-icon-dark.svg',
    darkIconUrl: '/icons/polygon-icon-light.svg',
    reservoirBaseUrl: 'https://api-polygon.reservoir.tools',
    proxyApi: '/api/reservoir/polygon',
    routePrefix: 'polygon',
    apiKey: process.env.POLYGON_RESERVOIR_API_KEY,
    coingeckoId: 'matic-network',
    collectionSetId: process.env.NEXT_PUBLIC_POLYGON_COLLECTION_SET_ID,
    community: process.env.NEXT_PUBLIC_POLYGON_COMMUNITY,
  },
  {
    ...arbitrum,
    name: 'Arbitrum',
    lightIconUrl: '/icons/arbitrum-icon-dark.svg',
    darkIconUrl: '/icons/arbitrum-icon-light.svg',
    reservoirBaseUrl: 'https://api-arbitrum.reservoir.tools',
    proxyApi: '/api/reservoir/arbitrum',
    routePrefix: 'arbitrum',
    apiKey: process.env.ARBITRUM_RESERVOIR_API_KEY,
    coingeckoId: 'arbitrum-iou',
    collectionSetId: process.env.NEXT_PUBLIC_ARBITRUM_COLLECTION_SET_ID,
    community: process.env.NEXT_PUBLIC_ARBITRUM_COMMUNITY,
  },
  {
    ...optimism,
    name: 'Optimism',
    lightIconUrl: '/icons/optimism-icon-dark.svg',
    darkIconUrl: '/icons/optimism-icon-light.svg',
    reservoirBaseUrl: 'https://api-optimism.reservoir.tools',
    proxyApi: '/api/reservoir/optimism',
    routePrefix: 'optimism',
    apiKey: process.env.OPTIMISM_RESERVOIR_API_KEY,
    coingeckoId: 'optimism',
    collectionSetId: process.env.NEXT_PUBLIC_OPTIMISM_COLLECTION_SET_ID,
    community: process.env.NEXT_PUBLIC_OPTIMISM_COMMUNITY,
  },
  {
    ...zora,
    name: 'Zora',
    lightIconUrl: '/icons/zora-icon-dark.svg',
    darkIconUrl: '/icons/zora-icon-light.svg',
    reservoirBaseUrl: 'https://api-zora.reservoir.tools',
    proxyApi: '/api/reservoir/zora',
    routePrefix: 'zora',
    apiKey: process.env.ZORA_RESERVOIR_API_KEY,
    coingeckoId: 'ethereum',
  },
  {
    ...bsc,
    lightIconUrl: '/icons/bsc-icon-dark.svg',
    darkIconUrl: '/icons/bsc-icon-light.svg',
    reservoirBaseUrl: 'https://api-bsc.reservoir.tools',
    proxyApi: '/api/reservoir/bsc',
    routePrefix: 'bsc',
    apiKey: process.env.BSC_RESERVOIR_API_KEY,
    coingeckoId: 'binancecoin',
    collectionSetId: process.env.NEXT_PUBLIC_BSC_COLLECTION_SET_ID,
    community: process.env.NEXT_PUBLIC_BSC_COMMUNITY,
  },
] as ReservoirChain[]
