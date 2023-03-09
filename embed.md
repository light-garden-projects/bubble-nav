## Craco

Craco (Create React App Configuration Override) allows us to build our JS and CSS bundles to consistent locations (files) that we can name outselves. That means they can be included by the client on their own pages. Otherwise Create React App gives them names like `main.0af6450f.css`. The 0af6450f part is a hash of the file contents, which will change every time the content changes. That's good for caching, but bad for someone trying to link to it.

Follow the instructions at [https://www.npmjs.com/package/@craco/craco](https://www.npmjs.com/package/@craco/craco), or the simple version below:

- Create a craco.config.js file in the **root directory** and use it to [configure CRACO](https://www.npmjs.com/package/@craco/craco#configuration). An example craco.config.js is [here](https://github.com/smallmultiples/ilf-map/blob/master/craco.config.js).

```js
const webpackEmbed = require("./src/modules/webpack-embed");
module.exports = function ({ env }) {
  return {
    webpack: {
      configure: webpackEmbed,
    },
  };
};
```

- As the above point implies, you'll also need to make a webpack-embed.js file (the above one is in src/modules). An example is [here](https://github.com/smallmultiples/jni-projectmap/blob/master/src/modules/webpack-embed.js). DO NOT `yarn add` the mini-css-extract-plugin required here. That will override Create-React-App's version and cause issues.

```js
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = (webpackConfig, { env, paths }) => {
  // Don't split up the runtime or our chunks
  webpackConfig.optimization.runtimeChunk = false;
  webpackConfig.optimization.splitChunks = false;
  // Make sure main JS bundle is at same URL.
  webpackConfig.output.filename = "static/js/[name].js";
  // Main css bundle should be the same spot too
  const cssPlugin = webpackConfig.plugins.find(
    (plugin) => plugin instanceof MiniCssExtractPlugin
  );
  if (cssPlugin) {
    cssPlugin.options.filename = "static/css/[name].css";
  }
  return webpackConfig;
};
```

- Update the existing calls to react-scripts in the scripts section of your package.json file to use the craco CLI:

```js
/* package.json */
"scripts": {
	"start": "craco start",
	"build": "craco build"
	"test": "craco test"
}
```

## Embed

1. Modify index.js to do the render in a function, and then modify index.html to call that function.

An example index.js file is [here](https://github.com/smallmultiples/jni-projectmap/blob/master/src/index.js).

An example index.html file is [here](https://github.com/smallmultiples/jni-projectmap/blob/master/public/index.html)

2. Create an embed.html file in your `public` folder. An example is [here](https://github.com/smallmultiples/jni-projectmap/blob/master/public/embed.html). This is a good way to test your embed and give the client instructions at the same time.

## Resources, relative/absolute URLs and CORS

#### URLS

You'll notice that if you just write `<img src="images/mypic.jpg"/>` in your code, when you go to embed the project, the image isn't there. That's because it's looking in the images/ folder of the host site, not yours.

Instead, make sure your images include the `PUBLIC_URL` environment variable, e.g.:
`` src={`${process.env.PUBLIC_URL}images/curve-counter-top.png`} ``

In your local `.env` file, you can set this to `/`, i.e. `PUBLIC_URL=/`.
In the deploy settings on Netlify (or wherever you're hosting), you can set `PUBLIC_URL` to the absolute path of your deployed site (e.g. `https://ilf-map.visualise.today/`).

#### OTHER RESOURCES

There's a good chance you'll want to load other resources (e.g. JSON or GeoJSON) from your `/public` folder at some point as well. Even if you set the URL of these correctly, the site where the embed is hosted won't be able to access them due to CORS. (Cross-Origin Resource Sharing - basically Netlify won't let other sites ['origins'] access these resources).

The simplest solution is to add a file named `_headers` to your public folder. For the most permissive settings, it looks like this:

```
/*
  Access-Control-Allow-Origin: *
  Access-Control-Allow-Methods: GET
```

This tells Netlify to that for all our public URLS (`/*`), they can all be accessed by everyone (`*`).

## Branch deploys

You might notice that when you follow these instructions, your branch deploys (e.g. `staging--mygreatapp.netlify.app`) stop updating. If you look at the deploy logs, you'll see they're also built assuming they're hosted at the client's site, not netlify.app. The simplest way to fix this is by adding a Netlify config file.

- In the ROOT of your repo, make a file called netlify.toml
- add an entry like this (here for a branch called `staging` and an app called `mygreatapp`)

```
[context.staging.environment]
     PUBLIC_URL = "https://staging--mygreatapp.netlify.app/"
```

GLHF!
