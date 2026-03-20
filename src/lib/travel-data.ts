import type { TravelDestination } from "./types";

/**
 * Static travel data — stamp images served from /public/stamps/ via Vercel CDN.
 * Much faster than Notion's expiring signed URLs.
 */
export const travelDestinations: TravelDestination[] = [
  { id: "ven", name: "Venezuela", code: "VEN", stampUrl: "/stamps/ven.png", seat: "Seat 01A", departure: "Born here", order: 1 },
  { id: "col", name: "Colombia", code: "COL", stampUrl: "/stamps/col.png", seat: "Seat 02B", departure: "2015", order: 2 },
  { id: "bra", name: "Brazil", code: "BRA", stampUrl: "/stamps/bra.png", seat: "Seat 03C", departure: "2018", order: 3 },
  { id: "mex", name: "Mexico", code: "MEX", stampUrl: "/stamps/mex.png", seat: "Seat 04A", departure: "2022", order: 4 },
  { id: "sxm", name: "St. Maarten", code: "SXM", stampUrl: "/stamps/sxm.png", seat: "Seat 05B", departure: "2016", order: 5 },
  { id: "dom", name: "Dominican Republic", code: "DOM", stampUrl: "/stamps/dom.png", seat: "Seat 06C", departure: "2014", order: 6 },
  { id: "usa", name: "USA", code: "USA", stampUrl: "/stamps/usa.png", seat: "Seat 07A", departure: "2013", order: 7 },
  { id: "can", name: "Canada", code: "CAN", stampUrl: "/stamps/can.png", seat: "Seat 08B", departure: "2019", order: 8 },
  { id: "esp", name: "Spain", code: "ESP", stampUrl: "/stamps/esp.png", seat: "Seat 09A", departure: "2020", order: 9 },
  { id: "fra", name: "France", code: "FRA", stampUrl: "/stamps/fra.png", seat: "Seat 10B", departure: "2019", order: 10 },
  { id: "irl", name: "Ireland", code: "IRL", stampUrl: "/stamps/irl.png", seat: "Seat 11C", departure: "2021", order: 11 },
  { id: "ita", name: "Italy", code: "ITA", stampUrl: "/stamps/ita.png", seat: "Seat 12A", departure: "2023", order: 12 },
  { id: "prt", name: "Portugal", code: "PRT", stampUrl: "/stamps/prt.png", seat: "Seat 13B", departure: "2022", order: 13 },
  { id: "gbr", name: "United Kingdom", code: "GBR", stampUrl: "/stamps/gbr.png", seat: "Seat 14C", departure: "2019", order: 14 },
  { id: "aut", name: "Austria", code: "AUT", stampUrl: "/stamps/aut.png", seat: "Seat 15A", departure: "2023", order: 15 },
  { id: "cze", name: "Czech Republic", code: "CZE", stampUrl: "/stamps/cze.png", seat: "Seat 16B", departure: "2023", order: 16 },
  { id: "nld", name: "The Netherlands", code: "NLD", stampUrl: "/stamps/nld.png", seat: "Seat 17C", departure: "2024", order: 17 },
  { id: "vnm", name: "Vietnam", code: "VNM", stampUrl: "/stamps/vnm.png", seat: "Seat 18A", departure: "2024", order: 18 },
  { id: "tha", name: "Thailand", code: "THA", stampUrl: "/stamps/tha.png", seat: "Seat 19B", departure: "2024", order: 19 },
  { id: "hkg", name: "Hong Kong", code: "HKG", stampUrl: "/stamps/hkg.png", seat: "Seat 20C", departure: "2024", order: 20 },
  { id: "che", name: "Switzerland", code: "CHE", stampUrl: "/stamps/che.png", seat: "Seat 21A", departure: "Alpine escape", order: 21 },
];
