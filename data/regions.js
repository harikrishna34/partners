const regions = {
  'Andhra Pradesh': [
    'Visakhapatnam',
    'Vijayawada',
    'Guntur',
    'Nellore',
    'Kurnool',
  ],
  'Arunachal Pradesh': ['Itanagar', 'Tawang', 'Ziro', 'Pasighat', 'Roing'],
  Assam: ['Guwahati', 'Dibrugarh', 'Silchar', 'Tezpur', 'Nagaon'],
  Bihar: ['Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur', 'Purnia'],
  Chhattisgarh: ['Raipur', 'Bhilai', 'Bilaspur', 'Durg', 'Korba'],
  Goa: ['Panaji', 'Margao', 'Vasco da Gama', 'Mapusa', 'Ponda'],
  Gujarat: ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar'],
  Haryana: ['Faridabad', 'Gurgaon', 'Panipat', 'Ambala', 'Rohtak'],
  'Himachal Pradesh': [
    'Shimla',
    'Manali',
    'Dharamshala',
    'Dalhousie',
    'Chamba',
  ],
  Jharkhand: ['Ranchi', 'Jamshedpur', 'Dhanbad', 'Bokaro', 'Hazaribagh'],
  Karnataka: ['Bengaluru', 'Mysuru', 'Mangalore', 'Hubli-Dharwad', 'Belgaum'],
  Kerala: ['Thiruvananthapuram', 'Kochi', 'Kozhikode', 'Thrissur', 'Kollam'],
  'Madhya Pradesh': ['Indore', 'Bhopal', 'Jabalpur', 'Gwalior', 'Ujjain'],
  Maharashtra: ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Aurangabad'],
  Manipur: ['Imphal', 'Ukhrul', 'Churachandpur', 'Thoubal', 'Senapati'],
  Meghalaya: ['Shillong', 'Cherrapunji', 'Tura', 'Jowai', 'Nongstoin'],
  Mizoram: ['Aizawl', 'Lunglei', 'Champhai', 'Kolasib', 'Serchhip'],
  Nagaland: ['Kohima', 'Dimapur', 'Mokokchung', 'Wokha', 'Tuensang'],
  Odisha: ['Bhubaneswar', 'Cuttack', 'Rourkela', 'Puri', 'Brahmapur'],
  Punjab: ['Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala', 'Bathinda'],
  Rajasthan: ['Jaipur', 'Jodhpur', 'Udaipur', 'Ajmer', 'Bikaner'],
  Sikkim: ['Gangtok', 'Pelling', 'Lachung', 'Ravangla', 'Namchi'],
  'Tamil Nadu': [
    'Chennai',
    'Coimbatore',
    'Madurai',
    'Tiruchirappalli',
    'Salem',
  ],
  Telangana: ['Hyderabad', 'Warangal', 'Nizamabad', 'Khammam', 'Karimnagar'],
  Tripura: ['Agartala', 'Udaipur', 'Dharmanagar', 'Kailashahar', 'Belonia'],
  'Uttar Pradesh': ['Kanpur', 'Lucknow', 'Agra', 'Varanasi', 'Prayagraj'],
  Uttarakhand: ['Dehradun', 'Haridwar', 'Rishikesh', 'Nainital', 'Mussoorie'],
  'West Bengal': ['Kolkata', 'Asansol', 'Siliguri', 'Durgapur', 'Bardhaman'],
  'Andaman and Nicobar Islands': [
    'Port Blair',
    'Havelock Island',
    'Neil Island',
    'Diglipur',
    'Mayabunder',
  ],
  Chandigarh: ['Chandigarh'],
  'Dadra and Nagar Haveli and Daman and Diu': ['Daman', 'Diu', 'Silvassa'],
  Lakshadweep: ['Kavaratti', 'Agatti', 'Amini', 'Andrott', 'Minicoy'],
  Delhi: [
    'New Delhi',
    'North Delhi',
    'South Delhi',
    'East Delhi',
    'West Delhi',
  ],
  Puducherry: ['Puducherry', 'Karaikal', 'Yanam', 'Mahe'],
  Ladakh: ['Leh', 'Kargil'],
};

export const getStates = () => {
  return Object.keys(regions);
};

export const getCities = (states) => {
  const cities = [];
  states.forEach((state) => {
    cities.push(...regions[state]);
  });
  return cities;
};

export const filterCitiesByStates = (states, cities) => {
  const newCities = [];
  states.forEach((state) => {
    newCities.push(...cities.filter((city) => regions[state].includes(city)));
  });
  return newCities;
};
