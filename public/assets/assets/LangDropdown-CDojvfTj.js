import {
  d as _,
  o as t,
  c as s,
  a,
  F as c,
  r as p,
  u as l,
  b as u,
  t as g,
  _ as h,
} from "./index-B3BAo3jH.js";
const m = {
    class: "dropdown__modal",
  },
  f = {
    class: "dropdown__list",
  },
  w = ["onClick"],
  L = {
    class: "dropdown__flag",
    "aria-hidden": "true",
    width: "16",
    height: "16",
  },
  y = ["href"],
  v = _({
    __name: "LangDropdown",
    props: {
      languagesList: {},
    },
    emits: ["updateLanguage"],
    setup(k, { emit: n }) {
      const r = n,
        d = "/v3/4006/fortune-wheel-gates-of-olympus",
        i = (o) => r("updateLanguage", o);
      return (o, $) => (
        t(),
        s("div", m, [
          a("ul", f, [
            (t(!0),
            s(
              c,
              null,
              p(
                o.languagesList,
                (e) => (
                  t(),
                  s(
                    "li",
                    {
                      class: "dropdown__item",
                      key: e.internationalName,
                    },
                    [
                      a(
                        "button",
                        {
                          class: "dropdown__button-item",
                          type: "button",
                          onClick: (b) => i(e.isoKey),
                        },
                        [
                          (t(),
                          s("svg", L, [
                            a(
                              "use",
                              {
                                href: `${l(d)}/sprites/flags.svg#${
                                  e.alpha2Key
                                }`,
                              },
                              null,
                              8,
                              y
                            ),
                          ])),
                          u(
                            " " +
                              g(
                                `${
                                  e.nationalName
                                } (${e.alpha3Key.toUpperCase()})`
                              ),
                            1
                          ),
                        ],
                        8,
                        w
                      ),
                    ]
                  )
                )
              ),
              128
            )),
          ]),
        ])
      );
    },
  }),
  N = h(v, [["__scopeId", "data-v-5e92d064"]]);
export { N as default };
