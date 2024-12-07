import Link from 'next/link';

export default function Nav() {
  return (
    <div className="navbar bg-base-100 rounded-box">
      <Link className="btn btn-ghost text-xl" href="/day-one">
        Day 1
      </Link>
      <Link className="btn btn-ghost text-xl" href="/day-two">
        Day 2
      </Link>
      <Link className="btn btn-ghost text-xl" href="/day-three">
        Day 3
      </Link>
      <Link className="btn btn-ghost text-xl" href="/day-four">
        Day 4
      </Link>
    </div>
  );
}
