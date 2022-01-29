import { Address } from "./address";
import { RegionResponse } from "./region.response";

export interface SchoolResponse {
    id: string;
    name: string;
    address: Address;
    region: RegionResponse;
}