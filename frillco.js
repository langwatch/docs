(function (t, r) {
  function s() {
    var a = r.getElementsByTagName("script")[0],
      e = r.createElement("script");
    (e.type = "text/javascript"),
      (e.async = !0),
      (e.src = "https://widget.frill.co/v2/container.js"),
      a.parentNode.insertBefore(e, a);
  }
  if (!t.Frill) {
    var o = 0,
      i = {};
    (t.Frill = function (e, p) {
      var n,
        l = o++,
        c = new Promise(function (v, d) {
          i[l] = {
            params: [e, p],
            resolve: function (f) {
              (n = f), v(f);
            },
            reject: d,
          };
        });
      return (
        (c.destroy = function () {
          delete i[l], n && n.destroy();
        }),
        c
      );
    }),
      (t.Frill.q = i);
  }
  r.readyState === "complete" || r.readyState === "interactive"
    ? s()
    : r.addEventListener("DOMContentLoaded", s);
})(window, document);
window.Frill("container", {
  key: "cc6b8ce3-8e81-4964-b9ee-b7f2bf3c0312",
  widgets: [
    {
      key: "7b5462b2-f4f7-41f9-82a3-1a13c6902ee0",
    },
  ],
  // Identify your users (optional)
  // user: { email: 'email@domain.com', name: 'Mitch' }
});
