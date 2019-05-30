# <%= name %>

<%= description %>

## Running this project

Follow these steps to run a dev version of this project that supports hot reload and is debuggable through VS Code. You will need to install [Firefox](https://www.mozilla.org/firefox/) if you don't have it already because the VS Code Debugger for Chrome extension [doesn't support iframes](https://github.com/microsoft/vscode-chrome-debug/issues/786) yet.

### Hot reload

1. Deploy the extension to the marketplace:

   ```shell
   npm run publish:dev -- --token [token]
   ```

   > The `[token]` here is an Azure DevOps PAT (personal access token) with the **Marketplace (Publish)** scope and access set to **All accessible organizations**. For more information, see [Authenticate access with personal access tokens](https://docs.microsoft.com/en-us/azure/devops/organizations/accounts/use-personal-access-tokens-to-authenticate).

1. Share the published extension with your Azure DevOps organization and install it.

1. Start the webpack-dev-server with:

   ```shell
   npm run start:dev
   ```

1. Go to `localhost:3000` in your browser. You should get an untrusted certificate error page. Select **Advanced** and then select **Accept the Risk and Continue**.

1. Navigate to the extension in Azure DevOps. Any changes to the source code will cause webpack to recompile and reload the extension automatically.

   > Although most code changes will be reflected immediately, you may still need to occasionally update your extension in the marketplace. The dev extension loads all its resources from the webpack-dev-server, but the manifest itself is being loaded from the published code. Therefore, any changes to the manifest file will not be properly reflected in Azure DevOps until the extension has been republished.

### Debug in VS Code

1. In VS Code, press **F5** to start debugging (making sure the webpack-dev-server is still running). The default launch configuration should be set to **Launch Firefox**.

   > Chrome configurations are included in the sample as well in case the Debugger for Chrome extension eventually supports iframes. However, debugging iframes is only supported in the Debugger for Firefox extension at this time.

1. Allow the `localhost:3000` certificate again and log into your Azure DevOps account.

   > If you leave the Firefox window open that VS Code launches, the debugger will reattach instead of starting a clean Firefox instance each time.

1. Navigate to your extension and set a breakpoint in a method in VS Code. You should see that breakpoint hit when that method executes.
