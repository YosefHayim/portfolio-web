import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import {
  findExtensionLegalRedirect,
  findStaticProductPage,
  getStaticProductPageRoutes,
} from "./productRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;
const DIST = join(__dirname, "dist");

app.use(express.static(DIST, { index: "index.html", redirect: false }));

app.use((req, res, next) => {
  const legalRedirectUrl = findExtensionLegalRedirect(req.path);
  if (legalRedirectUrl) {
    res.redirect(301, legalRedirectUrl);
    return;
  }
  next();
});

app.get(getStaticProductPageRoutes(), (req, res, next) => {
  const staticFile = findStaticProductPage(req.path);
  if (!staticFile) {
    next();
    return;
  }

  res.sendFile(join(DIST, staticFile));
});

// SPA fallback - serve index.html for all other routes
app.get("*", (req, res) => {
  res.sendFile(join(DIST, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
