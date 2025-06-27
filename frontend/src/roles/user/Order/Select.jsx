import React, { useState, useEffect, useRef } from 'react';

// Mock geographical data for demonstration purposes.
// In a real application, this data would be fetched from a backend API
// that queries a comprehensive geographical database (e.g., GeoNames, a commercial API).
const mockGeoData = {
  US: {
    name: 'United States',
    states: {
      AL: { name: 'Alabama', cities: ['Birmingham', 'Montgomery', 'Huntsville'] },
      AK: { name: 'Alaska', cities: ['Anchorage', 'Fairbanks', 'Juneau'] },
      AZ: { name: 'Arizona', cities: ['Phoenix', 'Tucson', 'Mesa'] },
      AR: { name: 'Arkansas', cities: ['Little Rock', 'Fort Smith', 'Fayetteville'] },
      CA: { name: 'California', cities: ['Los Angeles', 'San Francisco', 'San Diego', 'Sacramento', 'Fresno'] },
      CO: { name: 'Colorado', cities: ['Denver', 'Colorado Springs', 'Aurora'] },
      CT: { name: 'Connecticut', cities: ['Bridgeport', 'New Haven', 'Stamford'] },
      DE: { name: 'Delaware', cities: ['Wilmington', 'Dover', 'Newark'] },
      FL: { name: 'Florida', cities: ['Miami', 'Orlando', 'Tampa', 'Jacksonville', 'Tallahassee'] },
      GA: { name: 'Georgia', cities: ['Atlanta', 'Augusta', 'Columbus'] },
      HI: { name: 'Hawaii', cities: ['Honolulu', 'Pearl City', 'Hilo'] },
      ID: { name: 'Idaho', cities: ['Boise', 'Nampa', 'Meridian'] },
      IL: { name: 'Illinois', cities: ['Chicago', 'Aurora', 'Rockford', 'Joliet', 'Naperville'] },
      IN: { name: 'Indiana', cities: ['Indianapolis', 'Fort Wayne', 'Evansville'] },
      IA: { name: 'Iowa', cities: ['Des Moines', 'Cedar Rapids', 'Davenport'] },
      KS: { name: 'Kansas', cities: ['Wichita', 'Overland Park', 'Kansas City'] },
      KY: { name: 'Kentucky', cities: ['Louisville', 'Lexington', 'Bowling Green'] },
      LA: { name: 'Louisiana', cities: ['New Orleans', 'Baton Rouge', 'Shreveport'] },
      ME: { name: 'Maine', cities: ['Portland', 'Lewiston', 'Bangor'] },
      MD: { name: 'Maryland', cities: ['Baltimore', 'Frederick', 'Rockville'] },
      MA: { name: 'Massachusetts', cities: ['Boston', 'Worcester', 'Springfield'] },
      MI: { name: 'Michigan', cities: ['Detroit', 'Grand Rapids', 'Warren'] },
      MN: { name: 'Minnesota', cities: ['Minneapolis', 'Saint Paul', 'Rochester'] },
      MS: { name: 'Mississippi', cities: ['Jackson', 'Gulfport', 'Southaven'] },
      MO: { name: 'Missouri', cities: ['Kansas City', 'Saint Louis', 'Springfield'] },
      MT: { name: 'Montana', cities: ['Billings', 'Missoula', 'Great Falls'] },
      NE: { name: 'Nebraska', cities: ['Omaha', 'Lincoln', 'Bellevue'] },
      NV: { name: 'Nevada', cities: ['Las Vegas', 'Henderson', 'Reno'] },
      NH: { name: 'New Hampshire', cities: ['Manchester', 'Nashua', 'Concord'] },
      NJ: { name: 'New Jersey', cities: ['Newark', 'Jersey City', 'Paterson'] },
      NM: { name: 'New Mexico', cities: ['Albuquerque', 'Las Cruces', 'Rio Rancho'] },
      NY: { name: 'New York', cities: ['New York City', 'Buffalo', 'Rochester', 'Syracuse', 'Albany'] },
      NC: { name: 'North Carolina', cities: ['Charlotte', 'Raleigh', 'Greensboro'] },
      ND: { name: 'North Dakota', cities: ['Fargo', 'Bismarck', 'Grand Forks'] },
      OH: { name: 'Ohio', cities: ['Columbus', 'Cleveland', 'Cincinnati'] },
      OK: { name: 'Oklahoma', cities: ['Oklahoma City', 'Tulsa', 'Norman'] },
      OR: { name: 'Oregon', cities: ['Portland', 'Salem', 'Eugene'] },
      PA: { name: 'Pennsylvania', cities: ['Philadelphia', 'Pittsburgh', 'Allentown'] },
      RI: { name: 'Rhode Island', cities: ['Providence', 'Warwick', 'Cranston'] },
      SC: { name: 'South Carolina', cities: ['Charleston', 'Columbia', 'North Charleston'] },
      SD: { name: 'South Dakota', cities: ['Sioux Falls', 'Rapid City', 'Aberdeen'] },
      TN: { name: 'Tennessee', cities: ['Nashville', 'Memphis', 'Knoxville'] },
      TX: { name: 'Texas', cities: ['Houston', 'San Antonio', 'Dallas', 'Austin', 'Fort Worth'] },
      UT: { name: 'Utah', cities: ['Salt Lake City', 'West Valley City', 'Provo'] },
      VT: { name: 'Vermont', cities: ['Burlington', 'South Burlington', 'Rutland'] },
      VA: { name: 'Virginia', cities: ['Virginia Beach', 'Chesapeake', 'Norfolk'] },
      WA: { name: 'Washington', cities: ['Seattle', 'Spokane', 'Tacoma'] },
      WV: { name: 'West Virginia', cities: ['Charleston', 'Huntington', 'Morgantown'] },
      WI: { name: 'Wisconsin', cities: ['Milwaukee', 'Madison', 'Green Bay'] },
      WY: { name: 'Wyoming', cities: ['Cheyenne', 'Casper', 'Laramie'] },
    },
  },
  CA: {
    name: 'Canada',
    states: {
      AB: { name: 'Alberta', cities: ['Calgary', 'Edmonton', 'Red Deer'] },
      BC: { name: 'British Columbia', cities: ['Vancouver', 'Surrey', 'Burnaby', 'Richmond', 'Kelowna'] },
      MB: { name: 'Manitoba', cities: ['Winnipeg', 'Brandon', 'Steinbach'] },
      NB: { name: 'New Brunswick', cities: ['Moncton', 'Saint John', 'Fredericton'] },
      NL: { name: 'Newfoundland and Labrador', cities: ['St. John\'s', 'Conception Bay South', 'Mount Pearl'] },
      NS: { name: 'Nova Scotia', cities: ['Halifax', 'Sydney', 'Dartmouth'] },
      ON: { name: 'Ontario', cities: ['Toronto', 'Ottawa', 'Mississauga', 'Brampton', 'Hamilton'] },
      PE: { name: 'Prince Edward Island', cities: ['Charlottetown', 'Summerside', 'Stratford'] },
      QC: { name: 'Quebec', cities: ['Montreal', 'Quebec City', 'Laval', 'Gatineau', 'Longueuil'] },
      SK: { name: 'Saskatchewan', cities: ['Saskatoon', 'Regina', 'Prince Albert'] },
      NT: { name: 'Northwest Territories', cities: ['Yellowknife', 'Inuvik'] },
      NU: { name: 'Nunavut', cities: ['Iqaluit'] },
      YT: { name: 'Yukon', cities: ['Whitehorse'] },
    },
  },
  GB: {
    name: 'United Kingdom',
    states: { // Using 'states' for consistency, but these are regions/countries within UK
      ENG: { name: 'England', cities: ['London', 'Birmingham', 'Manchester', 'Liverpool', 'Leeds'] },
      SCT: { name: 'Scotland', cities: ['Edinburgh', 'Glasgow', 'Aberdeen', 'Dundee'] },
      WLS: { name: 'Wales', cities: ['Cardiff', 'Swansea', 'Newport'] },
      NIR: { name: 'Northern Ireland', cities: ['Belfast', 'Derry', 'Lisburn'] },
    },
  },
  AU: {
    name: 'Australia',
    states: {
      NSW: { name: 'New South Wales', cities: ['Sydney', 'Newcastle', 'Wollongong'] },
      VIC: { name: 'Victoria', cities: ['Melbourne', 'Geelong', 'Ballarat'] },
      QLD: { name: 'Queensland', cities: ['Brisbane', 'Gold Coast', 'Sunshine Coast'] },
      WA: { name: 'Western Australia', cities: ['Perth', 'Rockingham', 'Mandurah'] },
      SA: { name: 'South Australia', cities: ['Adelaide', 'Mount Gambier', 'Whyalla'] },
      TAS: { name: 'Tasmania', cities: ['Hobart', 'Launceston', 'Devonport'] },
      ACT: { name: 'Australian Capital Territory', cities: ['Canberra'] },
      NT: { name: 'Northern Territory', cities: ['Darwin', 'Alice Springs'] },
    },
  },
  DE: {
    name: 'Germany',
    states: {
      BB: { name: 'Brandenburg', cities: ['Potsdam', 'Cottbus'] },
      BE: { name: 'Berlin', cities: ['Berlin'] },
      BW: { name: 'Baden-Württemberg', cities: ['Stuttgart', 'Karlsruhe', 'Freiburg'] },
      BY: { name: 'Bavaria', cities: ['Munich', 'Nuremberg', 'Augsburg'] },
      HB: { name: 'Bremen', cities: ['Bremen', 'Bremerhaven'] },
      HH: { name: 'Hamburg', cities: ['Hamburg'] },
      HE: { name: 'Hesse', cities: ['Frankfurt am Main', 'Wiesbaden', 'Kassel'] },
      MV: { name: 'Mecklenburg-Vorpommern', cities: ['Rostock', 'Schwerin'] },
      NI: { name: 'Lower Saxony', cities: ['Hanover', 'Braunschweig', 'Osnabrück'] },
      NW: { name: 'North Rhine-Westphalia', cities: ['Cologne', 'Dusseldorf', 'Dortmund'] },
      RP: { name: 'Rhineland-Palatinate', cities: ['Mainz', 'Ludwigshafen', 'Koblenz'] },
      SL: { name: 'Saarland', cities: ['Saarbrücken', 'Neunkirchen'] },
      SN: { name: 'Saxony', cities: ['Dresden', 'Leipzig', 'Chemnitz'] },
      ST: { name: 'Saxony-Anhalt', cities: ['Magdeburg', 'Halle'] },
      SH: { name: 'Schleswig-Holstein', cities: ['Kiel', 'Lübeck'] },
      TH: { name: 'Thuringia', cities: ['Erfurt', 'Jena'] },
    },
  },
  FR: {
    name: 'France',
    states: {
      IDF: { name: 'Île-de-France', cities: ['Paris', 'Saint-Denis', 'Boulogne-Billancourt'] },
      PAC: { name: 'Provence-Alpes-Côte d\'Azur', cities: ['Marseille', 'Nice', 'Toulon'] },
      OCC: { name: 'Occitanie', cities: ['Toulouse', 'Montpellier', 'Nîmes'] },
      ARA: { name: 'Auvergne-Rhône-Alpes', cities: ['Lyon', 'Saint-Étienne', 'Grenoble'] },
      BDX: { name: 'Nouvelle-Aquitaine', cities: ['Bordeaux', 'Limoges', 'Poitiers'] },
    },
  },
  IT: {
    name: 'Italy',
    states: {
      LAZ: { name: 'Lazio', cities: ['Rome', 'Latina', 'Frosinone'] },
      LOM: { name: 'Lombardy', cities: ['Milan', 'Brescia', 'Bergamo'] },
      CAM: { name: 'Campania', cities: ['Naples', 'Salerno', 'Giugliano in Campania'] },
      SIC: { name: 'Sicily', cities: ['Palermo', 'Catania', 'Messina'] },
    },
  },
  ES: {
    name: 'Spain',
    states: {
      MD: { name: 'Madrid', cities: ['Madrid', 'Móstoles', 'Alcalá de Henares'] },
      CAT: { name: 'Catalonia', cities: ['Barcelona', 'L\'Hospitalet de Llobregat', 'Badalona'] },
      AND: { name: 'Andalusia', cities: ['Seville', 'Málaga', 'Córdoba'] },
      VAL: { name: 'Valencian Community', cities: ['Valencia', 'Alicante', 'Elche'] },
    },
  },
  NL: {
    name: 'Netherlands',
    states: {
      NH: { name: 'North Holland', cities: ['Amsterdam', 'Haarlem', 'Alkmaar'] },
      ZH: { name: 'South Holland', cities: ['Rotterdam', 'The Hague', 'Leiden'] },
      UT: { name: 'Utrecht', cities: ['Utrecht', 'Amersfoort', 'Veenendaal'] },
    },
  },
  PL: {
    name: 'Poland',
    states: {
      MZ: { name: 'Masovian Voivodeship', cities: ['Warsaw', 'Radom', 'Płock'] },
      MA: { name: 'Lesser Poland Voivodeship', cities: ['Kraków', 'Tarnów', 'Nowy Sącz'] },
      DS: { name: 'Lower Silesian Voivodeship', cities: ['Wrocław', 'Wałbrzych', 'Legnica'] },
    },
  },
  SE: {
    name: 'Sweden',
    states: {
      AB: { name: 'Stockholm County', cities: ['Stockholm', 'Södertälje', 'Täby'] },
      M: { name: 'Skåne County', cities: ['Malmö', 'Helsingborg', 'Lund'] },
      O: { name: 'Västra Götaland County', cities: ['Gothenburg', 'Mölndal', 'Borås'] },
    },
  },
  NO: {
    name: 'Norway',
    states: {
      OSL: { name: 'Oslo', cities: ['Oslo'] },
      VIK: { name: 'Viken', cities: ['Drammen', 'Fredrikstad', 'Sandvika'] },
      TR: { name: 'Trøndelag', cities: ['Trondheim', 'Steinkjer'] },
    },
  },
  FI: {
    name: 'Finland',
    states: {
      UES: { name: 'Uusimaa', cities: ['Helsinki', 'Espoo', 'Vantaa'] },
      PIR: { name: 'Pirkanmaa', cities: ['Tampere', 'Nokia', 'Ylöjärvi'] },
      KSK: { name: 'Central Finland', cities: ['Jyväskylä', 'Äänekoski'] },
    },
  },
  DK: {
    name: 'Denmark',
    states: {
      CAP: { name: 'Capital Region of Denmark', cities: ['Copenhagen', 'Frederiksberg', 'Helsingør'] },
      MID: { name: 'Central Denmark Region', cities: ['Aarhus', 'Randers', 'Silkeborg'] },
      SDN: { name: 'Southern Denmark', cities: ['Odense', 'Kolding', 'Esbjerg'] },
    },
  },
  IE: {
    name: 'Ireland',
    states: {
      LEI: { name: 'Leinster', cities: ['Dublin', 'Drogheda', 'Dundalk'] },
      MUN: { name: 'Munster', cities: ['Cork', 'Limerick', 'Waterford'] },
      CON: { name: 'Connacht', cities: ['Galway', 'Sligo', 'Castlebar'] },
    },
  },
  PT: {
    name: 'Portugal',
    states: {
      LIS: { name: 'Lisbon', cities: ['Lisbon', 'Sintra', 'Cascais'] },
      POR: { name: 'Porto', cities: ['Porto', 'Vila Nova de Gaia', 'Matosinhos'] },
      AVE: { name: 'Aveiro', cities: ['Aveiro', 'Santa Maria da Feira', 'Gaia'] },
    },
  },
  BE: {
    name: 'Belgium',
    states: {
      VLG: { name: 'Flanders', cities: ['Brussels', 'Antwerp', 'Ghent'] },
      WAL: { name: 'Wallonia', cities: ['Charleroi', 'Liège', 'Namur'] },
      BRU: { name: 'Brussels-Capital Region', cities: ['Brussels'] },
    },
  },
  CH: {
    name: 'Switzerland',
    states: {
      ZH: { name: 'Zurich', cities: ['Zurich', 'Winterthur', 'Uster'] },
      VD: { name: 'Vaud', cities: ['Lausanne', 'Montreux', 'Yverdon-les-Bains'] },
      GE: { name: 'Geneva', cities: ['Geneva', 'Carouge'] },
    },
  },
  AT: {
    name: 'Austria',
    states: {
      WI: { name: 'Vienna', cities: ['Vienna'] },
      OO: { name: 'Upper Austria', cities: ['Linz', 'Wels', 'Steyr'] },
      ST: { name: 'Styria', cities: ['Graz', 'Leoben', 'Kapfenberg'] },
    },
  },
  CZ: {
    name: 'Czech Republic',
    states: {
      PR: { name: 'Prague', cities: ['Prague'] },
      JM: { name: 'South Moravian Region', cities: ['Brno', 'Znojmo', 'Břeclav'] },
      STC: { name: 'Central Bohemian Region', cities: ['Kladno', 'Mladá Boleslav'] },
    },
  },
  SK: {
    name: 'Slovakia',
    states: {
      BL: { name: 'Bratislava Region', cities: ['Bratislava', 'Pezinok', 'Senec'] },
      KI: { name: 'Košice Region', cities: ['Košice', 'Michalovce', 'Spišská Nová Ves'] },
      BB: { name: 'Banská Bystrica Region', cities: ['Banská Bystrica', 'Zvolen'] },
    },
  },
  HU: {
    name: 'Hungary',
    states: {
      BU: { name: 'Budapest', cities: ['Budapest'] },
      PE: { name: 'Pest County', cities: ['Érd', 'Cegléd', 'Vác'] },
      HB: { name: 'Hajdú-Bihar County', cities: ['Debrecen', 'Hajdúböszörmény'] },
    },
  },
  RO: {
    name: 'Romania',
    states: {
      B: { name: 'Bucharest', cities: ['Bucharest'] },
      CJ: { name: 'Cluj County', cities: ['Cluj-Napoca', 'Turda', 'Dej'] },
      IS: { name: 'Iași County', cities: ['Iași', 'Pașcani'] },
    },
  },
  BG: {
    name: 'Bulgaria',
    states: {
      S: { name: 'Sofia-Grad Province', cities: ['Sofia'] },
      PD: { name: 'Plovdiv Province', cities: ['Plovdiv', 'Asenovgrad', 'Karlovo'] },
      VAR: { name: 'Varna Province', cities: ['Varna', 'Devnya'] },
    },
  },
  GR: {
    name: 'Greece',
    states: {
      AT: { name: 'Attica', cities: ['Athens', 'Piraeus', 'Peristeri'] },
      KM: { name: 'Central Macedonia', cities: ['Thessaloniki', 'Kalamaria', 'Serres'] },
      PEL: { name: 'Peloponnese', cities: ['Patras', 'Kalamata'] },
    },
  },
  SI: {
    name: 'Slovenia',
    states: {
      LJ: { name: 'Ljubljana', cities: ['Ljubljana', 'Maribor', 'Celje'] },
      KR: { name: 'Gorenjska', cities: ['Kranj', 'Jesenice', 'Škofja Loka'] },
      CE: { name: 'Savinjska', cities: ['Celje', 'Velenje'] },
    },
  },
  HR: {
    name: 'Croatia',
    states: {
      ZG: { name: 'City of Zagreb', cities: ['Zagreb'] },
      ST: { name: 'Split-Dalmatia County', cities: ['Split', 'Kaštela', 'Solin'] },
      RI: { name: 'Primorje-Gorski Kotar County', cities: ['Rijeka', 'Opatija'] },
    },
  },
  EE: {
    name: 'Estonia',
    states: {
      HA: { name: 'Harju County', cities: ['Tallinn', 'Maardu', 'Keila'] },
      TA: { name: 'Tartu County', cities: ['Tartu', 'Elva', 'Kallaste'] },
      ID: { name: 'Ida-Viru County', cities: ['Narva', 'Kohtla-Järve'] },
    },
  },
  LV: {
    name: 'Latvia',
    states: {
      RIX: { name: 'Riga', cities: ['Riga'] },
      JEL: { name: 'Jelgava', cities: ['Jelgava', 'Dobele', 'Ozolnieki'] },
      DAU: { name: 'Daugavpils', cities: ['Daugavpils', 'Ilūkste'] },
    },
  },
  LT: {
    name: 'Lithuania',
    states: {
      VIL: { name: 'Vilnius County', cities: ['Vilnius', 'Ukmergė', 'Šalčininkai'] },
      KAU: { name: 'Kaunas County', cities: ['Kaunas', 'Jonava', 'Kėdainiai'] },
      KLA: { name: 'Klaipėda County', cities: ['Klaipėda', 'Kretinga'] },
    },
  },
  LU: {
    name: 'Luxembourg',
    states: { // Luxembourg is a small country, often treated as one region for shipping
      LX: { name: 'Luxembourg District', cities: ['Luxembourg City', 'Esch-sur-Alzette', 'Differdange'] },
      CL: { name: 'Clervaux Canton', cities: ['Clervaux', 'Troisvierges'] },
    },
  },
  MT: {
    name: 'Malta',
    states: { // Malta is a small country, often treated as one region for shipping
      ML: { name: 'Malta', cities: ['Valletta', 'Birkirkara', 'Mosta'] },
      GOZ: { name: 'Gozo and Comino', cities: ['Victoria (Rabat)', 'Nadur'] },
    },
  },
  CY: {
    name: 'Cyprus',
    states: { // Cyprus is a small country, often treated as one region for shipping
      NIC: { name: 'Nicosia District', cities: ['Nicosia', 'Limassol', 'Larnaca'] },
      LMS: { name: 'Limassol District', cities: ['Limassol', 'Episkopi'] },
    },
  },
  NZ: {
    name: 'New Zealand',
    states: {
      AKL: { name: 'Auckland Region', cities: ['Auckland', 'Manukau', 'Waitakere'] },
      WLG: { name: 'Wellington Region', cities: ['Wellington', 'Lower Hutt', 'Porirua'] },
      CAN: { name: 'Canterbury Region', cities: ['Christchurch', 'Timaru', 'Ashburton'] },
    },
  },
  AE: {
    name: 'United Arab Emirates',
    states: {
      AD: { name: 'Abu Dhabi', cities: ['Abu Dhabi', 'Al Ain'] },
      DXB: { name: 'Dubai', cities: ['Dubai'] },
      SHJ: { name: 'Sharjah', cities: ['Sharjah'] },
      AJM: { name: 'Ajman', cities: ['Ajman'] },
      RAK: { name: 'Ras Al Khaimah', cities: ['Ras Al Khaimah'] },
      FUJ: { name: 'Fujairah', cities: ['Fujairah'] },
      UMQ: { name: 'Umm Al Quwain', cities: ['Umm Al Quwain'] },
    },
  },
  IL: {
    name: 'Israel',
    states: {
      TA: { name: 'Tel Aviv District', cities: ['Tel Aviv', 'Rishon LeZion', 'Petah Tikva'] },
      JLM: { name: 'Jerusalem District', cities: ['Jerusalem', 'Beit Shemesh'] },
      HAI: { name: 'Haifa District', cities: ['Haifa', 'Hadera', 'Kiryat Ata'] },
    },
  },
  TR: {
    name: 'Turkey',
    states: {
      IST: { name: 'Istanbul Province', cities: ['Istanbul'] },
      ANK: { name: 'Ankara Province', cities: ['Ankara', 'Polatlı', 'Sincan'] },
      IZM: { name: 'İzmir Province', cities: ['İzmir', 'Manisa', 'Aydın'] },
    },
  },
  MX: {
    name: 'Mexico',
    states: {
      CMX: { name: 'Mexico City', cities: ['Mexico City'] },
      JAL: { name: 'Jalisco', cities: ['Guadalajara', 'Zapopan', 'Tlaquepaque'] },
      MEX: { name: 'State of Mexico', cities: ['Ecatepec de Morelos', 'Nezahualcóyotl'] },
    },
  },
  BR: {
    name: 'Brazil',
    states: {
      SP: { name: 'São Paulo', cities: ['São Paulo', 'Guarulhos', 'Campinas'] },
      RJ: { name: 'Rio de Janeiro', cities: ['Rio de Janeiro', 'Nova Iguaçu', 'Duque de Caxias'] },
      MG: { name: 'Minas Gerais', cities: ['Belo Horizonte', 'Uberlândia', 'Contagem'] },
    },
  },
  AR: {
    name: 'Argentina',
    states: {
      C: { name: 'Ciudad Autónoma de Buenos Aires', cities: ['Buenos Aires'] },
      B: { name: 'Buenos Aires Province', cities: ['La Plata', 'Mar del Plata', 'Bahía Blanca'] },
      CD: { name: 'Córdoba', cities: ['Córdoba', 'Río Cuarto', 'Villa Carlos Paz'] },
    },
  },
  ZA: {
    name: 'South Africa',
    states: {
      GT: { name: 'Gauteng', cities: ['Johannesburg', 'Pretoria', 'Soweto'] },
      WC: { name: 'Western Cape', cities: ['Cape Town', 'George', 'Paarl'] },
      KZN: { name: 'KwaZulu-Natal', cities: ['Durban', 'Pietermaritzburg', 'Richards Bay'] },
    },
  },
  BD: {
    name: 'Bangladesh',
    states: { // These are Divisions in Bangladesh
      BAR: { name: 'Barishal Division', cities: ['Barishal', 'Patuakhali', 'Bhola'] },
      CHT: { name: 'Chattogram Division', cities: ['Chattogram', 'Cumilla', 'Cox\'s Bazar', 'Brahmanbaria'] },
      DHA: { name: 'Dhaka Division', cities: ['Dhaka', 'Gazipur', 'Narayanganj', 'Mymensingh'] },
      KHL: { name: 'Khulna Division', cities: ['Khulna', 'Jessore', 'Kushtia', 'Satkhira'] },
      MYM: { name: 'Mymensingh Division', cities: ['Mymensingh', 'Jamalpur', 'Sherpur', 'Netrokona'] },
      RAJ: { name: 'Rajshahi Division', cities: ['Rajshahi', 'Bogra', 'Naogaon', 'Pabna'] },
      RANG: { name: 'Rangpur Division', cities: ['Rangpur', 'Dinajpur', 'Gaibandha', 'Lalmonirhat'] },
      SYL: { name: 'Sylhet Division', cities: ['Sylhet', 'Moulvibazar', 'Sunamganj', 'Habiganj'] },
    },
  },
};

// Your targeted countries
const targetedCountries = [
  "US", "CA", "GB", "AU", "DE", "FR", "IT", "ES", "NL", "PL",
  "SE", "NO", "FI", "DK", "IE", "PT", "BE", "CH", "AT", "CZ",
  "SK", "HU", "RO", "BG", "GR", "SI", "HR", "EE", "LV", "LT",
  "LU", "MT", "CY", "NZ", "AE", "IL", "TR", "MX", "BR", "AR",
  "ZA", "BD"
];


const App = () => {
  const [selectedCountryCode, setSelectedCountryCode] = useState('');
  const [selectedStateCode, setSelectedStateCode] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  const [countrySearch, setCountrySearch] = useState('');
  const [stateSearch, setStateSearch] = useState('');
  const [citySearch, setCitySearch] = useState('');

  const [filteredCountries, setFilteredCountries] = useState([]);
  const [filteredStates, setFilteredStates] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);

  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showStateDropdown, setShowStateDropdown] = useState(false);
  const [showCityDropdown, setShowCityDropdown] = useState(false);

  const countryRef = useRef(null);
  const stateRef = useRef(null);
  const cityRef = useRef(null);

  // Initial population of countries and filtering based on search
  useEffect(() => {
    // Filter targeted countries that exist in mock data and match search input
    const countries = targetedCountries
      .filter(code => mockGeoData[code]) // Ensure country exists in mock data
      .map(code => ({ code, name: mockGeoData[code].name }))
      .filter(country => country.name.toLowerCase().includes(countrySearch.toLowerCase()));
    setFilteredCountries(countries);
    // Show dropdown if there's a search term or if there are any countries to show
    setShowCountryDropdown(countrySearch.length > 0 || countries.length > 0);
  }, [countrySearch, targetedCountries]);

  // Update states when country changes or state search changes
  useEffect(() => {
    if (selectedCountryCode && mockGeoData[selectedCountryCode]) {
      // Get states for the selected country and filter based on search input
      const states = Object.entries(mockGeoData[selectedCountryCode].states || {})
        .map(([code, data]) => ({ code, name: data.name }))
        .filter(state => state.name.toLowerCase().includes(stateSearch.toLowerCase()));
      setFilteredStates(states);
      setShowStateDropdown(stateSearch.length > 0 || states.length > 0);
    } else {
      // Clear states if no country is selected or country data is missing
      setFilteredStates([]);
      setShowStateDropdown(false);
    }
    // Reset selections and search terms for dependent dropdowns
    setSelectedStateCode('');
    setSelectedCity('');
    setStateSearch('');
    setCitySearch('');
  }, [selectedCountryCode, stateSearch]);

  // Update cities when state changes or city search changes
  useEffect(() => {
    if (selectedCountryCode && selectedStateCode && mockGeoData[selectedCountryCode]?.states[selectedStateCode]) {
      // Get cities for the selected state and filter based on search input
      const cities = mockGeoData[selectedCountryCode].states[selectedStateCode].cities || []
        .filter(city => city.toLowerCase().includes(citySearch.toLowerCase()));
      setFilteredCities(cities);
      setShowCityDropdown(citySearch.length > 0 || cities.length > 0);
    } else {
      // Clear cities if no state is selected or state data is missing
      setFilteredCities([]);
      setShowCityDropdown(false);
    }
    // Reset selection and search term for dependent city dropdown
    setSelectedCity('');
    setCitySearch('');
  }, [selectedCountryCode, selectedStateCode, citySearch]);

  // Handle clicks outside dropdowns to close them
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if click is outside country input/dropdown
      if (countryRef.current && !countryRef.current.contains(event.target)) {
        setShowCountryDropdown(false);
      }
      // Check if click is outside state input/dropdown
      if (stateRef.current && !stateRef.current.contains(event.target)) {
        setShowStateDropdown(false);
      }
      // Check if click is outside city input/dropdown
      if (cityRef.current && !cityRef.current.contains(event.target)) {
        setShowCityDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handler for selecting a country from the dropdown
  const handleCountrySelect = (code, name) => {
    setSelectedCountryCode(code);
    setCountrySearch(name); // Update input field with selected country name
    setShowCountryDropdown(false); // Close dropdown
  };

  // Handler for selecting a state from the dropdown
  const handleStateSelect = (code, name) => {
    setSelectedStateCode(code);
    setStateSearch(name); // Update input field with selected state name
    setShowStateDropdown(false); // Close dropdown
  };

  // Handler for selecting a city from the dropdown
  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setCitySearch(city); // Update input field with selected city name
    setShowCityDropdown(false); // Close dropdown
  };

  // Handler for focusing on country input
  const handleCountryFocus = () => {
    setCountrySearch(''); // Clear search on focus to show all available options
    setShowCountryDropdown(true); // Open dropdown
  };

  // Handler for focusing on state input
  const handleStateFocus = () => {
    if (selectedCountryCode) { // Only enable if a country is selected
      setStateSearch(''); // Clear search on focus
      setShowStateDropdown(true); // Open dropdown
    }
  };

  // Handler for focusing on city input
  const handleCityFocus = () => {
    if (selectedStateCode) { // Only enable if a state is selected
      setCitySearch(''); // Clear search on focus
      setShowCityDropdown(true); // Open dropdown
    }
  };


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Shipping Location</h2>

        {/* Country Selection */}
        <div className="mb-4 relative" ref={countryRef}>
          <label htmlFor="country" className="block text-gray-700 text-sm font-semibold mb-2">Country</label>
          <input
            type="text"
            id="country"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Select or search country"
            value={countrySearch}
            onChange={(e) => {
              setCountrySearch(e.target.value);
              // If user types and the typed value doesn't match a filtered country,
              // reset the selected country to allow for new selection.
              if (!filteredCountries.some(c => c.name === e.target.value)) {
                setSelectedCountryCode('');
              }
            }}
            onFocus={handleCountryFocus}
          />
          {/* Country dropdown/autocomplete results */}
          {showCountryDropdown && filteredCountries.length > 0 && (
            <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-60 overflow-y-auto shadow-md">
              {filteredCountries.map((country) => (
                <div
                  key={country.code}
                  className="px-4 py-2 cursor-pointer hover:bg-blue-100"
                  onClick={() => handleCountrySelect(country.code, country.name)}
                >
                  {country.name}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* State/Province Selection */}
        <div className="mb-4 relative" ref={stateRef}>
          <label htmlFor="state" className="block text-gray-700 text-sm font-semibold mb-2">State/Province</label>
          <input
            type="text"
            id="state"
            className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${!selectedCountryCode ? 'bg-gray-200 cursor-not-allowed' : ''}`}
            placeholder={selectedCountryCode ? "Select or search state" : "Select a country first"}
            value={stateSearch}
            onChange={(e) => {
              setStateSearch(e.target.value);
              // If user types and the typed value doesn't match a filtered state,
              // reset the selected state to allow for new selection.
              if (!filteredStates.some(s => s.name === e.target.value)) {
                setSelectedStateCode('');
              }
            }}
            onFocus={handleStateFocus}
            disabled={!selectedCountryCode} /* Disable if no country is selected */
          />
          {/* State dropdown/autocomplete results */}
          {showStateDropdown && filteredStates.length > 0 && (
            <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-60 overflow-y-auto shadow-md">
              {filteredStates.map((state) => (
                <div
                  key={state.code}
                  className="px-4 py-2 cursor-pointer hover:bg-blue-100"
                  onClick={() => handleStateSelect(state.code, state.name)}
                >
                  {state.name}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* City Selection */}
        <div className="mb-4 relative" ref={cityRef}>
          <label htmlFor="city" className="block text-gray-700 text-sm font-semibold mb-2">City</label>
          <input
            type="text"
            id="city"
            className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${!selectedStateCode ? 'bg-gray-200 cursor-not-allowed' : ''}`}
            placeholder={selectedStateCode ? "Select or search city" : "Select a state first"}
            value={citySearch}
            onChange={(e) => {
              setCitySearch(e.target.value);
              // If user types and the typed value doesn't match a filtered city,
              // reset the selected city to allow for new selection.
              if (!filteredCities.includes(e.target.value)) {
                setSelectedCity('');
              }
            }}
            onFocus={handleCityFocus}
            disabled={!selectedStateCode} /* Disable if no state is selected */
          />
          {/* City dropdown/autocomplete results */}
          {showCityDropdown && filteredCities.length > 0 && (
            <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-60 overflow-y-auto shadow-md">
              {filteredCities.map((city) => (
                <div
                  key={city}
                  className="px-4 py-2 cursor-pointer hover:bg-blue-100"
                  onClick={() => handleCitySelect(city)}
                >
                  {city}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Display selected values */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">Selected Location:</h3>
          <p className="text-gray-700">
            Country: <span className="font-medium">{selectedCountryCode ? mockGeoData[selectedCountryCode]?.name : 'N/A'}</span>
          </p>
          <p className="text-gray-700">
            State: <span className="font-medium">{selectedStateCode ? mockGeoData[selectedCountryCode]?.states[selectedStateCode]?.name : 'N/A'}</span>
          </p>
          <p className="text-gray-700">
            City: <span className="font-medium">{selectedCity || 'N/A'}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
