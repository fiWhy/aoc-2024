import { JSX } from 'react';
import Nav from './nav';

export default function Layout({ children }: { children: JSX.Element }) {
  return (
    <div className="flex flex-1 h-full flex-col gap-6 p-8">
      <Nav />
      <main className="flex-1 flex">{children}</main>
    </div>
  );
}
