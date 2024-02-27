const categories = [
  {
    id: 'AKCS1',
    name: 'HEALTH_CARE_ASSISTANCE',
    alias: 'Health Care Assistance',
  },
  { id: 'AKCS3', name: 'DAILY_ASSISTANCE', alias: 'Daily Assistance' },
  {
    id: 'AKCS41',
    name: 'SOCIAL_ENGAGEMENTS_ASSISTANCE',
    alias: 'Social Engagements Assistance',
  },
  { id: 'AKCS5', name: 'OTHER_SERVICES', alias: 'Other Services' },
];

const subCategories = {
  AKCS1: [
    { id: 'AKCS11', name: 'DIAGNOSTICS', alias: 'Diagnostic Services' },
    {
      id: 'AKCS17',
      name: 'PLANNED_SURGERIES_AT_HOSPITALS',
      alias: 'Planned Surgeries at Hospitals',
    },
    {
      id: 'AKCS22',
      name: 'HOME_VISITS_BY_GENERAL_PHYSICIAN',
      alias: 'Home visits by General Physician',
    },
    {
      id: 'AKCS25',
      name: 'HOME_VISITS_BY_PHYSIOTHERAPIST',
      alias: 'Home visits by  Physiotherapist',
    },
    { id: 'AKCS10', name: 'PHARMACY', alias: 'Pharmacy / Medicines' },
    {
      id: 'AKCS26',
      name: 'DIAGNOSTICS_AT_HOME',
      alias: 'Diagnostics at Home',
    },
    {
      id: 'AKCS14',
      name: 'HOME_STAY_NURSE / HOME_STAY_HELP',
      alias: 'Home Stay Nurse',
    },
    {
      id: 'AKCS63',
      name: 'ACCOMPANY DOCTOR APPOINTMENT',
      alias: 'Accompany Doctor Appointment',
    },
    { id: 'AKCS66', name: 'OPTICAL SERVICES', alias: 'Optical Services' },
    { id: 'AKCS6', name: 'DOCTOR', alias: 'Doctor Appointments' },
    {
      id: 'AKCS65',
      name: 'HOMEOPATHY SERVICES',
      alias: 'Homeopathy Services',
    },
    {
      id: 'AKCS64',
      name: 'CARE MANAGER VISITS',
      alias: 'Care Manager Visits',
    },
    {
      id: 'AKCS69',
      name: 'SPEECH AND HEARING AIDS',
      alias: 'Speech and Hearing aids',
    },
    {
      id: 'AKCS68',
      name: "SURGICAL EQUIPMENT'S PURCHASE/RENTAL SERVICES",
      alias: "Surgical Equipment's Purchase/Rental Services",
    },
    {
      id: 'AKCS8',
      name: 'DOCTOR_SECOND_OPINIONS',
      alias: 'Doctor Second Opinions',
    },
    {
      id: 'AKCS62',
      name: 'HOME VISIT FOR WOUND CARE',
      alias: 'Home Visit For Wound Care',
    },
    { id: 'AKCS67', name: 'DENTAL SERVICES', alias: 'Dental Services' },
    {
      id: 'AKCS72',
      name: '24X7 CARE GIVER ASSISTANCE',
      alias: '24X7 Care Giver Assistance',
    },
    { id: 'AKCS000133', name: 'DIET_PLAN', alias: 'DIET_PLAN' },
    {
      id: 'AKCS000135',
      name: 'DR_VIRTUAL_CONSULTATION',
      alias: 'Dr Virtual Consultation',
    },
    {
      id: 'AKCS000136',
      name: 'AMBULANCE_SERVICES',
      alias: 'Ambulance Service',
    },
    { id: 'AKCS000138', name: 'OLD_AGE_HOME', alias: 'Old Age Home' },
    { id: 'AKCS000139', name: 'REHABILITATION', alias: 'Rehabilitation' },
    { id: 'AKCS000140', name: 'BLOOD_TEST', alias: 'Blood Test' },
    { id: 'AKCS000141', name: 'COVID_TEST', alias: 'Covid Test' },
    { id: 'AKCS000144', name: 'X_RAY', alias: 'X_Ray' },
  ],
  AKCS3: [
    {
      id: 'AKCS12',
      name: 'UTILITY_BILL_PAYMENTS',
      alias: 'Utility Bill Payments',
    },
    {
      id: 'AKCS16',
      name: 'APPLIANCE_SERVICE_AND_REPAIRS',
      alias: 'Appliance service and repairs',
    },
    { id: 'AKCS13', name: 'GROCERY_DELIVERY', alias: 'Grocery Delivery' },
    {
      id: 'AKCS15',
      name: 'HOME_CLEANING_SERVICES',
      alias: 'Home cleaning services',
    },
    {
      id: 'AKCS18',
      name: 'A/C SERVICE REPAIRS FIXING AND MAINTENANCE',
      alias: 'A/C Service  Repairs',
    },
    {
      id: 'AKCS29',
      name: 'HOME_INTERNET_SETUP/ WI-FI',
      alias: 'Home Internet setup/ Wi-Fi',
    },
    { id: 'AKCS20', name: 'FOOD_DELIVERY', alias: 'Food Delivery' },
    {
      id: 'AKCS34',
      name: 'REGULAR_MAID_SERVICE_ASSISTANCE',
      alias: 'Regular Maid Service',
    },
    {
      id: 'AKCS30',
      name: 'RELIGIOUS_SERVICES',
      alias: 'Religious Services',
    },
    { id: 'AKCS36', name: 'WELLNESS', alias: 'Wellness' },
    { id: 'AKCS31', name: 'HEALTH_INSURANCE', alias: 'Health Insurance' },
    { id: 'AKCS37', name: 'PLUMBER', alias: 'Plumber' },
    {
      id: 'AKCS44',
      name: 'PICKUP_DROP_RAILSTATION_BUSSTATION',
      alias: 'Pickup/Drop Railwaystation ,Busstation',
    },
    {
      id: 'AKCS43',
      name: 'AIRPORT_PICKUP_DROP',
      alias: 'AirPort PickUp/Drop',
    },
    { id: 'AKCS35', name: 'BEAUTY', alias: 'Beauty' },
    { id: 'AKCS46', name: 'CARPENTER', alias: 'Carpenter' },
    { id: 'AKCS33', name: 'LAUNDRY_SERVICES', alias: 'Laundry Services' },
    { id: 'AKCS45', name: 'ELECTRICIAN', alias: 'Electrician' },
    {
      id: 'AKCS71',
      name: 'REGULARCOOK SERVICE ASSISTANCE',
      alias: 'Regular Cook Service assistance',
    },
    {
      id: 'AKCS78',
      name: 'CAREMANAGER_ACCOMPANIED_UTILITY_BILL_PAYMENTS',
      alias: 'CareManager Accompanied Utility Bill Payments',
    },
    { id: 'AKCS000143', name: 'PAY_BILLS', alias: 'Pay Bills' },
  ],
  AKCS41: [
    {
      id: 'AKCS49',
      name: 'ESCORTED_ASSISTED_DAY_OUTINGS',
      alias: 'Escorted / Assisted Outings',
    },
    {
      id: 'AKCS47',
      name: 'ARRANGE_FOR_BIRTHDAY_AND_ANY_SPECIAL_DAYS_FOR_PARENTS',
      alias: 'Surprise events',
    },
    {
      id: 'AKCS48',
      name: 'PICNICS_AND_SOCIAL_GATHERING_INCLUDING_WELLNESS_PROGRAMS',
      alias: 'Picnics and Social gathering.',
    },
    {
      id: 'AKCS000142',
      name: 'FUN_SESSIONS_WITH_ANVAYAA',
      alias: 'Fun Sessions With Anvayaa',
    },
  ],
  AKCS5: [
    {
      id: 'AKCS50',
      name: 'LIBRARY_AND_BOOKS',
      alias: 'Library and Books',
    },
    { id: 'AKCS55', name: 'FOREX_SERVICES', alias: 'FOREX_SERVICES' },
    {
      id: 'AKCS56',
      name: 'PROPERTY_MANAGEMENT_ASSISTANCE',
      alias: 'Property Management',
    },
    { id: 'AKCS52', name: 'VISA', alias: 'Visa' },
    { id: 'AKCS54', name: 'TICKETING', alias: 'Ticketing' },
    { id: 'AKCS53', name: 'PASSPORT', alias: 'Passport' },
    { id: 'AKCS60', name: 'HOME SECURITY', alias: 'Home Security' },
    {
      id: 'AKCS75',
      name: 'PAINTING SERVICES',
      alias: 'Painting Services',
    },
    {
      id: 'AKCS74',
      name: 'WATER PROOFING ASSISTANCE',
      alias: 'Water Proofing Assistance',
    },
    { id: 'AKCS73', name: 'MASON ASSISTANCE', alias: 'Mason Assistance' },
    {
      id: 'AKCS000137',
      name: 'PLAN_RENEWAL_REQUEST',
      alias: 'Plan Renewal Request',
    },
  ],
};

const services = {
  AKCS22: [
    {
      id: 'AKCS000545',
      name: 'HOME_VISIT BY GENERAL PHYSICIAN',
      alias: 'Home Visit by General Physician',
    },
    {
      id: 'AKCS000150',
      name: 'PHYSICIAN_HOME VISIT',
      alias: 'Genral Physician Home Visit',
    },
    {
      id: 'AKCS000167',
      name: 'PHYSICIAN_HOME VISIT',
      alias: 'Physician Home Visit',
    },
    {
      id: 'AKCS000268',
      name: 'PERSONAL_CARE - BSC-12 HRS',
      alias: 'Personal Care - BSC-12 Hrs',
    },
    { id: 'AKCS000448', name: 'HOME_VISIT', alias: 'Home Visit' },
  ],
  AKCS14: [
    {
      id: 'AKCS000152',
      name: 'SHORT_TERM NURSING - INFUSION THERAPHY',
      alias: 'Short Term Nursing - Infusion Theraphy',
    },
    {
      id: 'AKCS000153',
      name: 'SHORT_TERM NURSING',
      alias: 'Short Term Nursing 1-6 Hrs',
    },
    { id: 'AKCS000156', name: 'CRITICAL_NURSE', alias: 'Critical Nurse' },
    {
      id: 'AKCS000158',
      name: 'SHORT_TERM  NURSE',
      alias: 'Short Term Nurse',
    },
    { id: 'AKCS000173', name: 'ANM_NURSE', alias: 'ANM Nurse' },
    { id: 'AKCS000174', name: 'GNM_NURSE', alias: 'GNM Nurse' },
    { id: 'AKCS000175', name: 'B.SC_NURSE', alias: 'B.SC Nurse' },
    {
      id: 'AKCS000183',
      name: 'PALLIATIVE_CARE - ANM',
      alias: 'Palliative Care - ANM',
    },
    {
      id: 'AKCS000184',
      name: 'PALLIATIVE_CARE - GNM',
      alias: 'Palliative Care - GNM',
    },
    {
      id: 'AKCS000185',
      name: 'PALLIATIVE_CARE - BSC',
      alias: 'Palliative Care - BSC',
    },
    {
      id: 'AKCS000186',
      name: 'PERSONAL_CARE - ANM',
      alias: 'Personal Care - ANM',
    },
    {
      id: 'AKCS000187',
      name: 'PERSONAL_CARE - GNM',
      alias: 'Personal Care - GNM',
    },
    {
      id: 'AKCS000188',
      name: 'PERSONAL_CARE - BSC',
      alias: 'Personal Care - BSC',
    },
    {
      id: 'AKCS000189',
      name: 'TRUMA_CARE - ANM',
      alias: 'Truma Care - ANM',
    },
    {
      id: 'AKCS000190',
      name: 'TRUMA_CARE - GNM',
      alias: 'Truma Care - GNM',
    },
    {
      id: 'AKCS000191',
      name: 'TRUMA_CARE - BSC',
      alias: 'Truma Care - BSC',
    },
    { id: 'AKCS000192', name: 'EYE_CARE - ANM', alias: 'Eye Care - ANM' },
    { id: 'AKCS000193', name: 'EYE_CARE - GNM', alias: 'Eye Care - GNM' },
    { id: 'AKCS000194', name: 'EYE_CARE - BSC', alias: 'Eye Care - BSC' },
    {
      id: 'AKCS000195',
      name: 'TRACHESTOMY_CARE - ANM',
      alias: 'Trachestomy Care - ANM',
    },
    {
      id: 'AKCS000196',
      name: 'TRACHESTOMY_CARE - GNM',
      alias: 'Trachestomy Care - GNM',
    },
    {
      id: 'AKCS000197',
      name: 'TRACHESTOMY_CARE - BSC',
      alias: 'Trachestomy Care - BSC',
    },
    {
      id: 'AKCS000198',
      name: 'POSTNATAL_OR POSTOPERATIVE CARE - ANM',
      alias: 'Postnatal or Postoperative Care - ANM',
    },
    {
      id: 'AKCS000199',
      name: 'POSTNATAL_OR POSTOPERATIVE CARE - GNM',
      alias: 'Postnatal or Postoperative Care - GNM',
    },
    {
      id: 'AKCS000200',
      name: 'POSTNATAL_OR POSTOPERATIVE CARE - BSC',
      alias: 'Postnatal or Postoperative Care - BSC',
    },
    {
      id: 'AKCS000201',
      name: 'STROCK_PATIENT CARE - ANM',
      alias: 'Strock Patient Care - ANM',
    },
    {
      id: 'AKCS000202',
      name: 'STROCK_PATIENT CARE - GNM',
      alias: 'Strock Patient Care - GNM',
    },
    {
      id: 'AKCS000203',
      name: 'STROCK_PATIENT CARE - BSC',
      alias: 'Strock Patient Care - BSC',
    },
    {
      id: 'AKCS000204',
      name: 'CARDIAC_CARE - ANM',
      alias: 'Cardiac Care - ANM',
    },
    {
      id: 'AKCS000205',
      name: 'CARDIAC_CARE - GNM',
      alias: 'Cardiac Care - GNM',
    },
    {
      id: 'AKCS000206',
      name: 'CARDIAC_CARE - BSC',
      alias: 'Cardiac Care - BSC',
    },
    {
      id: 'AKCS000207',
      name: 'FRACTURE_PRE & POST CARE - ANM',
      alias: 'Fracture Pre & Post Care - ANM',
    },
    {
      id: 'AKCS000208',
      name: 'FRACTURE_PRE & POST CARE - GNM',
      alias: 'Fracture Pre & Post Care - GNM',
    },
    {
      id: 'AKCS000209',
      name: 'FRACTURE_PRE & POST CARE - BSC',
      alias: 'Fracture Pre & Post Care - BSC',
    },
    {
      id: 'AKCS000210',
      name: 'BRONICAL_ASTHMA PATIENT CARE - ANM',
      alias: 'Bronical Asthma Patient Care - ANM',
    },
    {
      id: 'AKCS000211',
      name: 'BRONICAL_ASTHMA PATIENT CARE - GNM',
      alias: 'Bronical Asthma Patient Care - GNM',
    },
    {
      id: 'AKCS000212',
      name: 'BRONICAL_ASTHMA PATIENT CARE - BSC',
      alias: 'Bronical Asthma Patient Care - BSC',
    },
    {
      id: 'AKCS000213',
      name: 'DEMENTIA_CARE  & ALZHEIMER CARE - ANM',
      alias: 'Dementia Care  & Alzheimer Care - ANM',
    },
    {
      id: 'AKCS000214',
      name: 'DEMENTIA_CARE  & ALZHEIMER CARE - GNM',
      alias: 'Dementia Care  & Alzheimer Care - GNM',
    },
    {
      id: 'AKCS000215',
      name: 'DEMENTIA_CARE & ALZHEIMER CARE - BSC',
      alias: 'Dementia Care & Alzheimer Care - BSC',
    },
    {
      id: 'AKCS000216',
      name: 'VAITAL_MONITOR - ANM',
      alias: 'Vaital Monitor - ANM',
    },
    {
      id: 'AKCS000217',
      name: 'VAITAL_MONITOR - GNM',
      alias: 'Vaital Monitor - Gnm',
    },
    {
      id: 'AKCS000218',
      name: 'VAITAL_MONITOR - BSC',
      alias: 'Vaital Monitor - BSC',
    },
    {
      id: 'AKCS000219',
      name: 'KIDNEY_& LIVER POSTOPERATIVE CARE - ANM',
      alias: 'Kidney & liver Postoperative Care - ANM',
    },
    {
      id: 'AKCS000220',
      name: 'KIDNEY_& LIVER POSTOPERATIVE CARE - GNM',
      alias: 'Kidney & liver Postoperative Care - GNM',
    },
    {
      id: 'AKCS000221',
      name: 'KIDNEY_& LIVER POSTOPERATIVE CARE - BSC',
      alias: 'Kidney & Liver Postoperative Care - BSC',
    },
    {
      id: 'AKCS000222',
      name: 'GENERAL_HOSPITAL VISIT - ANM',
      alias: 'General Hospital Visit - ANM',
    },
    {
      id: 'AKCS000223',
      name: 'GENERAL_HOSPITAL VISIT - GNM',
      alias: 'General Hospital Visit - GNM',
    },
    {
      id: 'AKCS000224',
      name: 'GENERAL_HOSPITAL VISIT - BSC',
      alias: 'General Hospital Visit - BSC',
    },
    {
      id: 'AKCS000225',
      name: 'NEURO_PATIENT CARE - ANM',
      alias: 'Neuro Patient Care - ANM',
    },
    {
      id: 'AKCS000226',
      name: 'NEURO_PATIENT CARE - GNM',
      alias: 'Neuro Patient Care - GNM',
    },
    {
      id: 'AKCS000227',
      name: 'NEURO_PATIENT CARE - BSC',
      alias: 'Neuro Patient Care - BSC',
    },
    {
      id: 'AKCS000228',
      name: 'RYLSE_TUBE INSERTION  - ANM',
      alias: 'Rylse Tube Insertion  - ANM',
    },
    {
      id: 'AKCS000229',
      name: 'RYLSE_TUBE INSERTION  - GNM',
      alias: 'Rylse Tube Insertion  - GNM',
    },
    {
      id: 'AKCS000230',
      name: 'RYLSE_TUBE INSERTION  - BSC',
      alias: 'Rylse Tube Insertion  - BSC',
    },
    {
      id: 'AKCS000231',
      name: 'RYLSE_TUBE FEEDING  - ANM',
      alias: 'Rylse Tube Feeding  - ANM',
    },
    {
      id: 'AKCS000232',
      name: 'RYLSE_TUBE FEEDING  - GNM',
      alias: 'Rylse Tube Feeding  - GNM',
    },
    {
      id: 'AKCS000233',
      name: 'RYLSE_TUBE FEEDING  - BSC',
      alias: 'Rylse Tube Feeding  - BSC',
    },
    {
      id: 'AKCS000234',
      name: 'URINE_BAG CHANGE - ANM',
      alias: 'Urine Bag Change - ANM',
    },
    {
      id: 'AKCS000235',
      name: 'URINE_BAG CHANGE - GNM',
      alias: 'Urine Bag Change - GNM',
    },
    {
      id: 'AKCS000236',
      name: 'URINE_BAG CHANGE - BSC',
      alias: 'Urine Bag Change - BSC',
    },
    {
      id: 'AKCS000237',
      name: 'IV_INJECTIONS - ANM',
      alias: 'IV Injections - ANM',
    },
    {
      id: 'AKCS000238',
      name: 'IV_INJECTIONS - GNM',
      alias: 'IV Injections - GNM',
    },
    {
      id: 'AKCS000239',
      name: 'IV_INJECTIONS - BSC',
      alias: 'IV Injections - BSC',
    },
    {
      id: 'AKCS000240',
      name: 'INFUSION_THERAPHY - ANM',
      alias: 'Infusion Theraphy - ANM',
    },
    {
      id: 'AKCS000241',
      name: 'INFUSION_THERAPHY - GNM',
      alias: 'Infusion Theraphy - GNM',
    },
    {
      id: 'AKCS000242',
      name: 'INFUSION_THERAPHY - BSC',
      alias: 'Infusion Theraphy - BSC',
    },
    {
      id: 'AKCS000243',
      name: 'DRESSING_MINOR UPTO 4 PADS - GNM',
      alias: 'Dressing Minor upto 4 pads - GNM',
    },
    {
      id: 'AKCS000244',
      name: 'DRESSING_MINOR UPTO 4 PADS - ANM',
      alias: 'Dressing Minor upto 4 pads - ANM',
    },
    {
      id: 'AKCS000245',
      name: 'DRESSING_MINOR UPTO 4 PADS - BSC',
      alias: 'Dressing Minor upto 4 pads - BSC',
    },
    {
      id: 'AKCS000246',
      name: 'DRESSING_MAJOR MORE THAN 4 PADS - ANM',
      alias: 'Dressing Major more than 4 pads - ANM',
    },
    {
      id: 'AKCS000247',
      name: 'DRESSING_MAJOR MORE THAN 4 PADS - GNM',
      alias: 'Dressing Major more than 4 pads - GNM',
    },
    {
      id: 'AKCS000248',
      name: 'DRESSING_MAJOR MORE THAN 4 PADS - BSC',
      alias: 'Dressing Major more than 4 pads - BSC',
    },
    {
      id: 'AKCS000249',
      name: 'CATHETRIZATION_CARE - ANM',
      alias: 'Cathetrization Care - ANM',
    },
    {
      id: 'AKCS000250',
      name: 'CATHETRIZATION_CARE - GNM',
      alias: 'Cathetrization Care - GNM',
    },
    {
      id: 'AKCS000251',
      name: 'CATHETRIZATION_CARE - BSC',
      alias: 'Cathetrization Care - BSC',
    },
    {
      id: 'AKCS000252',
      name: 'PALLIATIVE_ANM - 12 HRS',
      alias: 'Palliative ANM 12 HRS',
    },
    {
      id: 'AKCS000253',
      name: 'CANCER_CARE - GNM',
      alias: 'Cancer Care - GNM',
    },
    {
      id: 'AKCS000254',
      name: 'CANCER_CARE - BSC',
      alias: 'Cancer Care - BSC',
    },
    {
      id: 'AKCS000255',
      name: 'UNCONCIOUS_CARE - GNM',
      alias: 'Unconcious Care - GNM',
    },
    {
      id: 'AKCS000256',
      name: 'UNCONCIOUS_CARE - BSC',
      alias: 'Unconcious Care - BSC',
    },
    { id: 'AKCS000257', name: 'ICU_CARE - GNM', alias: 'ICU Care - GNM' },
    { id: 'AKCS000258', name: 'ICU_CARE - BSC', alias: 'ICU Care - BSC' },
    { id: 'AKCS000259', name: 'BI_PAP - GNM', alias: 'BI Pap - GNM' },
    { id: 'AKCS000260', name: 'BI_PAP - BSC', alias: 'BI Pap - BSC' },
    { id: 'AKCS000261', name: 'CI_PAP - GNM', alias: 'CI Pap - GNM' },
    { id: 'AKCS000262', name: 'CI_PAP - BSC', alias: 'CI Pap - BSC' },
    {
      id: 'AKCS000263',
      name: 'VENTILATOR_PATIENT CARE - BSC',
      alias: 'Ventilator Patient Care - BSC',
    },
    {
      id: 'AKCS000264',
      name: 'PERSONAL_CARE - ANM-12 HRS',
      alias: 'Personal Care - ANM-12 HRS',
    },
    {
      id: 'AKCS000265',
      name: 'PERSONAL_CARE - ANM-24 HRS',
      alias: 'Personal Care - ANM-24 HRS',
    },
    {
      id: 'AKCS000266',
      name: 'PERSONAL_CARE - GNM-12 HRS',
      alias: 'Personal Care - GNM-12 Hrs',
    },
    {
      id: 'AKCS000267',
      name: 'PERSONAL_CARE - GNM-24 HRS',
      alias: 'Personal Care - GNM-24 Hrs',
    },
    {
      id: 'AKCS000269',
      name: 'PERSONAL_CARE - BSC-12 HRS',
      alias: 'Personal Care - BSC-12 Hrs',
    },
    {
      id: 'AKCS000270',
      name: 'PERSONAL_CARE - BSC-24 HRS',
      alias: 'Personal Care - BSC-24 Hrs',
    },
    {
      id: 'AKCS000271',
      name: 'PALLIATIVE_CARE - ANM -12 HRS',
      alias: 'Palliative Care - ANM -12 HRS',
    },
    {
      id: 'AKCS000272',
      name: 'PALLIATIVE_CARE - ANM -24 HRS',
      alias: 'Palliative Care - ANM -24 HRS',
    },
    {
      id: 'AKCS000273',
      name: 'PALLIATIVE_CARE - GNM-12 HRS',
      alias: 'Palliative Care - GNM-12 Hrs',
    },
    {
      id: 'AKCS000274',
      name: 'PALLIATIVE_CARE - GNM-24 HRS',
      alias: 'Palliative Care - GNM-24 Hrs',
    },
    {
      id: 'AKCS000275',
      name: 'PALLIATIVE_CARE - BSC-12 HRS',
      alias: 'Palliative Care - BSC-12 Hrs',
    },
    {
      id: 'AKCS000276',
      name: 'PALLIATIVE_CARE - BSC-24 HRS',
      alias: 'Palliative Care - BSC-24 Hrs',
    },
    {
      id: 'AKCS000277',
      name: 'TRUMA_CARE - ANM-24 HRS',
      alias: 'Truma Care - ANM-24 HRS',
    },
    {
      id: 'AKCS000278',
      name: 'TRUMA_CARE - GNM-12 HRS',
      alias: 'Truma Care - GNM-12 Hrs',
    },
    {
      id: 'AKCS000279',
      name: 'TRUMA_CARE - ANM-12 HRS',
      alias: 'Truma Care - ANM-12 HRS',
    },
    {
      id: 'AKCS000280',
      name: 'TRUMA_CARE - GNM-24 HRS',
      alias: 'Truma Care - GNM-24 Hrs',
    },
    {
      id: 'AKCS000281',
      name: 'TRUMA_CARE - BSC-12 HRS',
      alias: 'Truma Care - BSC-12 Hrs',
    },
    {
      id: 'AKCS000282',
      name: 'TRUMA_CARE - BSC-24 HRS',
      alias: 'Truma Care - BSC-24 Hrs',
    },
    {
      id: 'AKCS000283',
      name: 'EYE_CARE - ANM-12 HRS',
      alias: 'Eye Care - ANM-12 HRS',
    },
    {
      id: 'AKCS000284',
      name: 'EYE_CARE - ANM-24 HRS',
      alias: 'Eye Care - ANM-24 HRS',
    },
    {
      id: 'AKCS000285',
      name: 'EYE_CARE - GNM-12 HRS',
      alias: 'Eye Care - GNM-12 Hrs',
    },
    {
      id: 'AKCS000286',
      name: 'EYE_CARE - GNM-24 HRS',
      alias: 'Eye Care - GNM-24 Hrs',
    },
    {
      id: 'AKCS000287',
      name: 'EYE_CARE - BSC-12 HRS',
      alias: 'Eye Care - BSC-12 Hrs',
    },
    {
      id: 'AKCS000288',
      name: 'EYE_CARE - BSC-24 HRS',
      alias: 'Eye Care - BSC-24 Hrs',
    },
    {
      id: 'AKCS000289',
      name: 'TRACHESTOMY_CARE - ANM-12 HRS',
      alias: 'Trachestomy Care - ANM-12 HRS',
    },
    {
      id: 'AKCS000290',
      name: 'TRACHESTOMY_CARE - ANM-24 HRS',
      alias: 'Trachestomy Care - ANM-24 HRS',
    },
    {
      id: 'AKCS000291',
      name: 'TRACHESTOMY_CARE - GNM-12 HRS',
      alias: 'Trachestomy Care - GNM-12 Hrs',
    },
    {
      id: 'AKCS000292',
      name: 'TRACHESTOMY_CARE - GNM-24 HRS',
      alias: 'Trachestomy Care - GNM-24 Hrs',
    },
    {
      id: 'AKCS000293',
      name: 'TRACHESTOMY_CARE - BSC-12 HRS',
      alias: 'Trachestomy Care - BSC-12 Hrs',
    },
    {
      id: 'AKCS000294',
      name: 'TRACHESTOMY_CARE - BSC-24 HRS',
      alias: 'Trachestomy Care - BSC-24 Hrs',
    },
    {
      id: 'AKCS000295',
      name: 'POSTNATAL_OR POSTOPERATIVE CARE - ANM-12 HRS',
      alias: 'Postnatal or Postoperative Care - ANM-12 HRS',
    },
    {
      id: 'AKCS000296',
      name: 'POSTNATAL_OR POSTOPERATIVE CARE - ANM-24 HRS',
      alias: 'Postnatal or Postoperative Care - ANM-24 HRS',
    },
    {
      id: 'AKCS000297',
      name: 'POSTNATAL_OR POSTOPERATIVE CARE - GNM-12 HRS',
      alias: 'Postnatal or Postoperative Care - GNM-12 Hrs',
    },
    {
      id: 'AKCS000298',
      name: 'POSTNATAL_OR POSTOPERATIVE CARE - GNM-24 HRS',
      alias: 'Postnatal or Postoperative Care - GNM-24 Hrs',
    },
    {
      id: 'AKCS000299',
      name: 'POSTNATAL_OR POSTOPERATIVE CARE - BSC-12 HRS',
      alias: 'Postnatal or Postoperative Care - BSC-12 Hrs',
    },
    {
      id: 'AKCS000300',
      name: 'POSTNATAL_OR POSTOPERATIVE CARE - BSC-24 HRS',
      alias: 'Postnatal or Postoperative Care - BSC-24 Hrs',
    },
    {
      id: 'AKCS000301',
      name: 'STROCK_PATIENT CARE - ANM-12 HRS',
      alias: 'Strock Patient Care - ANM-12 HRS',
    },
    {
      id: 'AKCS000302',
      name: 'STROCK_PATIENT CARE - ANM-24 HRS',
      alias: 'Strock Patient Care - ANM-24 HRS',
    },
    {
      id: 'AKCS000303',
      name: 'STROCK_PATIENT CARE - GNM-12 HRS',
      alias: 'Strock Patient Care - GNM-12 Hrs',
    },
    {
      id: 'AKCS000304',
      name: 'STROCK_PATIENT CARE - GNM-24 HRS',
      alias: 'Strock Patient Care - GNM-24 Hrs',
    },
    {
      id: 'AKCS000305',
      name: 'STROCK_PATIENT CARE - BSC-12 HRS',
      alias: 'Strock Patient Care - BSC-12 Hrs',
    },
    {
      id: 'AKCS000306',
      name: 'STROCK_PATIENT CARE - BSC-24 HRS',
      alias: 'Strock Patient Care - BSC-24 Hrs',
    },
    {
      id: 'AKCS000307',
      name: 'CARDIAC_CARE - ANM-12 HRS',
      alias: 'Cardiac Care - ANM-12 HRS',
    },
    {
      id: 'AKCS000308',
      name: 'CARDIAC_CARE - ANM-24 HRS',
      alias: 'Cardiac Care - ANM-24 HRS',
    },
    {
      id: 'AKCS000309',
      name: 'CARDIAC_CARE - GNM-12 HRS',
      alias: 'Cardiac Care - GNM-12 Hrs',
    },
    {
      id: 'AKCS000310',
      name: 'CARDIAC_CARE - GNM-24 HRS',
      alias: 'Cardiac Care - GNM-24 Hrs',
    },
    {
      id: 'AKCS000311',
      name: 'CARDIAC_CARE - BSC-12 HRS',
      alias: 'Cardiac Care - BSC-12 Hrs',
    },
    {
      id: 'AKCS000312',
      name: 'CARDIAC_CARE - BSC-24 HRS',
      alias: 'Cardiac Care - BSC-24 Hrs',
    },
    {
      id: 'AKCS000313',
      name: 'FRACTURE_PRE & POST CARE - ANM-12 HRS',
      alias: 'Fracture Pre & Post Care - ANM-12 HRS',
    },
    {
      id: 'AKCS000314',
      name: 'FRACTURE_PRE & POST CARE - ANM-24 HRS',
      alias: 'Fracture Pre & Post Care - ANM-24 HRS',
    },
    {
      id: 'AKCS000315',
      name: 'FRACTURE_PRE & POST CARE - GNM-12 HRS',
      alias: 'Fracture Pre & Post Care - GNM-12 Hrs',
    },
    {
      id: 'AKCS000316',
      name: 'FRACTURE_PRE & POST CARE - GNM-24 HRS',
      alias: 'Fracture Pre & Post Care - GNM-24 Hrs',
    },
    {
      id: 'AKCS000317',
      name: 'FRACTURE_PRE & POST CARE - BSC-12 HRS',
      alias: 'Fracture Pre & Post Care - BSC-12 Hrs',
    },
    {
      id: 'AKCS000318',
      name: 'FRACTURE_PRE & POST CARE - BSC-24 HRS',
      alias: 'Fracture Pre & Post Care - BSC-24 Hrs',
    },
    {
      id: 'AKCS000319',
      name: 'BRONICAL_ASTHMA PATIENT CARE - ANM-12 HRS',
      alias: 'Bronical Asthma Patient Care - ANM-12 HRS',
    },
    {
      id: 'AKCS000320',
      name: 'BRONICAL_ASTHMA PATIENT CARE - ANM-24 HRS',
      alias: 'Bronical Asthma Patient Care - ANM-24 HRS',
    },
    {
      id: 'AKCS000321',
      name: 'BRONICAL_ASTHMA PATIENT CARE - GNM-12 HRS',
      alias: 'Bronical Asthma Patient Care - GNM-12 Hrs',
    },
    {
      id: 'AKCS000322',
      name: 'BRONICAL_ASTHMA PATIENT CARE - GNM-24 HRS',
      alias: 'Bronical Asthma Patient Care - GNM-24 Hrs',
    },
    {
      id: 'AKCS000323',
      name: 'BRONICAL_ASTHMA PATIENT CARE - BSC-12 HRS',
      alias: 'Bronical Asthma Patient Care - BSC-12 Hrs',
    },
    {
      id: 'AKCS000324',
      name: 'BRONICAL_ASTHMA PATIENT CARE - BSC-24 HRS',
      alias: 'Bronical Asthma Patient Care - BSC-24 Hrs',
    },
    {
      id: 'AKCS000325',
      name: 'MENTAL_DISORDER LIKE DEMENTIA, ALZHEIMER CARE - ANM-12 HRS',
      alias: 'mental disorder like Dementia, Alzheimer Care - ANM-12 HRS',
    },
    {
      id: 'AKCS000326',
      name: 'MENTAL_DISORDER LIKE DEMENTIA, ALZHEIMER CARE - ANM-24 HRS',
      alias: 'mental disorder like Dementia, Alzheimer Care - ANM-24 HRS',
    },
    {
      id: 'AKCS000327',
      name: 'MENTAL_DISORDER LIKE DEMENTIA, ALZHEIMER CARE - GNM-12 HRS',
      alias: 'mental disorder like Dementia, Alzheimer Care - GNM-12 Hrs',
    },
    {
      id: 'AKCS000328',
      name: 'MENTAL_DISORDER LIKE DEMENTIA, ALZHEIMER CARE - GNM-24 HRS',
      alias: 'mental disorder like Dementia, Alzheimer Care - GNM-24 Hrs',
    },
    {
      id: 'AKCS000329',
      name: 'MENTAL_DISORDER LIKE DEMENTIA, ALZHEIMER CARE - BSC-12 HRS',
      alias: 'mental disorder like Dementia, Alzheimer Care - BSC-12 Hrs',
    },
    {
      id: 'AKCS000330',
      name: 'MENTAL_DISORDER LIKE DEMENTIA, ALZHEIMER CARE - BSC-24 HRS',
      alias: 'mental disorder like Dementia, Alzheimer Care - BSC-24 Hrs',
    },
    {
      id: 'AKCS000331',
      name: 'VAITAL_MONITOR - ANM-12 HRS',
      alias: 'Vaital Monitor - ANM-12 HRS',
    },
    {
      id: 'AKCS000332',
      name: 'VAITAL_MONITOR - ANM-24 HRS',
      alias: 'Vaital Monitor - ANM-24 HRS',
    },
    {
      id: 'AKCS000333',
      name: 'VAITAL_MONITOR - GNM-12 HRS',
      alias: 'Vaital Monitor - GNM-12 Hrs',
    },
    {
      id: 'AKCS000334',
      name: 'VAITAL_MONITOR - GNM-24 HRS',
      alias: 'Vaital Monitor - GNM-24 Hrs',
    },
    {
      id: 'AKCS000335',
      name: 'VAITAL_MONITOR - BSC-12 HRS',
      alias: 'Vaital Monitor - BSC-12 Hrs',
    },
    {
      id: 'AKCS000336',
      name: 'VAITAL_MONITOR - BSC-24 HRS',
      alias: 'Vaital Monitor - BSC-24 Hrs',
    },
    {
      id: 'AKCS000337',
      name: 'KIDNEY_& LIVER POSTOPERATIVE CARE - ANM-12 HRS',
      alias: 'Kidney & liver Postoperative Care - ANM-12 HRS',
    },
    {
      id: 'AKCS000338',
      name: 'KIDNEY_& LIVER POSTOPERATIVE CARE - ANM-24 HRS',
      alias: 'Kidney & liver Postoperative Care - ANM-24 HRS',
    },
    {
      id: 'AKCS000339',
      name: 'KIDNEY_& LIVER POSTOPERATIVE CARE - GNM-12 HRS',
      alias: 'Kidney & liver Postoperative Care - GNM-12 Hrs',
    },
    {
      id: 'AKCS000340',
      name: 'KIDNEY_& LIVER POSTOPERATIVE CARE - GNM-24 HRS',
      alias: 'Kidney & liver Postoperative Care - GNM-24 Hrs',
    },
    {
      id: 'AKCS000341',
      name: 'KIDNEY_& LIVER POSTOPERATIVE CARE - BSC-24 HRS',
      alias: 'Kidney & liver Postoperative Care - BSC-24 Hrs',
    },
    {
      id: 'AKCS000342',
      name: 'KIDNEY_& LIVER POSTOPERATIVE CARE - BSC-12 HRS',
      alias: 'Kidney & liver Postoperative Care - BSC-12 Hrs',
    },
    {
      id: 'AKCS000343',
      name: 'GENERAL_HOSPITAL VISIT - ANM-12 HRS',
      alias: 'General Hospital Visit - ANM-12 HRS',
    },
    {
      id: 'AKCS000344',
      name: 'GENERAL_HOSPITAL VISIT - ANM-24 HRS',
      alias: 'General Hospital Visit - ANM-24 HRS',
    },
    {
      id: 'AKCS000345',
      name: 'GENERAL_HOSPITAL VISIT - GNM-12 HRS',
      alias: 'General Hospital Visit - GNM-12 Hrs',
    },
    {
      id: 'AKCS000346',
      name: 'GENERAL_HOSPITAL VISIT - GNM-24 HRS',
      alias: 'General Hospital Visit - GNM-24 Hrs',
    },
    {
      id: 'AKCS000347',
      name: 'GENERAL_HOSPITAL VISIT - BSC-12 HRS',
      alias: 'General Hospital Visit - BSC-12 Hrs',
    },
    {
      id: 'AKCS000348',
      name: 'GENERAL_HOSPITAL VISIT - BSC-24 HRS',
      alias: 'General Hospital Visit - BSC-24 Hrs',
    },
    {
      id: 'AKCS000349',
      name: 'NEURO_PATIENT CARE - ANM-12 HRS',
      alias: 'Neuro Patient Care - ANM-12 HRS',
    },
    {
      id: 'AKCS000350',
      name: 'NEURO_PATIENT CARE - ANM-24 HRS',
      alias: 'Neuro Patient Care - ANM-24 HRS',
    },
    {
      id: 'AKCS000351',
      name: 'NEURO_PATIENT CARE - GNM-12 HRS',
      alias: 'Neuro Patient Care - GNM-12 Hrs',
    },
    {
      id: 'AKCS000352',
      name: 'NEURO_PATIENT CARE - GNM-24 HRS',
      alias: 'Neuro Patient Care - GNM-24 Hrs',
    },
    {
      id: 'AKCS000353',
      name: 'NEURO_PATIENT CARE - BSC-12 HRS',
      alias: 'Neuro Patient Care - BSC-12 Hrs',
    },
    {
      id: 'AKCS000354',
      name: 'NEURO_PATIENT CARE - BSC-24 HRS',
      alias: 'Neuro Patient Care - BSC-24 Hrs',
    },
    {
      id: 'AKCS000355',
      name: 'RYLSE_TUBE INSERTION  - ANM-12 HRS',
      alias: 'Rylse Tube Insertion  - ANM-12 HRS',
    },
    {
      id: 'AKCS000356',
      name: 'RYLSE_TUBE INSERTION  - ANM-24 HRS',
      alias: 'Rylse Tube Insertion  - ANM-24 HRS',
    },
    {
      id: 'AKCS000357',
      name: 'RYLSE_TUBE INSERTION  - GNM-12 HRS',
      alias: 'Rylse Tube Insertion  - GNM-12 Hrs',
    },
    {
      id: 'AKCS000358',
      name: 'RYLSE_TUBE INSERTION  - GNM-24 HRS',
      alias: 'Rylse Tube Insertion  - GNM-24 Hrs',
    },
    {
      id: 'AKCS000359',
      name: 'RYLSE_TUBE INSERTION  - BSC-12 HRS',
      alias: 'Rylse Tube Insertion  - BSC-12 Hrs',
    },
    {
      id: 'AKCS000360',
      name: 'RYLSE_TUBE INSERTION  - BSC-24 HRS',
      alias: 'Rylse Tube Insertion  - BSC-24 Hrs',
    },
    {
      id: 'AKCS000361',
      name: 'RYLSE_TUBE FEEDING  - ANM-12 HRS',
      alias: 'Rylse Tube Feeding  - ANM-12 HRS',
    },
    {
      id: 'AKCS000362',
      name: 'RYLSE_TUBE FEEDING  - ANM-24 HRS',
      alias: 'Rylse Tube Feeding  - ANM-24 HRS',
    },
    {
      id: 'AKCS000363',
      name: 'RYLSE_TUBE FEEDING  - GNM-12 HRS',
      alias: 'Rylse Tube Feeding  - GNM-12 Hrs',
    },
    {
      id: 'AKCS000364',
      name: 'RYLSE_TUBE FEEDING  - GNM-24 HRS',
      alias: 'Rylse Tube Feeding  - GNM-24 Hrs',
    },
    {
      id: 'AKCS000365',
      name: 'RYLSE_TUBE FEEDING  - BSC-12 HRS',
      alias: 'Rylse Tube Feeding  - BSC-12 Hrs',
    },
    {
      id: 'AKCS000366',
      name: 'RYLSE_TUBE FEEDING  - BSC-24 HRS',
      alias: 'Rylse Tube Feeding  - BSC-24 Hrs',
    },
    {
      id: 'AKCS000367',
      name: 'URINE_BAG CHANGE - ANM-12 HRS',
      alias: 'Urine Bag Change - ANM-12 HRS',
    },
    {
      id: 'AKCS000368',
      name: 'URINE_BAG CHANGE - ANM-24 HRS',
      alias: 'Urine Bag Change - ANM-24 HRS',
    },
    {
      id: 'AKCS000369',
      name: 'URINE_BAG CHANGE - GNM-12 HRS',
      alias: 'Urine Bag Change - GNM-12 Hrs',
    },
    {
      id: 'AKCS000370',
      name: 'URINE_BAG CHANGE - GNM-24 HRS',
      alias: 'Urine Bag Change - GNM-24 Hrs',
    },
    {
      id: 'AKCS000371',
      name: 'URINE_BAG CHANGE - BSC-12 HRS',
      alias: 'Urine Bag Change - BSC-12 Hrs',
    },
    {
      id: 'AKCS000372',
      name: 'URINE_BAG CHANGE - BSC-24 HRS',
      alias: 'Urine Bag Change - BSC-24 Hrs',
    },
    {
      id: 'AKCS000373',
      name: 'IV_INJECTIONS - ANM-12 HRS',
      alias: 'IV Injections - ANM-12 HRS',
    },
    {
      id: 'AKCS000374',
      name: 'IV_INJECTIONS - ANM-24 HRS',
      alias: 'IV Injections - ANM-24 HRS',
    },
    {
      id: 'AKCS000375',
      name: 'IV_INJECTIONS - GNM-12 HRS',
      alias: 'IV Injections - GNM-12 Hrs',
    },
    {
      id: 'AKCS000376',
      name: 'IV_INJECTIONS - GNM-24 HRS',
      alias: 'IV Injections - GNM-24 Hrs',
    },
    {
      id: 'AKCS000377',
      name: 'IV_INJECTIONS - BSC-12 HRS',
      alias: 'IV Injections - BSC-12 Hrs',
    },
    {
      id: 'AKCS000378',
      name: 'IV_INJECTIONS - BSC-24 HRS',
      alias: 'IV Injections - BSC-24 Hrs',
    },
    {
      id: 'AKCS000379',
      name: 'INFUSION_THERAPHY - ANM-12 HRS',
      alias: 'Infusion Theraphy - ANM-12 HRS',
    },
    {
      id: 'AKCS000380',
      name: 'INFUSION_THERAPHY - ANM-24 HRS',
      alias: 'Infusion Theraphy - ANM-24 HRS',
    },
    {
      id: 'AKCS000381',
      name: 'INFUSION_THERAPHY - GNM-12 HRS',
      alias: 'Infusion Theraphy - GNM-12 Hrs',
    },
    {
      id: 'AKCS000382',
      name: 'INFUSION_THERAPHY - GNM-24 HRS',
      alias: 'Infusion Theraphy - GNM-24 Hrs',
    },
    {
      id: 'AKCS000383',
      name: 'INFUSION_THERAPHY - BSC-12 HRS',
      alias: 'Infusion Theraphy - BSC-12 Hrs',
    },
    {
      id: 'AKCS000384',
      name: 'INFUSION_THERAPHY - BSC-24 HRS',
      alias: 'Infusion Theraphy - BSC-24 Hrs',
    },
    {
      id: 'AKCS000385',
      name: 'DRESSING_MINOR UPTO 4 PADS - ANM-12 HRS',
      alias: 'Dressing Minor upto 4 pads - ANM-12 HRS',
    },
    {
      id: 'AKCS000386',
      name: 'DRESSING_MINOR UPTO 4 PADS - ANM-24 HRS',
      alias: 'Dressing Minor upto 4 pads - ANM-24 HRS',
    },
    {
      id: 'AKCS000387',
      name: 'DRESSING_MINOR UPTO 4 PADS - GNM-12 HRS',
      alias: 'Dressing Minor upto 4 pads - GNM-12 Hrs',
    },
    {
      id: 'AKCS000388',
      name: 'DRESSING_MINOR UPTO 4 PADS - GNM-24 HRS',
      alias: 'Dressing Minor upto 4 pads - GNM-24 Hrs',
    },
    {
      id: 'AKCS000389',
      name: 'DRESSING_MINOR UPTO 4 PADS - BSC-12 HRS',
      alias: 'Dressing Minor upto 4 pads - BSC-12 Hrs',
    },
    {
      id: 'AKCS000390',
      name: 'DRESSING_MINOR UPTO 4 PADS - BSC-24 HRS',
      alias: 'Dressing Minor upto 4 pads - BSC-24 Hrs',
    },
    {
      id: 'AKCS000391',
      name: 'DRESSING_MAJOR MORE THAN 4 PADS - ANM-12 HRS',
      alias: 'Dressing Major more than 4 pads - ANM-12 HRS',
    },
    {
      id: 'AKCS000392',
      name: 'DRESSING_MAJOR MORE THAN 4 PADS - ANM-24 HRS',
      alias: 'Dressing Major more than 4 pads - ANM-24 HRS',
    },
    {
      id: 'AKCS000393',
      name: 'DRESSING_MAJOR MORE THAN 4 PADS - GNM-12 HRS',
      alias: 'Dressing Major more than 4 pads - GNM-12 Hrs',
    },
    {
      id: 'AKCS000394',
      name: 'DRESSING_MAJOR MORE THAN 4 PADS - GNM-24 HRS',
      alias: 'Dressing Major more than 4 pads - GNM-24 Hrs',
    },
    {
      id: 'AKCS000395',
      name: 'DRESSING_MAJOR MORE THAN 4 PADS - BSC-12 HRS',
      alias: 'Dressing Major more than 4 pads - BSC-12 Hrs',
    },
    {
      id: 'AKCS000396',
      name: 'DRESSING_MAJOR MORE THAN 4 PADS - BSC-24 HRS',
      alias: 'Dressing Major more than 4 pads - BSC-24 Hrs',
    },
    {
      id: 'AKCS000397',
      name: 'CATHETRIZATION_CARE - ANM-12 HRS',
      alias: 'Cathetrization Care - ANM-12 HRS',
    },
    {
      id: 'AKCS000398',
      name: 'CATHETRIZATION_CARE - ANM-24 HRS',
      alias: 'Cathetrization Care - ANM-24 HRS',
    },
    {
      id: 'AKCS000399',
      name: 'CATHETRIZATION_CARE - GNM-12 HRS',
      alias: 'Cathetrization Care - GNM-12 Hrs',
    },
    {
      id: 'AKCS000400',
      name: 'CATHETRIZATION_CARE - GNM-24 HRS',
      alias: 'Cathetrization Care - GNM-24 Hrs',
    },
    {
      id: 'AKCS000401',
      name: 'CATHETRIZATION_CARE - BSC-12 HRS',
      alias: 'Cathetrization Care - BSC-12 Hrs',
    },
    {
      id: 'AKCS000402',
      name: 'CATHETRIZATION_CARE - BSC-24 HRS',
      alias: 'Cathetrization Care - BSC-24 Hrs',
    },
    {
      id: 'AKCS000403',
      name: 'CANCER_CARE - GNM-12 HRS',
      alias: 'Cancer Care - GNM-12 Hrs',
    },
    {
      id: 'AKCS000404',
      name: 'CANCER_CARE - GNM-24 HRS',
      alias: 'Cancer Care - GNM-24 Hrs',
    },
    {
      id: 'AKCS000405',
      name: 'CANCER_CARE - BSC-12 HRS',
      alias: 'Cancer Care - BSC-12 Hrs',
    },
    {
      id: 'AKCS000406',
      name: 'CANCER_CARE - BSC-24 HRS',
      alias: 'Cancer Care - BSC-24 Hrs',
    },
    {
      id: 'AKCS000407',
      name: 'UNCONCIOUS_CARE - GNM-12 HRS',
      alias: 'Unconcious Care - GNM-12 Hrs',
    },
    {
      id: 'AKCS000408',
      name: 'UNCONCIOUS_CARE - GNM-24 HRS',
      alias: 'Unconcious Care - GNM-24 Hrs',
    },
    {
      id: 'AKCS000409',
      name: 'UNCONCIOUS_CARE - BSC-12 HRS',
      alias: 'Unconcious Care - BSC-12 Hrs',
    },
    {
      id: 'AKCS000410',
      name: 'UNCONCIOUS_CARE - BSC-24 HRS',
      alias: 'Unconcious Care - BSC-24 Hrs',
    },
    {
      id: 'AKCS000411',
      name: 'ICU_CARE - GNM-12 HRS',
      alias: 'ICU Care - GNM-12 Hrs',
    },
    {
      id: 'AKCS000412',
      name: 'ICU_CARE - GNM-24 HRS',
      alias: 'ICU Care - GNM-24 Hrs',
    },
    {
      id: 'AKCS000413',
      name: 'ICU_CARE - BSC-12 HRS',
      alias: 'ICU Care - BSC-12 Hrs',
    },
    {
      id: 'AKCS000414',
      name: 'ICU_CARE - BSC-24 HRS',
      alias: 'ICU Care - BSC-24 Hrs',
    },
    {
      id: 'AKCS000415',
      name: 'BI_PAP - GNM-12 HRS',
      alias: 'BI Pap - GNM-12 Hrs',
    },
    {
      id: 'AKCS000416',
      name: 'BI_PAP - GNM-24 HRS',
      alias: 'BI Pap - GNM-24 Hrs',
    },
    {
      id: 'AKCS000417',
      name: 'BI_PAP - BSC-12 HRS',
      alias: 'BI Pap - BSC-12 Hrs',
    },
    {
      id: 'AKCS000418',
      name: 'BI_PAP - BSC-24 HRS',
      alias: 'BI Pap - BSC-24 Hrs',
    },
    {
      id: 'AKCS000419',
      name: 'CI_PAP - GNM-12 HRS',
      alias: 'CI Pap - GNM-12 Hrs',
    },
    {
      id: 'AKCS000420',
      name: 'CI_PAP - GNM-24 HRS',
      alias: 'CI Pap - GNM-24 Hrs',
    },
    {
      id: 'AKCS000421',
      name: 'CI_PAP - BSC-12 HRS',
      alias: 'CI Pap - BSC-12 Hrs',
    },
    {
      id: 'AKCS000422',
      name: 'CI_PAP - BSC-24 HRS',
      alias: 'CI Pap - BSC-24 Hrs',
    },
    {
      id: 'AKCS000423',
      name: 'VENTILATOR_PATIENT CARE - BSC-12 HRS',
      alias: 'Ventilator Patient Care - BSC-12 Hrs',
    },
    {
      id: 'AKCS000424',
      name: 'VENTILATOR_PATIENT CARE - BSC-24 HRS',
      alias: 'Ventilator Patient Care - BSC-24 Hrs',
    },
    {
      id: 'AKCS000425',
      name: 'CANCER_CARE  - ANM',
      alias: 'Cancer Care  - ANM',
    },
    {
      id: 'AKCS000426',
      name: 'UNCONCIOUS_CARE - ANM',
      alias: 'Unconcious Care - ANM',
    },
    {
      id: 'AKCS000427',
      name: 'DIAPER_CHANGE ANM',
      alias: 'Diaper Change ANM',
    },
    {
      id: 'AKCS000428',
      name: 'WASH_ROOM SUPPORT ANM',
      alias: 'Wash Room Support ANM',
    },
    {
      id: 'AKCS000480',
      name: 'BED_SIDE PATIENT CARE 12 HOURS',
      alias: 'bed side patient Care 12 hours',
    },
    {
      id: 'AKCS000481',
      name: 'BED_SIDE PATIENT CARE 24 HOURS',
      alias: 'bed side patient Care 24 hours',
    },
    {
      id: 'AKCS000513',
      name: 'MENTAL_DISODER LIKE DEMENTIA, ALZHEIRMER CARE 12 HRS',
      alias: 'Mental Disoder Like Dementia, Alzheirmer Care 12 Hrs',
    },
    {
      id: 'AKCS000516',
      name: 'BI_PAP - ANM 12HRS',
      alias: 'BI Pap - ANM 12Hrs',
    },
    {
      id: 'AKCS000517',
      name: 'BI_PAP - ANM 24 HRS',
      alias: 'BI Pap - ANM 24 Hrs',
    },
    {
      id: 'AKCS000518',
      name: 'CI_PAP - ANM 12 HRS',
      alias: 'CI Pap - ANM 12 Hrs',
    },
    {
      id: 'AKCS000519',
      name: 'CI_PAP - ANM 24 HRS',
      alias: 'CI Pap - ANM 24 Hrs',
    },
    {
      id: 'AKCS000520',
      name: 'GNM_NURSE 24 HOURS',
      alias: 'GNM Nurse 24 hours',
    },
    {
      id: 'AKCS000521',
      name: 'ANM_NURSE 24 HOURS',
      alias: 'ANM Nurse 24 Hours',
    },
    {
      id: 'AKCS000530',
      name: 'MALE_ANM NURSE 24 HOURS',
      alias: 'Male ANM Nurse 24 Hours',
    },
    {
      id: 'AKCS000531',
      name: 'MALE_ANM NURSE 12 HOURS',
      alias: 'Male ANM Nurse 12 Hours',
    },
    {
      id: 'AKCS000532',
      name: 'FEMALE_ANM NURSE 24 HOURS',
      alias: 'Female ANM Nurse 24 Hours',
    },
    {
      id: 'AKCS000533',
      name: 'FEMALE_ANM NURSE 12 HOURS',
      alias: 'Female ANM Nurse 12 Hours',
    },
    {
      id: 'AKCS000534',
      name: 'MALE_GNM NURSE 24 HOURS',
      alias: 'Male GNM Nurse 24 Hours',
    },
    {
      id: 'AKCS000535',
      name: 'MALE_GNM NURSE 12 HOURS',
      alias: 'Male GNM Nurse 12 Hours',
    },
    {
      id: 'AKCS000536',
      name: 'FEMALE_GNM NURSE 24 HOURS',
      alias: 'Female GNM Nurse 24 Hours',
    },
    {
      id: 'AKCS000537',
      name: 'FEMALE_GNM NURSE 12 HOURS',
      alias: 'Female GNM Nurse 12 Hours',
    },
    {
      id: 'AKCS000538',
      name: 'MALE_BSC NURSE 24 HOURS',
      alias: 'Male BSC Nurse 24 Hours',
    },
    {
      id: 'AKCS000539',
      name: 'MALE_BSC NURSE 12 HOURS',
      alias: 'Male BSC Nurse 12 Hours',
    },
    {
      id: 'AKCS000540',
      name: 'FEMALE_BSC NURSE 24 HOURS',
      alias: 'Female BSC Nurse 24 Hours',
    },
    {
      id: 'AKCS000541',
      name: 'FEMALE_BSC NURSE 12 HOURS',
      alias: 'Female BSC Nurse 12 Hours',
    },
    {
      id: 'AKCS000542',
      name: 'SHORT_TERM NURSE 1-4 HOURS',
      alias: 'Short Term Nurse 1-4 Hours',
    },
  ],
  AKCS25: [
    {
      id: 'AKCS000154',
      name: 'PHYSIOTHERAPHY_/ STROKE',
      alias: 'Physiotheraphy / Stroke',
    },
    { id: 'AKCS000177', name: 'PHYSIOTHERAPHY', alias: 'Physiotheraphy' },
    {
      id: 'AKCS000543',
      name: 'PHYSIOTHERAPIST',
      alias: 'Physiotherapist',
    },
  ],
  AKCS69: [
    {
      id: 'AKCS000155',
      name: 'SPEACH_THERAPHY',
      alias: 'Speach Theraphy',
    },
    { id: 'AKCS000161', name: 'SPEACH', alias: 'Speach' },
  ],
  AKCS62: [
    {
      id: 'AKCS000159',
      name: 'SHORT_TERM NURSING',
      alias: 'Short Term Nursing',
    },
  ],
  AKCS68: [
    {
      id: 'AKCS000160',
      name: 'OCS,_CPAP, BIPAP',
      alias: 'Ocs, Cpap, Bipap',
    },
    {
      id: 'AKCS000162',
      name: 'OCS,_CPAP, BIPAP',
      alias: 'Ocs, Cpap, Bipap',
    },
  ],
  AKCS34: [
    { id: 'AKCS000431', name: 'MAID_12 HOURS', alias: 'Maid 12 Hours' },
    { id: 'AKCS000432', name: 'MAID_24 HOURS', alias: 'Maid 24 Hours' },
  ],
  AKCS000135: [
    {
      id: 'AKCS000433',
      name: 'DOCTOR_TELE CONSULTATION',
      alias: 'Doctor Tele Consultation',
    },
    {
      id: 'AKCS000434',
      name: 'DOCTOR_VIDEO CONSULTATION',
      alias: 'Doctor Video Consultation',
    },
    {
      id: 'AKCS000546',
      name: 'DR_TELECONSULTATION',
      alias: 'DR Teleconsultation',
    },
  ],
  AKCS20: [
    { id: 'AKCS000451', name: 'ONLY_LUNCH', alias: 'only lunch' },
    { id: 'AKCS000452', name: 'ONLY_DINNER', alias: 'Only Dinner' },
    { id: 'AKCS000453', name: 'LUNCH_& DINNER', alias: 'Lunch & Dinner' },
    { id: 'AKCS000454', name: 'PER_MEAL', alias: 'Per Meal' },
    {
      id: 'AKCS000455',
      name: 'BREAKFAST_MEAL BOX',
      alias: 'Breakfast Meal Box',
    },
    {
      id: 'AKCS000456',
      name: 'SOUTH_INDIAN EXECUTIVE',
      alias: 'South Indian Executive',
    },
    {
      id: 'AKCS000457',
      name: 'NORTH_INDIAN EXECUTIVE',
      alias: 'North Indian Executive',
    },
    {
      id: 'AKCS000458',
      name: 'SOUTH_INDIAN DELUXE',
      alias: 'South Indian Deluxe',
    },
    {
      id: 'AKCS000459',
      name: 'NORTH_INDIAN DELUXE',
      alias: 'North Indian Deluxe',
    },
  ],
  AKCS71: [
    { id: 'AKCS000514', name: 'COOK_12 HOURS', alias: 'Cook 12 Hours' },
    { id: 'AKCS000515', name: 'COOK_24 HOURS', alias: 'Cook 24 Hours' },
  ],
  AKCS000141: [
    {
      id: 'AKCS000547',
      name: 'RTPCR_COVID TEST',
      alias: 'RTPCR Covid Test',
    },
  ],
  AKCS26: [
    {
      id: 'AKCS000548',
      name: 'BLOOD_TEST (HOME SAMPLE COLLECTION)',
      alias: 'Blood TestBlood Test (home Sample Collection)',
    },
    {
      id: 'AKCS000572',
      name: 'TRUSTLAB_DIAGNOSTIC PRIVATE LIMITED',
      alias: 'Trustlab',
    },
    {
      id: 'AKCS000573',
      name: '1,_25‐DIHYDROXY VITAMIN D3‐SERUM',
      alias: '1, 25‐Dihydroxy Vitamin D3‐Serum',
    },
    {
      id: 'AKCS000574',
      name: '1,_25-HYDROXY VITAMIN D-SERUM',
      alias: '1, 25-Hydroxy Vitamin D-Serum',
    },
    {
      id: 'AKCS000575',
      name: 'ABSOLUTE_EOSINOPHIL COUNT-WB-EDTA',
      alias: 'Absolute Eosinophil Count-WB-EDTA',
    },
    {
      id: 'AKCS000576',
      name: 'ACTIVATED_PARTIAL THROMBOPLASTIN TIME (APTT/PTTK)',
      alias: 'Activated Partial Thromboplastin Time (APTT/PTTK)',
    },
    {
      id: 'AKCS000577',
      name: 'ALANINE_TRANSAMINASE (ALT/SGPT)-SERUM',
      alias: 'Alanine Transaminase (ALT/SGPT)-Serum',
    },
    {
      id: 'AKCS000578',
      name: 'ALKALINE_PHOSPHATASE (ALP)-SERUM',
      alias: 'Alkaline Phosphatase (ALP)-Serum',
    },
    {
      id: 'AKCS000579',
      name: 'ALPHA_FETO PROTEIN (AFP)-SERUM',
      alias: 'Alpha Feto Protein (AFP)-Serum',
    },
    {
      id: 'AKCS000580',
      name: 'AMMONIA-WB-NA_HEPARIN',
      alias: 'Ammonia-WB-Na Heparin',
    },
    { id: 'AKCS000581', name: 'AMYLASE-SERUM', alias: 'Amylase-Serum' },
    {
      id: 'AKCS000582',
      name: 'AMYLASE-URINE-RANDOM',
      alias: 'Amylase-Urine-Random',
    },
    {
      id: 'AKCS000583',
      name: 'ANA_BLOT PROFILE-SERUM',
      alias: 'ANA BLOT Profile-Serum',
    },
    {
      id: 'AKCS000584',
      name: 'ANTE_NATAL PROFILE RAPID( HIV,HBSAG,VDRL ,BLOOD GROUP,',
      alias: 'Ante Natal Profile Rapid( HIV,HBSAG,VDRL ,BLOOD GROUP,',
    },
    {
      id: 'AKCS000585',
      name: 'ANTI_DS-DNA ANTIBODY- (QUALITATIVE)-SERUM',
      alias: 'Anti ds-DNA Antibody- (Qualitative)-Serum',
    },
    {
      id: 'AKCS000586',
      name: 'ANTI_MICROSOMAL ANTIBODY-SERUM',
      alias: 'Anti Microsomal Antibody-Serum',
    },
    {
      id: 'AKCS000587',
      name: 'ANTI_NUCLEAR ANTIBODY-SERUM',
      alias: 'Anti Nuclear Antibody-Serum',
    },
    {
      id: 'AKCS000588',
      name: 'ANTI_PHOSPHOLIPID IGG ANTIBODY-SERUM',
      alias: 'Anti Phospholipid IgG Antibody-Serum',
    },
    {
      id: 'AKCS000589',
      name: 'ANTI_PHOSPHOLIPID IGM ANTIBODY-SERUM',
      alias: 'Anti Phospholipid IgM Antibody-Serum',
    },
    {
      id: 'AKCS000590',
      name: 'ANTI_STREPTOLYSIN O (ASO) (RAPID)-TITER',
      alias: 'Anti Streptolysin O (ASO) (Rapid)-titer',
    },
    {
      id: 'AKCS000591',
      name: 'ANTI_STREPTOLYSIN O TITRES (ASO)-SERUM',
      alias: 'Anti Streptolysin O Titres (ASO)-Serum',
    },
    {
      id: 'AKCS000592',
      name: 'ANTI_THYROGLOBULIN ANTIBODY (ATG)-SERUM',
      alias: 'Anti Thyroglobulin Antibody (ATG)-Serum',
    },
    {
      id: 'AKCS000593',
      name: 'ANTI_THYROGLOBULIN ANTIBODY(ATG) TITER-SERUM',
      alias: 'Anti Thyroglobulin Antibody(ATG) Titer-Serum',
    },
    { id: 'AKCS000594', name: 'ANTI-CCP-SERUM', alias: 'Anti-CCP-Serum' },
    {
      id: 'AKCS000595',
      name: 'ANTI-MULLERIAN_HORMONE (AMH)-SERUM',
      alias: 'Anti-Mullerian Hormone (AMH)-Serum',
    },
    {
      id: 'AKCS000596',
      name: 'ASPARTATE_AMINOTRANSFERASE (SGOT)-SERUM',
      alias: 'Aspartate Aminotransferase (SGOT)-Serum',
    },
    {
      id: 'AKCS000597',
      name: 'BETA-HUMAN_CHORIONIC GONODOTROPIN HORMONE-SERUM',
      alias: 'Beta-Human Chorionic Gonodotropin Hormone-Serum',
    },
    {
      id: 'AKCS000598',
      name: 'BILIRUBIN_(TOTAL + DIRECT)-SERUM',
      alias: 'Bilirubin (Total + Direct)-Serum',
    },
    {
      id: 'AKCS000599',
      name: 'BIOPSY_- LARGE SPECIMEN MORE THAN 5 CM FORMALIN FIXED TISSUE',
      alias: 'Biopsy - Large Specimen More Than 5 cm Formalin Fixed Tissue',
    },
    {
      id: 'AKCS000600',
      name: 'BIOPSY_- MEDIUM SPECIMEN UP TO 5 CM FORMALIN FIXED TISSUE',
      alias: 'Biopsy - Medium Specimen up to 5 cm Formalin Fixed Tissue',
    },
    {
      id: 'AKCS000601',
      name: 'BIOPSY_- SMALL SPECIMEN UP TO 2 CM FORMALIN FIXED TISSUE',
      alias: 'Biopsy - Small Specimen up to 2 cm Formalin Fixed Tissue',
    },
    {
      id: 'AKCS000602',
      name: 'BIOPSY-EXTRA_LARGE-10 CM',
      alias: 'Biopsy-Extra Large-10 CM',
    },
    {
      id: 'AKCS000603',
      name: 'BLOOD_GROUPING (A B O) AND RH TYPE',
      alias: 'Blood Grouping (A B O) and Rh Type',
    },
    {
      id: 'AKCS000604',
      name: 'BLOOD_PICTURE-PERIPHERAL SMEAR EXAMINATION',
      alias: 'Blood Picture-Peripheral Smear Examination',
    },
    {
      id: 'AKCS000605',
      name: 'BLOOD_UREA NITROGEN (BUN)-SERUM',
      alias: 'Blood Urea Nitrogen (BUN)-Serum',
    },
    {
      id: 'AKCS000606',
      name: 'CA_125-OVARIAN CANCER MARKER (TITER)-SERUM',
      alias: 'CA 125-Ovarian Cancer Marker (Titer)-Serum',
    },
    {
      id: 'AKCS000607',
      name: 'CA_15.3-BREAST CANCER MARKER (TITER)-SERUM',
      alias: 'CA 15.3-Breast Cancer Marker (Titer)-Serum',
    },
    {
      id: 'AKCS000608',
      name: 'CA15.3-BREAST_CANCER MARKER-SERUM',
      alias: 'CA15.3-Breast Cancer Marker-Serum',
    },
    {
      id: 'AKCS000609',
      name: 'CA19.9-PANCREATIC_CANCER MARKER (TITER)-SERUM',
      alias: 'CA19.9-Pancreatic Cancer Marker (Titer)-Serum',
    },
    {
      id: 'AKCS000610',
      name: 'CA19.9-PANCREATIC_CANCER MARKER-SERUM',
      alias: 'CA19.9-Pancreatic Cancer Marker-Serum',
    },
    { id: 'AKCS000611', name: 'CALCIUM-SERUM', alias: 'Calcium-Serum' },
    {
      id: 'AKCS000612',
      name: 'CALCIUM-SPOT_URINE-RANDOM',
      alias: 'Calcium-Spot Urine-Random',
    },
    {
      id: 'AKCS000613',
      name: 'CALCIUM-URINE-24_HRS',
      alias: 'Calcium-Urine-24 hrs',
    },
    {
      id: 'AKCS000614',
      name: 'C-ANCA_(PR3)-SERUM',
      alias: 'c-ANCA (PR3)-Serum',
    },
    {
      id: 'AKCS000615',
      name: 'CARCINO_EMBRYONIC ANTIGEN (CEA)-SERUM',
      alias: 'Carcino Embryonic Antigen (CEA)-Serum',
    },
    {
      id: 'AKCS000616',
      name: 'CARDIOLIPIN_IGA ANTIBODY-SERUM',
      alias: 'Cardiolipin IgA Antibody-Serum',
    },
    {
      id: 'AKCS000617',
      name: 'CARDIOLIPIN_IGM ANTIBODY-SERUM',
      alias: 'Cardiolipin IgM Antibody-Serum',
    },
    { id: 'AKCS000618', name: 'CBC_PROFILE', alias: 'CBC Profile' },
    {
      id: 'AKCS000619',
      name: 'CD3/CD4/CD8-WB-EDTA',
      alias: 'CD3/CD4/CD8-WB-EDTA',
    },
    {
      id: 'AKCS000620',
      name: 'CERULOPLASMIN-SERUM',
      alias: 'Ceruloplasmin-Serum',
    },
    {
      id: 'AKCS000621',
      name: 'CHIKUNGUNYA_IGG ANTIBODY-SERUM',
      alias: 'Chikungunya IgG Antibody-Serum',
    },
    {
      id: 'AKCS000622',
      name: 'CHOLESTEROL-TOTAL-SERUM',
      alias: 'Cholesterol-Total-Serum',
    },
    {
      id: 'AKCS000623',
      name: 'CHROMOSOMAL_ANALYSIS WHOLE BLOOD',
      alias: 'Chromosomal Analysis Whole Blood',
    },
    {
      id: 'AKCS000624',
      name: 'COMPLEMENT_3 (C3)-SERUM',
      alias: 'Complement 3 (C3)-Serum',
    },
    {
      id: 'AKCS000625',
      name: 'COMPLEMENT_4 (C4)-SERUM',
      alias: 'Complement 4 (C4)-Serum',
    },
    {
      id: 'AKCS000626',
      name: 'COMPLETE_URINE ANALYSIS (CUE)-URINE',
      alias: 'Complete Urine Analysis (CUE)-Urine',
    },
    { id: 'AKCS000627', name: 'COOMBS_DIRECT', alias: 'Coombs Direct' },
    {
      id: 'AKCS000628',
      name: 'COOMBS_INDIRECT',
      alias: 'Coombs Indirect',
    },
    {
      id: 'AKCS000629',
      name: 'CORTISOL_SERUM (3 TO 5 PM)',
      alias: 'Cortisol Serum (3 to 5 PM)',
    },
    {
      id: 'AKCS000630',
      name: 'CORTISOL_SERUM (7 TO 9 AM)',
      alias: 'Cortisol Serum (7 to 9 AM)',
    },
    {
      id: 'AKCS000631',
      name: 'C-PEPTIDE-SERUM',
      alias: 'C-Peptide-Serum',
    },
    {
      id: 'AKCS000632',
      name: 'C-REACTIVE_PROTEIN (CRP)-SERUM',
      alias: 'C-Reactive Protein (CRP)-Serum',
    },
    {
      id: 'AKCS000633',
      name: 'CREATINE_KINASE MB (CK-MB)-SERUM',
      alias: 'Creatine Kinase MB (CK-MB)-Serum',
    },
    {
      id: 'AKCS000634',
      name: 'CREATININE_CLEARANCE TEST-SERUM/URINE',
      alias: 'Creatinine Clearance Test-Serum/Urine',
    },
    {
      id: 'AKCS000635',
      name: 'CREATININE_KINASE (CPK)-SERUM',
      alias: 'Creatinine Kinase (CPK)-Serum',
    },
    {
      id: 'AKCS000636',
      name: 'CREATININE-SERUM',
      alias: 'Creatinine-Serum',
    },
    {
      id: 'AKCS000637',
      name: 'CULTURE_AEROBIC MISCELLANEOUS-TISSUE',
      alias: 'Culture Aerobic Miscellaneous-Tissue',
    },
    {
      id: 'AKCS000638',
      name: 'CULTURE_AEROBIC OT SWABS-SWABS',
      alias: 'Culture Aerobic OT Swabs-Swabs',
    },
    {
      id: 'AKCS000639',
      name: 'CULTURE_AEROBIC‐WHOLE BLOOD',
      alias: 'Culture Aerobic‐Whole Blood',
    },
    {
      id: 'AKCS000640',
      name: 'CULTURE_AND SENSITIVITY-URINE',
      alias: 'Culture and Sensitivity-Urine',
    },
    {
      id: 'AKCS000641',
      name: 'CYTOLOGY-PAP_SMEAR-AIR DRIED',
      alias: 'Cytology-PAP Smear-Air Dried',
    },
    {
      id: 'AKCS000642',
      name: 'CYTOLOGY-PAP_SMEAR-FIXED',
      alias: 'Cytology-PAP Smear-Fixed',
    },
    {
      id: 'AKCS000643',
      name: 'CYTOMEGALOVIRUS_IGG ANTIBODY-SERUM',
      alias: 'CytomegaloVirus IgG Antibody-Serum',
    },
    {
      id: 'AKCS000644',
      name: 'CYTOMEGALOVIRUS_IGM ANTIBODY-SERUM',
      alias: 'CytomegaloVirus IgM Antibody-Serum',
    },
    {
      id: 'AKCS000645',
      name: 'D-DIMER-WB-NA_CITRATE',
      alias: 'D-Dimer-WB-Na Citrate',
    },
    {
      id: 'AKCS000646',
      name: 'DEHYDROEPIANDROSTERONE_SULPHATE (DHEA-S)-SERUM',
      alias: 'Dehydroepiandrosterone Sulphate (DHEA-S)-Serum',
    },
    {
      id: 'AKCS000647',
      name: 'DENGUE_IGG ANTIBODY-SERUM',
      alias: 'Dengue IgG Antibody-Serum',
    },
    {
      id: 'AKCS000648',
      name: 'DENGUE_IGM ANTIBODY-SERUM',
      alias: 'Dengue IgM Antibody-Serum',
    },
    {
      id: 'AKCS000649',
      name: 'DENGUE_NS1 RAPID',
      alias: 'Dengue NS1 RAPID',
    },
    {
      id: 'AKCS000650',
      name: 'DENGUE_PROFILE (IGG &IGM & NS1 ANTIGEN)',
      alias: 'Dengue Profile (IGG &IGM & NS1 Antigen)',
    },
    {
      id: 'AKCS000651',
      name: 'DENGUE_PROFILE ELISA  NS1 ELISA',
      alias: 'Dengue Profile ELISA  NS1 Elisa',
    },
    {
      id: 'AKCS000652',
      name: 'DUAL_MARKER-SERUM',
      alias: 'Dual Marker-Serum',
    },
    { id: 'AKCS000653', name: 'EGFR_TEST', alias: 'EGFR Test' },
    {
      id: 'AKCS000654',
      name: 'ELECTROLYTE_PROFILE-SERUM',
      alias: 'Electrolyte Profile-Serum',
    },
    {
      id: 'AKCS000655',
      name: 'ERYTHROCYTE_SEDIMENTATION RATE (ESR)',
      alias: 'Erythrocyte Sedimentation Rate (ESR)',
    },
    {
      id: 'AKCS000656',
      name: 'ESTRADIOL_(E2)-SERUM',
      alias: 'Estradiol (E2)-Serum',
    },
    { id: 'AKCS000657', name: 'FERRITIN-SERUM', alias: 'Ferritin-Serum' },
    {
      id: 'AKCS000658',
      name: 'FERTILITY_PROFILE-I-SERUM(FSH AND LH AND PRL)',
      alias: 'Fertility Profile-I-Serum(FSH AND LH AND PRL)',
    },
    {
      id: 'AKCS000659',
      name: 'FEVER_PROFILE-SERUM/URINE(CBP,ESR,MP,CUE,WIDAL)',
      alias: 'Fever Profile-Serum/Urine(CBP,ESR,MP,CUE,WIDAL)',
    },
    {
      id: 'AKCS000660',
      name: 'FLUID_ANALYSIS (OTHER FLUIDS)-BODY FLUIDS',
      alias: 'Fluid Analysis (Other Fluids)-Body Fluids',
    },
    {
      id: 'AKCS000661',
      name: 'FOLATE_SERUM (FOLIC ACID)-SERUM',
      alias: 'Folate Serum (Folic Acid)-Serum',
    },
    {
      id: 'AKCS000662',
      name: 'FOLLICLE_STIMULATING HORMONE (FSH)-SERUM',
      alias: 'Follicle Stimulating Hormone (FSH)-Serum',
    },
    {
      id: 'AKCS000663',
      name: 'GAMMA_GLUTAMYL TRANSFERASE (GGT)-SERUM',
      alias: 'Gamma Glutamyl Transferase (GGT)-Serum',
    },
    {
      id: 'AKCS000664',
      name: 'GLUCOSE-BLOOD-FASTING',
      alias: 'Glucose-Blood-Fasting',
    },
    {
      id: 'AKCS000665',
      name: 'GLUCOSE-BLOOD-POST_PRANDIAL(PP)',
      alias: 'Glucose-Blood-Post Prandial(PP)',
    },
    {
      id: 'AKCS000666',
      name: 'GLUCOSE-BLOOD-RANDOM-WB-NA_FLUORIDE',
      alias: 'Glucose-Blood-Random-WB-Na Fluoride',
    },
    {
      id: 'AKCS000667',
      name: 'GLYCOSYLATED_HEMOGLOBIN (GHB/HBA1C)-WB-EDTA',
      alias: 'Glycosylated Hemoglobin (GHb/HbA1c)-WB-EDTA',
    },
    {
      id: 'AKCS000668',
      name: 'GRAM_STAIN-BODY FLUIDS',
      alias: 'Gram Stain-Body Fluids',
    },
    {
      id: 'AKCS000669',
      name: 'GRAM_STAIN-OTHERS/ANY SAMPLE',
      alias: 'Gram Stain-Others/Any Sample',
    },
    { id: 'AKCS000670', name: 'HAEMOGRAM', alias: 'Haemogram' },
    {
      id: 'AKCS000671',
      name: 'HCV_(RAPID)-SERUM',
      alias: 'HCV (Rapid)-Serum',
    },
    {
      id: 'AKCS000672',
      name: 'HEMOGLOBIN_VARIANT ESTIMATION BY HEMOGLOBIN ELECTROPHORESIS-WB- EDTA',
      alias:
        'Hemoglobin Variant Estimation by Hemoglobin Electrophoresis-WB- EDTA',
    },
  ],
  AKCS000144: [{ id: 'AKCS000549', name: 'CHEST_XRAY', alias: 'Chest XRay' }],
  AKCS000136: [{ id: 'AKCS000550', name: 'AMBULANCE', alias: 'Ambulance' }],
  AKCS55: [{ id: 'AKCS000551', name: 'FOREX', alias: 'Forex' }],
  AKCS75: [{ id: 'AKCS000558', name: 'PAINTING', alias: 'Painting' }],
  AKCS11: [
    {
      id: 'AKCS000569',
      name: "ANVAYAA'S FREE CHECK UP FOR PLAN MEMBERS",
      alias: 'Anvr Plan Members',
    },
    {
      id: 'AKCS000673',
      name: 'COMPLIMENTARY_PANEL - TLPA111',
      alias: 'COMPLIMENTARY PANEL - TLPA111',
    },
    {
      id: 'AKCS000674',
      name: 'BASIC_ HEALTH  CHECK PANEL - TLPA112',
      alias: 'BASIC  HEALTH  CHECK PANEL - TLPA112',
    },
    {
      id: 'AKCS000675',
      name: 'MASTER_ HEALTH CHECK  PANLES - TLPA113',
      alias: 'MASTER  HEALTH CHECK  PANLES - TLPA113',
    },
    { id: 'AKCST000191', name: 'TEST', alias: 'test des' },
  ],
  AKCS15: [{ id: 'AKCS000681', name: 'PEST_CONTROL', alias: 'Pest Control' }],
  AKCS45: [
    {
      id: 'AKCS000682',
      name: 'ELECTRICIAN_SERVICE AT HOME',
      alias: 'Electrician Service At Home',
    },
  ],
  AKCS18: [
    { id: 'AKCS000683', name: 'AC_CLEANING', alias: 'AC Cleaningssss' },
    { id: 'AKCST000195', name: 'A/C_SERVICE', alias: 'a/c services' },
    { id: 'AKCST000200', name: 'A/C_SERVICES', alias: 'a/c services' },
  ],
  AKCS48: [
    {
      id: 'AKCST000194',
      name: 'PICNIC_AND SOCIAL',
      alias: 'picnic and social',
    },
  ],
  AKCS37: [
    {
      id: 'AKCST000196',
      name: 'PLUMBER_SERVICES',
      alias: 'plumber services',
    },
    { id: 'AKCST000198', name: 'PLUMBING', alias: 'plumbingssssss' },
    {
      id: 'AKCST000199',
      name: 'PLUMBING_WORK',
      alias: 'plumbings',
    },
  ],
  AKCS33: [{ id: 'AKCST000197', name: 'WITH_STACH', alias: 'with stach' }],
  AKCS72: [
    {
      id: 'AKCST000201',
      name: 'MAID_& CARE TAKER',
      alias: 'Maid & Care Taker',
    },
  ],
  AKCS16: [
    {
      id: 'AKCST000202',
      name: 'APPLIANCE_REPAIRS AND SERVICES',
      alias: 'appliance repairs and services',
    },
  ],
};

export const getCategories = () => {
  return categories;
};

export const getSubCategory = (categoryIDs) => {
  const newSubCategories = [];
  categoryIDs.forEach((categoryID) => {
    newSubCategories.push(...subCategories[categoryID]);
  });
  return newSubCategories;
};

export const getServices = (subCategoryId) => {
  return services[subCategoryId];
};

export const filterSubCategoriesByCategories = (
  localSubCategories,
  localCategories,
) => {
  const localCategoryIds = localCategories.map((category) => category.id);
  const localSubCategoryIds = localSubCategories.map(
    (subCategory) => subCategory.id,
  );
  const filteredSubCategories = [];

  for (const category of categories) {
    if (localCategoryIds.includes(category.id)) {
      const subCategoryArray = subCategories[category.id];
      for (const subCategory of subCategoryArray) {
        if (localSubCategoryIds.includes(subCategory.id)) {
          filteredSubCategories.push(subCategory);
        }
      }
    }
  }

  return filteredSubCategories;
};
