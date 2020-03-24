export default {
  'da-DK': {
    testBtn: 'Brug test telefonnummer',
    or: 'Eller',
    phone: {
      types: {
        whatsApp: "WhatsApp",
        teleProvider: "Telefon"
      },
      label: 'Telefonnummer',
      description: '',
      error: {
        incomplete: 'Venligst indtast et gyldigt telefonnummer først',
        wrongCountryCode: 'Vi understøtter på nuværende tidspunkt kun danske numre',
        missingCountryCode: 'Venligst inkluder din landekode (f.eks. +45)',
        invalid: 'Det ser ikke rigtigt ud. Prøv venligst igen.',
        unknown: 'Der skete en fejl. Prøv igen senere.',
        wait: 'Du kan sende en ny kode om: ',
        secs: 'Sekunder',
      },
      btn: {
        send: 'Send',
        code: 'Kode',
        sent: 'Sendt',
      },
    },
    code: {
      label: 'Bekræftelseskode',
      description: 'Modtaget via SMS',
      reset: 'Nulstil',
    },
    reminders: {
      label: 'Modtag påmindelser på SMS',
      description: 'Send mig dagligt et link til registrering',
    },
    btn: {
      label: 'Gå til tilmelding',
      error: 'Koden er ugyldig.',
    },
    consent: {
      label: 'Behandling af persondata',
      description:
        'Vi må behandle dine persondata for at skabe et overblik over befolkningens symptomer ifm. med epidemier, fx COVID-19. Læs vores ',
      privacy: 'Privatlivspolitik',
    },
  },
  'en-UK': {
    testBtn: 'Use Test Number',
    or: 'Or',
    phone: {
      types: {
        whatsApp: "WhatsApp",
        teleProvider: "Telephone"
      },
      label: 'Phone Number',
      description: '',
      error: {
        incomplete: 'Please enter a valid phone number first',
        wrongCountryCode: 'We currently only support danish phone numbers',
        missingCountryCode: 'Please specify your country code (e.g. +44)',
        invalid: "This doesn't look right. Try again.",
        unknown: 'An error occured. Please try again later.',
        wait: 'You can request another code in: ',
        secs: 'Seconds',
      },
      btn: {
        send: 'Send',
        code: 'Code',
        sent: 'Sent',
      },
    },
    code: {
      label: 'Verification Code',
      description: 'Received by SMS',
      reset: 'Reset',
    },
    reminders: {
      label: 'Receive SMS notifications',
      description: 'Send me a link to the daily registration',
    },
    btn: {
      label: 'Continue to Registration',
      error: 'The code is invalid.',
    },
    consent: {
      label: 'Use of personal data',
      description:
        'We may use your personal data to create an overview of symptoms in the public from epidemic outbreaks, e.g. COVID-19. Read our',
      privacy: 'Privacy Policy',
    },
  },
};
