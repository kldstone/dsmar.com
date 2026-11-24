/// <reference types="node" />

import { PassThrough } from "node:stream";
import { createElement } from "react";
import { renderToPipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { AppRoutes } from "./App";
import { LangProvider } from "./lib/i18n";
import { resolvePageSeo } from "./lib/pageSeo";

export { resolvePageSeo };

export function render(url: string) {
  return new Promise<string>((resolve, reject) => {
    const body = new PassThrough();
    const chunks: Buffer[] = [];
    body.on("data", (chunk: Buffer) => chunks.push(chunk));
    let didError = false;
    body.on("end", () => {
      if (didError) reject(new Error(`Server rendering reported an error for ${url}`));
      else resolve(Buffer.concat(chunks).toString("utf8"));
    });
    body.on("error", reject);

    const stream = renderToPipeableStream(
      createElement(
        StaticRouter,
        { location: url },
        createElement(LangProvider, null, createElement(AppRoutes)),
      ),
      {
        onAllReady() {
          stream.pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          didError = true;
          console.error(`SSR error for ${url}:`, error);
        },
      },
    );

  });
}
