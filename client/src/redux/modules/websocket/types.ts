import {CreateAction} from '../../helpers/helperTypes';
import {
  WEBSOCKET_BROKEN,
  WEBSOCKET_CLOSED,
  WEBSOCKET_CONNECT,
  WEBSOCKET_DISCONNECT,
  WEBSOCKET_MESSAGE,
  WEBSOCKET_OPEN,
  WEBSOCKET_SEND,
  WEBSOCKET_ERROR,
} from '@giantmachines/redux-websocket';
export const FETCH_ORDERS = 'websocket/FETCH_ORDERS';
const WEBSOCKET_PREFIX = 'REDUX_WEBSOCKET';
export const REDUX_WEBSOCKET_BROKEN = `${WEBSOCKET_PREFIX}::${WEBSOCKET_BROKEN}`;
export const REDUX_WEBSOCKET_OPEN = `${WEBSOCKET_PREFIX}::${WEBSOCKET_OPEN}`;
export const REDUX_WEBSOCKET_CLOSED = `${WEBSOCKET_PREFIX}::${WEBSOCKET_CLOSED}`;
export const REDUX_WEBSOCKET_MESSAGE = `${WEBSOCKET_PREFIX}::${WEBSOCKET_MESSAGE}`;
export const REDUX_WEBSOCKET_CONNECT = `${WEBSOCKET_PREFIX}::${WEBSOCKET_CONNECT}`;
export const REDUX_WEBSOCKET_DISCONNECT = `${WEBSOCKET_PREFIX}::${WEBSOCKET_DISCONNECT}`;
export const REDUX_WEBSOCKET_SEND = `${WEBSOCKET_PREFIX}::${WEBSOCKET_SEND}`;
export const REDUX_WEBSOCKET_ERROR = `${WEBSOCKET_PREFIX}::${WEBSOCKET_ERROR}`;

export type WebsocketActions = CreateAction<typeof FETCH_ORDERS, any>;

export type ReduxWebsocketMessage = CreateAction<typeof REDUX_WEBSOCKET_MESSAGE, any>;

export interface WebsocketState extends Tables {
  __keys: Keys;
  connected: boolean;
  wsLoading: boolean;
  message?: string;
  error: string;
}

export enum RESPONSE_ACTIONS {
  PARTIAL = 'partial',
  UPDATE = 'update',
  INSERT = 'insert',
  DELETE = 'delete',
}

export interface Tables {
  instrument: Instrument[];
  order: Order[];
}

export type TableData = Instrument | Order;

type Keys = {[key in keyof Tables]?: (keyof Tables)[]};

interface WebsocketResponseData {
  // Table name / Subscription topic.
  // Could be "trade", "order", "instrument", etc.
  table: keyof Tables;
  // The type of the message. Types:
  // 'partial'; This is a table image, replace your data entirely.
  // 'update': Update a single row.
  // 'insert': Insert a new row.
  // 'delete': Delete a row.
  action: RESPONSE_ACTIONS;
  // An array of table rows is emitted here. They are identical in structure to data returned from the REST API.
  data: Record<string, keyof Tables>[]; //object[]
  //
  // The below fields define the table and are only sent on a `partial`
  //
  // Attribute names that are guaranteed to be unique per object.
  // If more than one is provided, the key is composite.
  // Use these key names to uniquely identify rows. Key columns are guaranteed
  // to be present on all data received.
  keys?: string[];
  // This lists key relationships with other tables.
  // For example, `quote`'s foreign key is {"symbol": "instrument"}
  foreignKeys?: iterobject;
  // This lists the shape of the table. The possible types:
  // "symbol" - In most languages this is equal to "string"
  // "guid"
  // "timestamp"
  // "timespan"
  // "float"
  // "long"
  // "integer"
  // "boolean"
  types?: iterobject;
  // When multiple subscriptions are active to the same table, use the `filter` to correlate which datagram
  // belongs to which subscription, as the `table` property will not contain the subscription's symbol.
  filter?: {account?: number; symbol?: string};
  // These are internal fields that indicate how responses are sorted and grouped.
  attributes?: iterobject;
}

interface WebsocketResponseSuccess {
  subscribe: keyof Tables;
  unsubscribe: keyof Tables;
  success: boolean;
}

interface WebsocketResponseError {
  error: string;
}

export type WebsocketResponse = WebsocketResponseData & WebsocketResponseSuccess & WebsocketResponseError;

export interface Instrument {
  symbol: string;
  rootSymbol: string;
  state: string;
  typ: string;
  listing: any;
  front: any;
  expiry: any;
  settle: any;
  relistInterval: any;
  inverseLeg: string;
  sellLeg: string;
  buyLeg: string;
  optionStrikePcnt: number;
  optionStrikeRound: number;
  optionStrikePrice: number;
  optionMultiplier: number;
  positionCurrency: string;
  underlying: string;
  quoteCurrency: string;
  underlyingSymbol: string;
  reference: string;
  referenceSymbol: string;
  calcInterval: any;
  publishInterval: any;
  publishTime: any;
  maxOrderQty: number;
  maxPrice: number;
  lotSize: number;
  tickSize: number;
  multiplier: number;
  settlCurrency: string;
  underlyingToPositionMultiplier: number;
  underlyingToSettleMultiplier: number;
  quoteToSettleMultiplier: number;
  isQuanto: true;
  isInverse: true;
  initMargin: number;
  maintMargin: number;
  riskLimit: number;
  riskStep: number;
  limit: number;
  capped: true;
  taxed: true;
  deleverage: true;
  makerFee: number;
  takerFee: number;
  settlementFee: number;
  insuranceFee: number;
  fundingBaseSymbol: string;
  fundingQuoteSymbol: string;
  fundingPremiumSymbol: string;
  fundingTimestamp: any;
  fundingInterval: any;
  fundingRate: number;
  indicativeFundingRate: number;
  rebalanceTimestamp: any;
  rebalanceInterval: any;
  openingTimestamp: any;
  closingTimestamp: any;
  sessionInterval: any;
  prevClosePrice: number;
  limitDownPrice: number;
  limitUpPrice: number;
  bankruptLimitDownPrice: number;
  bankruptLimitUpPrice: number;
  prevTotalVolume: number;
  totalVolume: number;
  volume: number;
  volume24h: number;
  prevTotalTurnover: number;
  totalTurnover: number;
  turnover: number;
  turnover24h: number;
  homeNotional24h: number;
  foreignNotional24h: number;
  prevPrice24h: number;
  vwap: number;
  highPrice: number;
  lowPrice: number;
  lastPrice: number;
  lastPriceProtected: number;
  lastTickDirection: string;
  lastChangePcnt: number;
  bidPrice: number;
  midPrice: number;
  askPrice: number;
  impactBidPrice: number;
  impactMidPrice: number;
  impactAskPrice: number;
  hasLiquidity: true;
  openInterest: number;
  openValue: number;
  fairMethod: string;
  fairBasisRate: number;
  fairBasis: number;
  fairPrice: number;
  markMethod: string;
  markPrice: number;
  indicativeTaxRate: number;
  indicativeSettlePrice: number;
  optionUnderlyingPrice: number;
  settledPrice: number;
  timestamp: any;
}

export interface Order {
  orderID: string;
  clOrdID: string;
  clOrdLinkID: string;
  account: number;
  symbol: string;
  side: string;
  simpleOrderQty: number;
  orderQty: number;
  price: number;
  displayQty: number;
  stopPx: number;
  pegOffsetValue: number;
  pegPriceType: string;
  currency: string;
  settlCurrency: string;
  ordType: string;
  timeInForce: string;
  execInst: string;
  contingencyType: string;
  exDestination: string;
  ordStatus: string;
  triggered: string;
  workingIndicator: true;
  ordRejReason: string;
  simpleLeavesQty: number;
  leavesQty: number;
  simpleCumQty: number;
  cumQty: number;
  avgPx: number;
  multiLegReportingType: string;
  text: string;
  transactTime: string;
  timestamp: string;
}
