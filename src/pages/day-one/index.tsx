import Solution from '@/components/solution';
import { input } from './constants';

export default function Page() {
  return (
    <Solution
      name="Day 1: Historian Hysteria"
      url="day-one"
      defaultValue={input}
    />
  );
}
