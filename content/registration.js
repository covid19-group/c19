export default {
  'en-UK': {
    title: 'Registration',
    submit: 'Submit Registration',
    phone: {
      label: 'Phone',
      placeholder: '+1 (111) 111 1111',
    },
    exposure: {
      label: 'Have you been exposed to any high risk environment within the past 14 days?',
      options: {
        area: {
          label: 'A highly contaminated area',
          description: {
            value: 'Red and orange areas classified by ',
            link: {
              href: 'https://um.dk/',
              label: 'Ministry of Foreign Affairs of Denmark',
            },
          },
        },
        crowd: {
          label: 'A large crowd (100+)',
        },
        tested: {
          label: 'A patient who tested positive',
        },
        quarantined: {
          label: 'A quarantined person',
        },
      },
    },
    exposureDate: {
      label: 'When were you most recently exposed?',
    },
    symptoms: {
      label: 'Do you any common symptoms of CORVID-19?',
      options: {
        fever: 'Fever',
        cough: 'Cough',
        breath: 'Short of breath',
      },
    },
    fever: {
      label: 'How did you conclude a fever?',
      options: {
        measured: 'Measured',
        subjective: 'Subjectively',
      },
    },
    tested: {
      label: 'Have you been tested?',
      description: 'Not your test result',
      options: {
        true: 'Yes',
        false: 'No',
      },
    },
    state: {
      label: 'What is your current state?',
      options: {
        quarantined: {
          label: 'Quarantined',
          description: 'Working from home, only leaving the house for absolute necessities',
        },
        isolation: {
          label: 'Isolation',
          description: 'Never leaving the house, getting deliveries to your door',
        },
        hospitalized: {
          label: 'Hospitalized',
          description: 'In care with the health system',
        },
        neither: {
          label: 'Neither',
        },
      },
    },
  },
};
