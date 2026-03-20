/**
 * Portfolio Chart Data — Matthijs Blauw
 * Echte data uit git history en werkervaring.
 * Gebruik dit als dataset voor Chart.js op de portfolio website.
 */

// ============================================
// 1. COMMITS PER MAAND (Bar Chart / Line Chart)
// ============================================
export const commitsPerMaand = {
  labels: [
    "Mei '24", "Jun '24", "Jul '24", "Aug '24", "Sep '24", "Okt '24",
    "Nov '24", "Dec '24", "Jan '25", "Feb '25", "Mrt '25", "Apr '25",
    "Mei '25", "Jun '25", "Jul '25", "Aug '25", "Sep '25", "Okt '25",
    "Nov '25", "Dec '25", "Jan '26", "Feb '26", "Mrt '26"
  ],
  datasets: [
    {
      label: "Bulbmanager Web",
      data: [20, 33, 36, 2, 9, 25, 23, 39, 34, 38, 45, 34, 35, 45, 14, 31, 10, 30, 18, 39, 22, 32, 14],
      backgroundColor: "#4983fb",
      borderColor: "#4983fb",
    },
    {
      label: "Heftruck App",
      data: [0, 4, 6, 1, 10, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      backgroundColor: "#10b981",
      borderColor: "#10b981",
    }
  ]
};
// Totaal: 653 commits (627 web + 26 heftruck)

// ============================================
// 2. CARRIERE GANTT TIJDLIJN
// ============================================
export const carriereTijdlijn = [
  // Opleiding
  { naam: "VMBO — Trinitas College", start: "2013-09", eind: "2017-06", categorie: "Opleiding", kleur: "#8b5cf6" },
  { naam: "HAVO — Trinitas College", start: "2017-09", eind: "2019-06", categorie: "Opleiding", kleur: "#8b5cf6" },
  { naam: "CMD — Hogeschool van Amsterdam", start: "2019-09", eind: "2021-06", categorie: "Opleiding", kleur: "#8b5cf6" },
  { naam: "Frontend D&D — HvA", start: "2021-09", eind: "2023-06", categorie: "Opleiding", kleur: "#8b5cf6" },

  // Werk
  { naam: "Dekker Chrysanten", start: "2016-10", eind: "2021-08", categorie: "Werk", kleur: "#4983fb" },
  { naam: "Hot Networkz (Sales)", start: "2021-04", eind: "2022-09", categorie: "Werk", kleur: "#4983fb" },
  { naam: "Student Assistent HvA", start: "2022-09", eind: "2026-03", categorie: "Werk", kleur: "#4983fb" },
  { naam: "Dekker Chrysanten (2e)", start: "2023-01", eind: "2024-01", categorie: "Werk", kleur: "#4983fb" },
  { naam: "Bulbmanager", start: "2024-05", eind: "2026-03", categorie: "Werk", kleur: "#4983fb" },

  // Stage
  { naam: "Stage Orderli", start: "2023-02", eind: "2023-05", categorie: "Stage", kleur: "#f97316" },

  // Vrijwillig
  { naam: "Victor Gymsport (freerun)", start: "2019-09", eind: "2020-07", categorie: "Vrijwillig", kleur: "#10b981" },
  { naam: "GV-Westfriesland", start: "2020-09", eind: "2026-03", categorie: "Vrijwillig", kleur: "#10b981" },
  { naam: "SVW Steeds Voorwaarts", start: "2022-10", eind: "2026-03", categorie: "Vrijwillig", kleur: "#10b981" },
];

// ============================================
// 3. PROJECTEN GANTT (Bulbmanager)
// ============================================
export const projectenTijdlijn = [
  { naam: "Power BM Charts", start: "2024-05", eind: "2025-01", categorie: "Data", kleur: "#4983fb" },
  { naam: "Heftruck App (C#)", start: "2024-06", eind: "2024-10", categorie: "Desktop", kleur: "#10b981" },
  { naam: "Furora Dashboard", start: "2024-06", eind: "2025-01", categorie: "Data", kleur: "#4983fb" },
  { naam: "BKD OAuth Migratie", start: "2024-07", eind: "2025-05", categorie: "Integratie", kleur: "#f97316" },
  { naam: "Webshop (€253K)", start: "2025-01", eind: "2026-03", categorie: "E-commerce", kleur: "#ec4899" },
  { naam: "Generiek Mail Component", start: "2025-04", eind: "2025-10", categorie: "Refactoring", kleur: "#eab308" },
  { naam: "AI Platform (IVY)", start: "2025-06", eind: "2026-03", categorie: "AI", kleur: "#8b5cf6" },
  { naam: "Demo Video", start: "2025-09", eind: "2025-09", categorie: "Media", kleur: "#06b6d4" },
];

// ============================================
// 4. SKILLS RADAR CHART
// ============================================
export const skillsRadar = {
  labels: ["Frontend", "Backend", "AI / Automation", "Design", "Database", "DevOps"],
  data: [90, 80, 85, 75, 70, 65],
  backgroundColor: "rgba(73, 131, 251, 0.2)",
  borderColor: "#4983fb",
};

// ============================================
// 5. SKILLS GROEI OVER TIJD (Line Chart)
// ============================================
export const skillsGroei = {
  labels: ["2019", "2020", "2021", "2022", "2023", "2024", "2025", "2026"],
  datasets: [
    { label: "Frontend", data: [10, 20, 40, 55, 65, 75, 85, 90], borderColor: "#4983fb" },
    { label: "Backend", data: [0, 0, 5, 10, 25, 50, 70, 80], borderColor: "#10b981" },
    { label: "AI", data: [0, 0, 0, 0, 0, 20, 60, 85], borderColor: "#8b5cf6" },
    { label: "Design", data: [20, 30, 50, 60, 65, 70, 75, 75], borderColor: "#ec4899" },
    { label: "Database", data: [0, 0, 0, 5, 15, 40, 60, 70], borderColor: "#eab308" },
  ]
};

// ============================================
// 6. HOBBYS BAR CHART (jaren actief)
// ============================================
export const hobbysBar = {
  labels: ["Gaming", "Freerunning", "Reizen", "Fitness", "Programmeren", "Longboarden", "DJ'en"],
  data: [10, 7, 6, 4, 5, 3, 1],
  kleuren: ["#8b5cf6", "#4983fb", "#06b6d4", "#10b981", "#f97316", "#eab308", "#ec4899"],
};

// ============================================
// 7. WAT IK BOUW (Pie Chart)
// ============================================
export const watIkBouw = {
  labels: ["Websites", "AI / Automation", "E-commerce", "Desktop Software", "Mobiele Apps", "Design"],
  data: [35, 25, 15, 10, 5, 10],
  kleuren: ["#4983fb", "#8b5cf6", "#ec4899", "#10b981", "#f97316", "#eab308"],
};

// ============================================
// 8. FURORA-STYLE MACHINE DATA (demo)
// ============================================
export const furoraDemo = {
  labels: ["05:00", "05:30", "06:00", "06:30", "07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00"],
  datasets: [
    {
      label: "Furora 1",
      data: [0, 0, 50, 400, 1200, 1350, 1400, 1300, 1250, 1100, 1300, 1350, 1400],
      borderColor: "#4983fb",
      borderWidth: 2,
      pointRadius: 0,
    },
    {
      label: "Furora 2",
      data: [0, 0, 0, 200, 900, 1100, 1050, 1000, 950, 1050, 1100, 1000, 1050],
      borderColor: "#10b981",
      borderWidth: 2,
      pointRadius: 0,
    },
    {
      label: "Furora 3",
      data: [0, 0, 100, 800, 1500, 2000, 1800, 1900, 1600, 1200, 1000, 800, 500],
      borderColor: "#ea580c",
      borderWidth: 2,
      pointRadius: 0,
    },
  ]
};
