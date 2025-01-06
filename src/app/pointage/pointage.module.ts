export interface Pointage {
  id: number;
  annee: number;
  mois: number;
  at: number;    // Absence due to "at" (e.g., late, early, etc.)
  cgAnn: number; // Annual Credit/CG (can be adjusted as per its definition)
  jf: number;    // Abbreviation for "jour férié" (public holiday) or similar
  maPied: number; // Meaning of "maPied" depends on your application context
  pres: number;   // Presence (boolean/flag or a count of attendance)
  ret: number;    // Return or related calculation (e.g., late return)
  retEtAut: number; // Combined return and other metrics
  absAut: number; // Absence due to other reasons
  absCt: number;  // Absence count (possibly)
  absLt: number;  // Absence length
  absNj: number;  // Absence number of days
  absPay: number; // Absence pay-related information
  datePointage: string | null;  // Timestamp of the punch-in/out, nullable
  heuresTravaillees: number | null; // Total hours worked, nullable
  serv: string | null;  // Service or department (nullable)


}
