export interface Currency {
  code: string;
  name: string;
  symbol: string;
  decimals: number;
}

export interface ExchangeRates {
  base: string;
  rates: Record<string, number>;
  timestamp: number;
}

export interface CurrencyState {
  selectedCurrency: string;
  exchangeRates: ExchangeRates | null;
  isLoading: boolean;
  error: string | null;
  lastUpdated: number | null;
}

export interface LocationData {
  country_code: string;
  country_name: string;
  currency: string;
}

export const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: '$', EUR: '€', GBP: '£', JPY: '¥', CNY: '¥', INR: '₹', AUD: 'A$', CAD: 'C$',
  CHF: 'CHF', NZD: 'NZ$', ZAR: 'R', BRL: 'R$', RUB: '₽', KRW: '₩', SGD: 'S$',
  HKD: 'HK$', NOK: 'kr', SEK: 'kr', DKK: 'kr', PLN: 'zł', THB: '฿', MXN: '$',
  TRY: '₺', IDR: 'Rp', MYR: 'RM', PHP: '₱', CZK: 'Kč', ILS: '₪', CLP: '$',
  AED: 'د.إ', SAR: 'ر.س', NGN: '₦', EGP: '£', PKR: '₨', VND: '₫', ARS: '$',
  COP: '$', PEN: 'S/', UAH: '₴', KES: 'KSh', GHS: '₵', MAD: 'د.م.', RON: 'lei',
  HUF: 'Ft', BGN: 'лв', HRK: 'kn', ISK: 'kr', QAR: 'ر.ق', KWD: 'د.ك', BHD: '.د.ب',
  OMR: 'ر.ع.', JOD: 'د.ا', LBP: 'ل.ل', TND: 'د.ت', DZD: 'د.ج', LYD: 'ل.د',
  IQD: 'ع.د', IRR: '﷼', AFN: '؋', AMD: '֏', AZN: '₼', GEL: '₾', KZT: '₸',
  UZS: 'so\'m', TJS: 'ЅМ', TMT: 'm', KGS: 'с', BDT: '৳', LKR: 'Rs', NPR: '₨',
  MMK: 'K', LAK: '₭', KHR: '៛', MNT: '₮', BND: '$', FJD: '$', PGK: 'K',
  TOP: 'T$', WST: 'T', VUV: 'Vt', XPF: '₣', XOF: 'CFA', XAF: 'FCFA', CDF: 'FC',
  AOA: 'Kz', MZN: 'MT', ZMW: 'ZK', BWP: 'P', NAD: '$', SZL: 'L', LSL: 'L',
  MWK: 'MK', MGA: 'Ar', MUR: '₨', SCR: '₨', RWF: 'FRw', UGX: 'USh', TZS: 'TSh',
  ETB: 'Br', SOS: 'Sh', DJF: 'Fdj', ERN: 'Nfk', SDG: 'ج.س.', SSP: '£', GMD: 'D',
  GNF: 'FG', LRD: '$', SLL: 'Le', CVE: '$', STN: 'Db', BIF: 'FBu', KMF: 'CF',
  MRU: 'UM', SBD: '$', PYG: '₲', BOB: 'Bs.', VES: 'Bs.', GYD: '$', HTG: 'G',
  JMD: 'J$', TTD: 'TT$', BBD: '$', BSD: '$', BZD: 'BZ$', NIO: 'C$', CRC: '₡',
  GTQ: 'Q', HNL: 'L', PAB: 'B/.', DOP: 'RD$', CUP: '₱', AWG: 'ƒ', ANG: 'ƒ',
  SRD: '$', BMD: '$', KYD: '$', FKP: '£', GIP: '£', SHP: '£', JEP: '£', GGP: '£',
  IMP: '£', TVD: '$', NRU: '$', KID: '$', XCD: '$'
};

export const DEFAULT_CURRENCY = 'USD';
export const CACHE_DURATION = 24 * 60 * 60 * 1000;
