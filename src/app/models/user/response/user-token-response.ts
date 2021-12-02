import { TokenResponse } from "./token-response";
import { UserResponse } from "./user-response";

export interface UserTokenResponse {
    user: UserResponse;
    token: TokenResponse;
}

