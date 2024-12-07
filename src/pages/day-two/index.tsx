import Solution from '@/components/solution';
import { input } from './constants';

export default function Page() {
  return (
    <Solution
      name="Day 2: Red-Nosed Reports"
      url="day-two"
      defaultValue={input}
    />
  );
}
