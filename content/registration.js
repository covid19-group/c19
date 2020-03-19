export default {
  'da-DK': {
    baseline: {
      label: 'Baseline',
      description:
        'Denne første registrering er udvidet til at omfatte de seneste {unit}, og inkludere demografiske data samt syghistorik for at sætte en baseline til fremtidige registrering.',
    },
    by: 'Registrering for tlf.',
    title: 'Registration',
    incomplete: 'Svar venligst på alle spørgsmålene før du fortsætter',
    reminders: 'Modtag link til din daglige registreting via SMS',
    submit: 'Send registrering',
    expired: {
      label: 'Linket er udløbet,',
      link: 'prøv venligst igen',
    },
    noChange: {
      label: 'Har noget ændret sig siden sidste rapportering?',
      description: 'Hvis ikke registrerer vi en kopi af din seneste registrering for dig',
      options: { no: 'Nej', yes: 'Ja, der er sket ændringer' },
    },
    unit: {
      days: 'dage',
      hours: 'timer',
      decimalSeperator: ',',
    },
    sex: {
      label: 'Biologisk køn',
      options: {
        male: 'Mand',
        female: 'Kvinde',
      },
    },
    born: {
      label: 'Fødselsår',
    },
    zip: {
      label: 'Postnummer',
    },
    household: {
      label: 'Hvor mange bor i din husstand?',
    },
    conditions: {
      label: 'Har du, eller har du haft, én eller flere af disse lidelser?',
      description: 'Vælg alle relevante',
      options: {
        diabetes: { label: 'Diabetes' },
        heart: {
          label: 'Hjertelidelser',
          description: 'f.eks. hjertekarsygdomme, hjerteanfald, hjertefejl, angina',
        },
        lungs: {
          label: 'Lungsygdomme',
          description: 'f.eks. astma, KOL',
        },
        'blood-pressue': {
          label: 'Forhøjet blodtryk',
        },
        cancer: {
          label: 'Aktiv cancer diagnose',
        },
      },
    },
    exposure: {
      label:
        'Har du været i nærkontakt med personer der er blevet testet positiv for COVID-19 inden for de sidste {unit}?',
      description:
        'Nærkontakt er defineret ved at bo sammen, ansigt-til-ansigt kontakt, blive hostet på, at være indenfor 2 meter af personen i mere end 15 minutter, eller at have været i kontakt med deres kropsvæsker',
      options: {
        yes: 'Ja',
        no: 'Nej',
        unknown: 'Ved ikke',
        maybe:
          'Jeg har været i nærkontakt med personer med feber, hoste eller åndedrætsbesvær, men jeg ved ikke om de er bekræftet smittet.',
      },
    },
    temperature: {
      label: 'Hvad er den **højeste** temperatur du har haft de sidste {unit}?',
      options: {
        measured: 'Jeg har målt min temperatur til',
        subjective: {
          label: 'Jeg tror jeg har feber, men har ikke målt den',
          description: 'Over 38°C / 100.4°F',
        },
        normal: {
          label: 'Jeg tror min temperatur er normal, men har ikke målt den',
          description: 'From 36.1°C to 37.2°C (97°F - 99°F) ',
        },
      },
    },
    symptoms: {
      label: 'Har du, eller har du indenfor de sidste {unit} haft, én eller flere af disse symptomer?',
      description: 'Vælg alle de symptomer du har haft',
      options: {
        fatigue: 'Udmattedhed',
        chills: 'Kuldegysninger',
        'dry-cough': 'Tør hoste',
        'productive-cough': 'Produktiv hoste (hoste med slim)',
        'short-breath': 'Åndedrætsbesvær eller stakåndethed',
        'tight-chest': 'Trykken for brystet',
        headache: 'Hovedpine',
        'muscle-ache': 'Muskelømhed',
        nausea: 'Kvalme eller opkast',
        diarrhea: 'Diarré',
      },
      additional: {
        timeframe: {
          label: 'Hvor længe har du oplevet {symptom}?',
          options: {
            6: 'Mindre end 6 timer',
            12: '6-12 timer',
            24: '12-24 timer',
            48: '1-2 dage',
            72: 'Mere end 2 dage',
          },
        },
        development: {
          label: 'Over den periode, er din {symptom} blevet bedre eller værre?',
          options: {
            better: 'Bedre',
            worse: 'Værre',
            unchanged: 'Ingen ændring',
          },
        },
        contact: {
          label: 'Har du været i nærkontakt med nogen der også havde {symptom}?',
          options: {
            yes: 'Ja',
            no: 'Nej',
          },
        },
      },
    },
    distancing: {
      label: 'Hvor mange personer har du været i nærkontakt med indenfor de sidste {unit}?',
      options: {
        none: 'Ingen',
        few: 'Et par stykker',
        many: 'Mange',
      },
    },
    state: {
      label: 'Hvad er din nuværende status?',
      options: {
        wfh: 'Jeg arbejder hjemmefra',
        home: 'Jeg er hjemme, og arbejder ikke',
        work: 'Jeg går på arbejde',
      },
    },
    critical: {
      label: 'Arbejder du i en samfundskritisk rolle?',
      options: {
        yes: 'Ja',
        no: 'Nej',
      },
    },
    neighbourhood: {
      label: 'Er det din oplevelse, at andre i dit område bliver hjemme?',
      options: {
        yes: 'Ja',
        no: 'Nej',
        maybe: 'Ved ikke',
      },
    },
    community: {
      label: 'Hvor mange kender du, hvis helbred har været direkte påvirket af COVID-19?',
      options: {
        none: 'Ingen',
        few: 'Et par stykker',
        many: 'Mange',
      },
    },
  },
  'en-UK': {
    baseline: {
      label: 'Baseline',
      description:
        'This first registration is extended to the past {unit} and include demographic and medical history information to set the basline for future registrations.',
    },
    by: 'Registration by No.',
    title: 'Registration',
    incomplete: 'Please answer all the questions before submitting',
    reminders: 'Receive a link to your daily registration by SMS',
    submit: 'Submit Registration',
    expired: {
      label: 'This link has expired,',
      link: 'please try again',
    },
    noChange: {
      label: 'Has anything changed since your last report?',
      description: "If not, we'll submit your registration with a copy of your most recent one",
      options: { no: 'No', yes: 'Yes, I have changes to report' },
    },
    unit: {
      days: 'days',
      hours: 'hours',
      decimalSeperator: '.',
    },
    sex: {
      label: 'Biological Sex',
      options: {
        male: 'Male',
        female: 'Female',
      },
    },
    born: {
      label: 'Birth Year',
    },
    zip: {
      label: 'Zip Code',
    },
    household: {
      label: 'Number of People in Your Household',
    },
    conditions: {
      label: 'Do you have or have you ever had any of the following conditions?',
      description: 'Select all that apply',
      options: {
        diabetes: { label: 'Diabetes' },
        heart: {
          label: 'Heart disease',
          description: 'e.g., coronary artery disease, previous heart attack, heart failure, angina, valvular disease',
        },
        lungs: {
          label: 'Lung disease',
          description: 'e.g., asthma, COPD',
        },
        'blood-pressue': {
          label: 'High blood pressure',
        },
        cancer: {
          label: 'Active cancer diagnosis',
        },
      },
    },
    exposure: {
      label:
        'In the past {unit}, have you been in close contact with someone who has a laboratory-confirmed case of COVID-19?',
      description:
        'Close contact is defined as living together, face-to-face contact (e.g., talking for more than a few minutes), being coughed on, being within 6 feet of the person for more than 15 minutes, or contact with their body fluids.',
      options: {
        yes: 'Yes',
        no: 'No',
        unknown: "Don't know",
        maybe:
          'I had close contact with someone with fever, cough or trouble breathing, but I am not sure if they had a laboratory-confirmed case of COVID-19',
      },
    },
    temperature: {
      label: 'What is the **highest** temperature you have had in the past {unit}?',
      options: {
        measured: 'Measured',
        subjective: {
          label: 'I believe I have a fever, but haven’t measured',
          description: 'Above 38°C / 100.4°F',
        },
        normal: {
          label: 'I think it’s normal, but haven’t measured',
          description: 'From 36.1°C to 37.2°C (97°F - 99°F) ',
        },
      },
    },
    symptoms: {
      label: 'Have you had any of the following symptoms in the past {unit}?',
      description: 'Select all that apply',
      options: {
        fatigue: 'Fatigue',
        chills: 'Chills',
        'dry-cough': 'Dry cough',
        'productive-cough': 'Producive cough (cough with mucus)',
        'short-breath': 'Difficulty breathing or shortness of breath',
        'tight-chest': 'Tightness in your chest',
        headache: 'Headache',
        'muscle-ache': 'Muscle aches',
        nausea: 'Nausea or vomiting',
        diarrhea: 'Diarrhea',
      },
      additional: {
        timeframe: {
          label: 'How long have you had {symptom}?',
          options: {
            6: '<6 hours',
            12: '6-12 hours',
            24: '12-24 hours',
            48: '1-2 days',
            72: 'More than 2 days',
          },
        },
        development: {
          label: 'Over that time period, has your {symptom} gotten better or worse?',
          options: {
            better: 'Better',
            worse: 'Worse',
            unchanged: 'No change',
          },
        },
        contact: {
          label: 'Have you been in contact with anyone who has had {symptom}?',
          options: {
            yes: 'Yes',
            no: 'No',
          },
        },
      },
    },
    distancing: {
      label: 'How many people have you been within 1 meter of in the last {unit}?',
      options: {
        none: 'None',
        few: 'A few',
        many: 'Many',
      },
    },
    state: {
      label: 'What’s your current status?',
      options: {
        wfh: 'Working from home',
        home: 'Home, not working',
        work: 'Going to work',
      },
    },
    critical: {
      label: 'Do you work in a critical position?',
      options: {
        yes: 'Yes',
        no: 'No',
      },
    },
    neighbourhood: {
      label: 'Are people in your neighborhood staying home?',
      options: {
        yes: 'Yes',
        no: 'No',
        maybe: "Don't know",
      },
    },
    community: {
      label: 'How many people do you know whose health have been affected by COVID-19?',
      options: {
        none: 'None',
        few: 'A few',
        many: 'Many',
      },
    },
  },
};
