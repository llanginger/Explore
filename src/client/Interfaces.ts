import { Reducers } from "./Store"
import { Store } from "redux"

export interface Venue {
  name: string;
  lat: number;
  lng: number;
  id: string;
  photoSrc?: string[];
  reviews?: string[];
  rating: number;
}

export interface BaseReduxProps {
  store: Store<Reducers>
}