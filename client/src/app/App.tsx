import { Providers } from "./providers";
import { ThemeSwitcher } from "./theme";
import { Router } from "./router";

export function App() {
  return (
    <Providers>
      <Router />
      <ThemeSwitcher />
    </Providers>
  );
}
