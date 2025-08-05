import { HeaderLarge } from "../components";

export default function Layout({ children }) {
  return (
    <div>
      <HeaderLarge />
      <main className="">{children}</main>
    </div>
  );
}
