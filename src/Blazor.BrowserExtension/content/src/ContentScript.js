﻿(async () => {
  const initializeInternal = (await import("./Modules/CoreInternal.js")).initializeInternal;
  const url = (globalThis.browser || globalThis.chrome).runtime.getURL("");

  const configRequest = await fetch(`${url}content/browserextension.config.json`);
  /** @type {import("./Modules/BrowserExtensionConfig.js").default} */
  const config = await configRequest.json();

  const blazorBrowserExtension = initializeInternal(config, url, "ContentScript");

  await blazorBrowserExtension.BrowserExtension.InitializeContentScriptAsync({
    IsContentScript: true,
    BlazorBrowserExtension: blazorBrowserExtension
  });
})();
