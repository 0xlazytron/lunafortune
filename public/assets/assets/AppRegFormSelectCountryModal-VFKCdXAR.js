import {
  d as h,
  e as f,
  f as v,
  g as l,
  h as c,
  o as n,
  c as r,
  a as o,
  w as C,
  v as w,
  F as g,
  r as y,
  b as k,
  t as b,
  _ as x,
} from "./index-B3BAo3jH.js";
const S = {
    class: "dropdown__modal",
  },
  B = {
    class: "dropdown__search",
  },
  L = {
    class: "dropdown__list",
  },
  F = ["onClick"],
  T = {
    class: "dropdown__flag",
    "aria-hidden": "true",
    width: "16",
    height: "16",
  },
  A = ["href"],
  M = h({
    __name: "AppRegFormSelectCountryModal",
    emits: ["clickToSelectCountryButton"],
    setup(R, { emit: d }) {
      const { setOnRegistrationCountry: u } = f(),
        t = v(""),
        i = l(() =>
          t.value && t.value.length
            ? c.filter((s) =>
                s.name.toLocaleLowerCase().includes(t.value.toLocaleLowerCase())
              )
            : c
        ),
        _ = d,
        p = (s) => {
          _("clickToSelectCountryButton", s), u();
        },
        m = l(() => "/v3/4006/fortune-wheel-gates-of-olympus");
      return (s, a) => (
        n(),
        r("div", S, [
          o("label", B, [
            C(
              o(
                "input",
                {
                  type: "text",
                  class: "dropdown__input",
                  placeholder: "Country search",
                  "onUpdate:modelValue": a[0] || (a[0] = (e) => (t.value = e)),
                },
                null,
                512
              ),
              [[w, t.value]]
            ),
          ]),
          o("ul", L, [
            (n(!0),
            r(
              g,
              null,
              y(
                i.value,
                (e) => (
                  n(),
                  r(
                    "li",
                    {
                      class: "dropdown__item",
                      key: e.code,
                    },
                    [
                      o(
                        "button",
                        {
                          class: "dropdown__button-item",
                          type: "button",
                          onClick: (V) => p(e.code),
                        },
                        [
                          (n(),
                          r("svg", T, [
                            o(
                              "use",
                              {
                                href: `${m.value}/sprites/flags.svg#${e.code}`,
                              },
                              null,
                              8,
                              A
                            ),
                          ])),
                          k(" " + b(e.name), 1),
                        ],
                        8,
                        F
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
  D = x(M, [["__scopeId", "data-v-f280dcb8"]]);
export { D as default };
