import "quasar/dist/quasar.css";
import "@quasar/extras/material-icons/material-icons.css";
import "@quasar/extras/fontawesome-v5/fontawesome-v5.css";

import {
  // Quasar,
  Notify,
  Dialog,
} from "quasar";

// To be used on app.use(Quasar, { ... })
export default {
  config: {},
  plugins: {
    Notify,
    Dialog,
  },
};
