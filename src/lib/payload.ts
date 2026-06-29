import "server-only";
import config from "@payload-config";
import { getPayload, type Payload } from "payload";

// Payload's getPayload already caches the instance internally (keyed by config)
// and handles HMR teardown in dev. Don't wrap it in our own global cache — doing
// so pins a stale instance that gets destroyed across Fast Refresh, which then
// throws "payload.find is not a function".
export function getPayloadClient(): Promise<Payload> {
  return getPayload({ config });
}
