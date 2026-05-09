import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import {
  findExtensionLegalRedirect,
  findStaticProductPage,
  getExtensionLegalRedirectRoutes,
  getStaticProductPageRoutes,
  getWorkerFirstRoutes,
} from "./productRoutes.js";
import { requirePortfolioProductFact } from "../shared/portfolio/productRegistry.js";

test("static product page routes resolve through one registry", () => {
  assert.equal(
    requirePortfolioProductFact("prompt-queue").pagePath,
    "/prompt-queue",
  );
  assert.equal(
    findStaticProductPage("/prompt-queue"),
    "prompt-queue/index.html",
  );
  assert.equal(
    findStaticProductPage("/prompt-queue/"),
    "prompt-queue/index.html",
  );
  assert.equal(findStaticProductPage("/sorqa"), "sorqa/index.html");
  assert.equal(findStaticProductPage("/jts/"), "jts/index.html");

  assert.deepEqual(getStaticProductPageRoutes(), [
    "/prompt-queue",
    "/prompt-queue/",
    "/sorqa",
    "/sorqa/",
    "/jts",
    "/jts/",
  ]);
});

test("legal redirects and worker-first routes stay generated from the registry", () => {
  assert.equal(
    findExtensionLegalRedirect("/audio-transcriber/privacy"),
    "https://extensions.yosefhayimsabag.com/legal/sidescribe-audio-transcriber/privacy",
  );
  assert.equal(
    findExtensionLegalRedirect("/promptqueue-terms.html"),
    "https://extensions.yosefhayimsabag.com/legal/batchbeam-prompt-queue/terms",
  );

  const workerFirstRoutes = getWorkerFirstRoutes();
  assert.ok(workerFirstRoutes.includes("/api/*"));
  assert.ok(workerFirstRoutes.includes("/health"));

  for (const route of [
    ...getStaticProductPageRoutes(),
    ...getExtensionLegalRedirectRoutes(),
  ]) {
    assert.ok(workerFirstRoutes.includes(route), `${route} is worker-first`);
  }
});

test("wrangler worker-first routes include every registry route", async () => {
  const wrangler = JSON.parse(
    await readFile(new URL("../wrangler.jsonc", import.meta.url), "utf8"),
  );
  const configuredRoutes = wrangler.assets.run_worker_first;

  for (const route of getWorkerFirstRoutes()) {
    assert.ok(
      configuredRoutes.includes(route),
      `${route} is configured in wrangler`,
    );
  }
});
