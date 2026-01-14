import type {
  AmadeusFlightOffer,
  AmadeusFlightOffersResponse,
  AmadeusLocation,
  AmadeusSegment,
  AmadeusItinerary,
} from './types';
import type { Flight, Airport, FlightSegment, Itinerary } from '@/types';
import { parseDuration } from '@/utils/duration';

export const transformAmadeusLocation = (location: AmadeusLocation): Airport => {
  return {
    iataCode: location.iataCode,
    name: location.name,
    cityName: location.address.cityName,
    cityCode: location.address.cityCode,
    countryName: location.address.countryName,
    countryCode: location.address.countryCode,
  };
};

export const transformAmadeusSegment = (
  segment: AmadeusSegment,
  carriers: Record<string, string>,
  aircraft: Record<string, string>
): FlightSegment => {
  return {
    id: segment.id,
    departure: {
      iataCode: segment.departure.iataCode,
      terminal: segment.departure.terminal,
      at: new Date(segment.departure.at),
    },
    arrival: {
      iataCode: segment.arrival.iataCode,
      terminal: segment.arrival.terminal,
      at: new Date(segment.arrival.at),
    },
    carrierCode: segment.carrierCode,
    carrierName: carriers[segment.carrierCode] || segment.carrierCode,
    flightNumber: segment.number,
    aircraft: aircraft[segment.aircraft.code] || segment.aircraft.code,
    duration: parseDuration(segment.duration),
    numberOfStops: segment.numberOfStops,
  };
};

export const transformAmadeusItinerary = (
  itinerary: AmadeusItinerary,
  carriers: Record<string, string>,
  aircraft: Record<string, string>
): Itinerary => {
  const segments = itinerary.segments.map((segment) =>
    transformAmadeusSegment(segment, carriers, aircraft)
  );

  const departureTime = segments[0].departure.at;
  const arrivalTime = segments[segments.length - 1].arrival.at;
  const totalStops = segments.reduce((sum, seg) => sum + seg.numberOfStops, 0);

  return {
    duration: parseDuration(itinerary.duration),
    segments,
    departureTime,
    arrivalTime,
    totalStops,
  };
};

export const transformAmadeusFlightOffer = (
  offer: AmadeusFlightOffer,
  dictionaries: AmadeusFlightOffersResponse['dictionaries']
): Flight => {
  const itineraries = offer.itineraries.map((itinerary) =>
    transformAmadeusItinerary(itinerary, dictionaries.carriers, dictionaries.aircraft)
  );

  const totalPrice = parseFloat(offer.price.total);
  const basePrice = parseFloat(offer.price.base);
  const fees = offer.price.fees.reduce((sum, fee) => sum + parseFloat(fee.amount), 0);

  const totalAdults = offer.travelerPricings.filter((t) => t.travelerType === 'ADULT').length;
  const perAdult = totalAdults > 0 ? totalPrice / totalAdults : totalPrice;

  const cabinClass =
    offer.travelerPricings[0]?.fareDetailsBySegment[0]?.cabin || 'ECONOMY';

  const departureDate = itineraries[0].departureTime;
  const arrivalDate = itineraries[itineraries.length - 1].arrivalTime;

  const totalDuration = itineraries.reduce((sum, itinerary) => sum + itinerary.duration, 0);
  const totalStops = itineraries.reduce((sum, itinerary) => sum + itinerary.totalStops, 0);

  const airlines = Array.from(
    new Set(
      itineraries.flatMap((itinerary) =>
        itinerary.segments.map((segment) => segment.carrierName)
      )
    )
  );

  return {
    id: offer.id,
    itineraries,
    price: {
      currency: offer.price.currency,
      total: totalPrice,
      base: basePrice,
      fees,
      perAdult,
    },
    validatingAirlineCodes: offer.validatingAirlineCodes,
    numberOfBookableSeats: offer.numberOfBookableSeats,
    instantTicketingRequired: offer.instantTicketingRequired,
    cabinClass,
    departureDate,
    arrivalDate,
    totalDuration,
    totalStops,
    airlines,
  };
};

export const transformFlightOffersResponse = (
  response: AmadeusFlightOffersResponse
): Flight[] => {
  return response.data.map((offer) => transformAmadeusFlightOffer(offer, response.dictionaries));
};

export const transformAirportSearchResponse = (locations: AmadeusLocation[]): Airport[] => {
  return locations.map(transformAmadeusLocation);
};
