export interface AmadeusAuthRequest {
  grant_type: 'client_credentials';
  client_id: string;
  client_secret: string;
}

export interface AmadeusAuthResponse {
  type: string;
  username: string;
  application_name: string;
  client_id: string;
  token_type: string;
  access_token: string;
  expires_in: number;
  state: string;
}

export interface AmadeusFlightSearchRequest {
  originLocationCode: string;
  destinationLocationCode: string;
  departureDate: string;
  returnDate?: string;
  adults: number;
  children?: number;
  infants?: number;
  travelClass?: 'ECONOMY' | 'PREMIUM_ECONOMY' | 'BUSINESS' | 'FIRST';
  nonStop?: boolean;
  currencyCode?: string;
  maxPrice?: number;
  max?: number;
}

export interface AmadeusLocationSearchRequest {
  keyword: string;
  subType?: 'AIRPORT' | 'CITY';
  page?: {
    limit?: number;
    offset?: number;
  };
}

export interface AmadeusError {
  status: number;
  code: number;
  title: string;
  detail: string;
  source?: {
    parameter?: string;
    pointer?: string;
    example?: string;
  };
}

export interface AmadeusErrorResponse {
  errors: AmadeusError[];
}

export interface AmadeusSegment {
  departure: {
    iataCode: string;
    terminal?: string;
    at: string;
  };
  arrival: {
    iataCode: string;
    terminal?: string;
    at: string;
  };
  carrierCode: string;
  number: string;
  aircraft: {
    code: string;
  };
  operating?: {
    carrierCode: string;
  };
  duration: string;
  id: string;
  numberOfStops: number;
  blacklistedInEU: boolean;
}

export interface AmadeusItinerary {
  duration: string;
  segments: AmadeusSegment[];
}

export interface AmadeusTravelerPricing {
  travelerId: string;
  fareOption: string;
  travelerType: 'ADULT' | 'CHILD' | 'HELD_INFANT' | 'SEATED_INFANT' | 'SENIOR';
  price: {
    currency: string;
    total: string;
    base: string;
  };
  fareDetailsBySegment: Array<{
    segmentId: string;
    cabin: 'ECONOMY' | 'PREMIUM_ECONOMY' | 'BUSINESS' | 'FIRST';
    fareBasis: string;
    brandedFare?: string;
    class: string;
    includedCheckedBags: {
      quantity: number;
    };
  }>;
}

export interface AmadeusFlightOffer {
  type: string;
  id: string;
  source: string;
  instantTicketingRequired: boolean;
  nonHomogeneous: boolean;
  oneWay: boolean;
  lastTicketingDate: string;
  numberOfBookableSeats: number;
  itineraries: AmadeusItinerary[];
  price: {
    currency: string;
    total: string;
    base: string;
    fees: Array<{
      amount: string;
      type: string;
    }>;
    grandTotal: string;
  };
  pricingOptions: {
    fareType: string[];
    includedCheckedBagsOnly: boolean;
  };
  validatingAirlineCodes: string[];
  travelerPricings: AmadeusTravelerPricing[];
}

export interface AmadeusFlightOffersResponse {
  meta: {
    count: number;
    links?: {
      self: string;
    };
  };
  data: AmadeusFlightOffer[];
  dictionaries: {
    locations: Record<
      string,
      {
        cityCode: string;
        countryCode: string;
      }
    >;
    aircraft: Record<string, string>;
    currencies: Record<string, string>;
    carriers: Record<string, string>;
  };
}

export interface AmadeusLocation {
  type: string;
  subType: 'AIRPORT' | 'CITY';
  name: string;
  detailedName: string;
  id: string;
  self: {
    href: string;
    methods: string[];
  };
  timeZoneOffset: string;
  iataCode: string;
  geoCode: {
    latitude: number;
    longitude: number;
  };
  address: {
    cityName: string;
    cityCode: string;
    countryName: string;
    countryCode: string;
    regionCode: string;
  };
  analytics: {
    travelers: {
      score: number;
    };
  };
}

export interface AmadeusLocationResponse {
  meta: {
    count: number;
    links: {
      self: string;
    };
  };
  data: AmadeusLocation[];
}
