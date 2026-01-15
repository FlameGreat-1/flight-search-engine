import { CURRENCY_SYMBOLS, DEFAULT_CURRENCY } from '@/types/currency';
import type { Currency } from '@/types';

export const convertPrice = (amount: number, rate: number): number => {
  return amount * rate;
};

export const formatCurrency = (
  amount: number,
  currencyCode: string = DEFAULT_CURRENCY,
  decimals?: number
): string => {
  const symbol = CURRENCY_SYMBOLS[currencyCode] || currencyCode;
  const decimalPlaces = decimals ?? getCurrencyDecimals(currencyCode);
  
  const formattedAmount = amount.toLocaleString('en-US', {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  });

  return `${symbol}${formattedAmount}`;
};

export const formatCurrencyWithDecimals = (
  amount: number,
  currency: string = DEFAULT_CURRENCY
): string => {
  return formatCurrency(amount, currency, 2);
};

export const formatCurrencyCompact = (
  amount: number,
  currency: string = DEFAULT_CURRENCY,
  showSymbol: boolean = true
): string => {
  const symbol = CURRENCY_SYMBOLS[currency] || currency;
  const formattedAmount = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.round(amount));

  return showSymbol ? `${symbol}${formattedAmount}` : formattedAmount;
};

export const getCurrencyDecimals = (currencyCode: string): number => {
  const zeroDecimalCurrencies = ['BIF', 'CLP', 'DJF', 'GNF', 'ISK', 'JPY', 'KMF', 'KRW', 'PYG', 'RWF', 'UGX', 'VND', 'VUV', 'XAF', 'XOF', 'XPF'];
  const threeDecimalCurrencies = ['BHD', 'IQD', 'JOD', 'KWD', 'LYD', 'OMR', 'TND'];

  if (zeroDecimalCurrencies.includes(currencyCode)) return 0;
  if (threeDecimalCurrencies.includes(currencyCode)) return 3;
  return 2;
};

export const getCurrencySymbol = (currencyCode: string): string => {
  return CURRENCY_SYMBOLS[currencyCode] || currencyCode;
};

export const parseCurrency = (value: string): number => {
  const cleaned = value.replace(/[^0-9.-]/g, '');
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
};

export const parseCurrencyAmount = (formattedAmount: string): number => {
  return parseCurrency(formattedAmount);
};

export const convertAndFormat = (
  amount: number,
  rate: number,
  currencyCode: string = DEFAULT_CURRENCY
): string => {
  const converted = convertPrice(amount, rate);
  return formatCurrency(converted, currencyCode);
};

export const getCurrencyInfo = (currencyCode: string): Currency => {
  return {
    code: currencyCode,
    name: getCurrencyName(currencyCode),
    symbol: getCurrencySymbol(currencyCode),
    decimals: getCurrencyDecimals(currencyCode),
  };
};

export const getCurrencyName = (currencyCode: string): string => {
  const currencyNames: Record<string, string> = {
    // Popular currencies
    USD: 'US Dollar',
    EUR: 'Euro',
    GBP: 'British Pound',
    JPY: 'Japanese Yen',
    CNY: 'Chinese Yuan',
    INR: 'Indian Rupee',
    AUD: 'Australian Dollar',
    CAD: 'Canadian Dollar',
    CHF: 'Swiss Franc',
    NZD: 'New Zealand Dollar',
    ZAR: 'South African Rand',
    BRL: 'Brazilian Real',
    RUB: 'Russian Ruble',
    KRW: 'South Korean Won',
    SGD: 'Singapore Dollar',
    HKD: 'Hong Kong Dollar',
    NOK: 'Norwegian Krone',
    SEK: 'Swedish Krona',
    DKK: 'Danish Krone',
    PLN: 'Polish Zloty',
    THB: 'Thai Baht',
    MXN: 'Mexican Peso',
    TRY: 'Turkish Lira',
    IDR: 'Indonesian Rupiah',
    MYR: 'Malaysian Ringgit',
    PHP: 'Philippine Peso',
    CZK: 'Czech Koruna',
    ILS: 'Israeli Shekel',
    CLP: 'Chilean Peso',
    AED: 'UAE Dirham',
    SAR: 'Saudi Riyal',
    NGN: 'Nigerian Naira',
    EGP: 'Egyptian Pound',
    PKR: 'Pakistani Rupee',
    VND: 'Vietnamese Dong',
    ARS: 'Argentine Peso',
    COP: 'Colombian Peso',
    PEN: 'Peruvian Sol',
    
    // Additional currencies (A-Z)
    AFN: 'Afghan Afghani',
    ALL: 'Albanian Lek',
    AMD: 'Armenian Dram',
    ANG: 'Netherlands Antillean Guilder',
    AOA: 'Angolan Kwanza',
    AWG: 'Aruban Florin',
    AZN: 'Azerbaijani Manat',
    BAM: 'Bosnia-Herzegovina Convertible Mark',
    BBD: 'Barbadian Dollar',
    BDT: 'Bangladeshi Taka',
    BGN: 'Bulgarian Lev',
    BHD: 'Bahraini Dinar',
    BIF: 'Burundian Franc',
    BMD: 'Bermudan Dollar',
    BND: 'Brunei Dollar',
    BOB: 'Bolivian Boliviano',
    BSD: 'Bahamian Dollar',
    BTN: 'Bhutanese Ngultrum',
    BWP: 'Botswanan Pula',
    BYN: 'Belarusian Ruble',
    BZD: 'Belize Dollar',
    CDF: 'Congolese Franc',
    CLF: 'Chilean Unit of Account',
    CNH: 'Chinese Yuan (Offshore)',
    CRC: 'Costa Rican Colón',
    CUP: 'Cuban Peso',
    CVE: 'Cape Verdean Escudo',
    DJF: 'Djiboutian Franc',
    DOP: 'Dominican Peso',
    DZD: 'Algerian Dinar',
    ERN: 'Eritrean Nakfa',
    ETB: 'Ethiopian Birr',
    FJD: 'Fijian Dollar',
    FKP: 'Falkland Islands Pound',
    FOK: 'Faroese Króna',
    GEL: 'Georgian Lari',
    GGP: 'Guernsey Pound',
    GHS: 'Ghanaian Cedi',
    GIP: 'Gibraltar Pound',
    GMD: 'Gambian Dalasi',
    GNF: 'Guinean Franc',
    GTQ: 'Guatemalan Quetzal',
    GYD: 'Guyanaese Dollar',
    HNL: 'Honduran Lempira',
    HRK: 'Croatian Kuna',
    HTG: 'Haitian Gourde',
    HUF: 'Hungarian Forint',
    IMP: 'Manx Pound',
    IQD: 'Iraqi Dinar',
    IRR: 'Iranian Rial',
    ISK: 'Icelandic Króna',
    JEP: 'Jersey Pound',
    JMD: 'Jamaican Dollar',
    JOD: 'Jordanian Dinar',
    KES: 'Kenyan Shilling',
    KGS: 'Kyrgystani Som',
    KHR: 'Cambodian Riel',
    KID: 'Kiribati Dollar',
    KMF: 'Comorian Franc',
    KWD: 'Kuwaiti Dinar',
    KYD: 'Cayman Islands Dollar',
    KZT: 'Kazakhstani Tenge',
    LAK: 'Laotian Kip',
    LBP: 'Lebanese Pound',
    LKR: 'Sri Lankan Rupee',
    LRD: 'Liberian Dollar',
    LSL: 'Lesotho Loti',
    LYD: 'Libyan Dinar',
    MAD: 'Moroccan Dirham',
    MDL: 'Moldovan Leu',
    MGA: 'Malagasy Ariary',
    MKD: 'Macedonian Denar',
    MMK: 'Myanma Kyat',
    MNT: 'Mongolian Tugrik',
    MOP: 'Macanese Pataca',
    MRU: 'Mauritanian Ouguiya',
    MUR: 'Mauritian Rupee',
    MVR: 'Maldivian Rufiyaa',
    MWK: 'Malawian Kwacha',
    MZN: 'Mozambican Metical',
    NAD: 'Namibian Dollar',
    NIO: 'Nicaraguan Córdoba',
    NPR: 'Nepalese Rupee',
    OMR: 'Omani Rial',
    PAB: 'Panamanian Balboa',
    PGK: 'Papua New Guinean Kina',
    PYG: 'Paraguayan Guarani',
    QAR: 'Qatari Rial',
    RON: 'Romanian Leu',
    RSD: 'Serbian Dinar',
    RWF: 'Rwandan Franc',
    SBD: 'Solomon Islands Dollar',
    SCR: 'Seychellois Rupee',
    SDG: 'Sudanese Pound',
    SHP: 'Saint Helena Pound',
    SLE: 'Sierra Leonean Leone',
    SLL: 'Sierra Leonean Leone (Old)',
    SOS: 'Somali Shilling',
    SRD: 'Surinamese Dollar',
    SSP: 'South Sudanese Pound',
    STN: 'São Tomé and Príncipe Dobra',
    SYP: 'Syrian Pound',
    SZL: 'Swazi Lilangeni',
    TJS: 'Tajikistani Somoni',
    TMT: 'Turkmenistani Manat',
    TND: 'Tunisian Dinar',
    TOP: 'Tongan Paʻanga',
    TTD: 'Trinidad and Tobago Dollar',
    TVD: 'Tuvaluan Dollar',
    TWD: 'New Taiwan Dollar',
    TZS: 'Tanzanian Shilling',
    UAH: 'Ukrainian Hryvnia',
    UGX: 'Ugandan Shilling',
    UYU: 'Uruguayan Peso',
    UZS: 'Uzbekistan Som',
    VES: 'Venezuelan Bolívar',
    VUV: 'Vanuatu Vatu',
    WST: 'Samoan Tala',
    XAF: 'Central African CFA Franc',
    XCD: 'East Caribbean Dollar',
    XCG: 'Caribbean Guilder',
    XDR: 'Special Drawing Rights',
    XOF: 'West African CFA Franc',
    XPF: 'CFP Franc',
    YER: 'Yemeni Rial',
    ZMW: 'Zambian Kwacha',
    ZWG: 'Zimbabwean Gold',
    ZWL: 'Zimbabwean Dollar',
  };

  return currencyNames[currencyCode] || currencyCode;
};

export const roundToDecimals = (amount: number, decimals: number): number => {
  const multiplier = Math.pow(10, decimals);
  return Math.round(amount * multiplier) / multiplier;
};

export const formatPriceRange = (
  min: number,
  max: number,
  currency: string = DEFAULT_CURRENCY
): string => {
  if (min === max) {
    return formatCurrency(min, currency);
  }
  return `${formatCurrency(min, currency)} - ${formatCurrency(max, currency)}`;
};

export const calculatePricePerPerson = (totalPrice: number, passengers: number): number => {
  return passengers > 0 ? totalPrice / passengers : totalPrice;
};

export const formatCompactCurrency = (
  amount: number,
  currency: string = DEFAULT_CURRENCY
): string => {
  const symbol = CURRENCY_SYMBOLS[currency] || currency;

  if (amount >= 1000000) {
    return `${symbol}${(amount / 1000000).toFixed(1)}M`;
  }
  if (amount >= 1000) {
    return `${symbol}${(amount / 1000).toFixed(1)}K`;
  }
  return formatCurrency(amount, currency);
};

export const calculateDiscount = (originalPrice: number, discountedPrice: number): number => {
  if (originalPrice <= 0) return 0;
  return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
};

export const formatDiscountPercentage = (
  originalPrice: number,
  discountedPrice: number
): string => {
  const discount = calculateDiscount(originalPrice, discountedPrice);
  return discount > 0 ? `${discount}% off` : '';
};
