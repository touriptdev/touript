import { HeaderLarge } from "../components";

export default function Layout({ children }) {
  return (
    <div>
      <HeaderLarge/>
      <main className="p-4">{children}</main>
    </div>
  );
}