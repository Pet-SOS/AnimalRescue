import { getJwt } from "../helpers/jwt";

export function guardLogin (to:any, from:any, next:any){
    if (getJwt()) {
        next();
      }
      next.redirect(`${to.location.state}/signIn`);
}