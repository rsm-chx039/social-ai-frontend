const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api", // This is the api prefix to trigger the proxy
    createProxyMiddleware({
      target: "https://oaidalleapiprodscus.blob.core.windows.net/",
      changeOrigin: true, // Needed for virtual hosted sites
      pathRewrite: {
        "^/api": "", // rewrite path if necessary
      },
    }),
  );
  const backendTarget =
    process.env.REACT_APP_API_BASE_URL || "http://xxx.uw.r.appspot.com";

  const apiPaths = [
    "/signup",
    "/signin",
    "/search",
    "/upload",
    "/post",
    "/user",
    "/comment",
  ];

  app.options(apiPaths, (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Methods",
      "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, X-Requested-With",
    );
    res.sendStatus(200);
  });

  app.use(
    ["/signup", "/signin", "/search", "/upload", "/post", "/user", "/comment"],
    createProxyMiddleware({
      target: backendTarget,
      changeOrigin: true,
      secure: false,
    }),
  );
};
