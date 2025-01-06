export interface Employee {
  matr: number;
  nomEtPrenom:string;
  nomEtPrenomPere:string;
  ntel: string;
  cin: string;
  taille: number;
  pointure: number;
  DateNais: Date;
  sf: Genre;
  etat: EtatCivil;
  classe: Classe;
  nom_de_chef:string;
  serv:Service;
  cnss:string;
  typeDeContrat: TypeContrat;
  mode_pay: ModePaiement;
  DateRecr: Date;
  anc:number;
  test:boolean;
  FinContr:Date;
  alerte:number;
  remarque:string;
  bank:string;
  rib:string;
  Age: number;
  nbEnf: number;
  modePay: string;
  domiciIrreSalaire:boolean;
  quitteLe:Date;
  nomDeChef:string;
  }
  export enum Genre {
    Femme = 'FEMME',
    Homme = 'HOMME'
  }
  
  export enum Test {
    Vrai = 'vrai',
    Faux = 'faux'
  }
  
  export enum DomiciliationIrreSalaire {
    OUI = 'OUI',
    NON = 'NON'
  }
  
  export enum Classe {
    Une = 'Une',
    Deux = 'Deux',
    Trois = 'Trois',
    Quatre = 'Quatre',
    Cinq = 'Cinq',
    D = 'D',
    I = 'I'
  }
  
  export enum Chef {
    JAMIL_KAMEL = 'JAMIL_KAMEL',
    EZELAITI_FAOUZI = 'EZELAITI_FAOUZI',
    SAMI_YOUNES   = 'SAMI_YOUNES',
    AKARI_MAJDI  = 'AKARI_MAJDI',
    BEN_MANSOUR_IMED = 'BEN_MANSOUR_IMED',
    MAZROUI_HAJER = 'MAZROUI_HAJER',
    ACHOUR_MAHLA = 'ACHOUR_MAHLA',
    AKROUT_AICHA = 'AKROUT_AICHA',
    GRUICHI_SAMIA = 'GRUICHI_SAMIA',
    BEN_SALEM_FATEN = 'BEN_SALEM_FATEN',
    HAJI_HANIA  ="HAJI_HANIA",
    HALLALI_HOUDA   = 'HALLALI_HOUDA',
    HARMASSI_SALHA = 'HARMASSI_SALHA',
    BECHA_MAKNI=' BECHA_MAKNI',
    ZOHRA_ABDELLAOUI='ZOHRA_ABDELLAOUI',
    NASSIMA_DHOUIBI='NASSIMA_DHOUIBI',
    HELA_FEKIH='HELA_FEKIH'
  }
  
  export enum EtatCivil {
    CELIBATAIRE ="CELIBATAIRE",
    MARIE= "MARIE",
    DIVORCE = "DIVORCE",
    VEUF = "VEUF"
  }
  
  export enum ModePaiement {
    VIREMENT = 'VIREMENT',
    CHEQUE = 'CHEQUE',
    ESPECE = 'ESPECE'
  }
  
  export enum TypeContrat {
    Apprentissage = 'Apprentissage',
    ContratActuel = 'ContratActuel',
    ND = 'ND',
    SIVP = 'SIVP',
    Stagiaire = 'Stagiaire',
    Titulaire = 'Titulaire'
  }
  
  export enum Service {
    D_CABL= 'D_CABL',
    D_CINT= 'D_CINT',
    D_DEB= 'D_DEB',
    D_MENUIS= 'D_MENUIS',
    D_PEINT= 'D_PEINT',
    D_PONC= 'D_PONC',
    D_PRINT= 'D_PRINT',
    D_RINC= 'D_RINC',
    D_SOUD= 'D_SOUD',
    IND_ADMIN= 'IND_ADMIN',
    IND_BUR_ETUD= 'IND_BUR_ETUD',
    IND_CABL= 'IND_CABL',
    IND_CINT= 'IND_CINT',
    IND_DES= 'IND_DES',
    IND_DEVL= 'IND_DEVL',
    IND_MAGAS= 'IND_MAGAS',
    IND_MAINT= 'IND_MAINT',
    IND_PEINT= 'IND_PEINT',
    IND_PROD= 'IND_PROD',
    IND_QUAL= 'IND_QUAL',
    IND_SOUD= 'IND_SOUD',
    SERV_GENE= 'SERV_GENE',

  }
  
