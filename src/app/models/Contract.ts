export interface Contract {
  idContractPlayer?: number;
  detailsContractuels: string;
  termesFinanciers: string;
  clausesSpecifiques: string;
  objectifs: string[];
  date: string;
  player: { leagalefullname: string }; // Adjusted for consistency
}
