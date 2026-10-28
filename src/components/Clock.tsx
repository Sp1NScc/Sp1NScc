import { useClock } from "../hooks/useSite";

export function Clock() {
  const time = useClock();
  return <span className="clock">{time}</span>;
}
