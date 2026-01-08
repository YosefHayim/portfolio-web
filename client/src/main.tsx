import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App.tsx";
import { SidebarProvider } from "./Components/ui/sidebar.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <SidebarProvider>
      <App />
    </SidebarProvider>
  </BrowserRouter>,
);
