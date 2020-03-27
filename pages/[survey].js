import fetch from 'node-fetch';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { useState, useContext } from 'react';
import { Header, Label, Checkbox, Radio, Input, InputWithFix, Toggle } from '../components/Form';
import PageLayout from '../components/PageLayout';
import ConfirmationModal from '../components/ConfirmationModal';
import LoadingSpinner from '../components/LoadingSpinner';
import { LanguageContext } from '../components/LanguageSelector';
import registrationContent from '../content/registration';
import authContent from '../content/authForm';
const R = require('ramda');

function Registration({ phone, survey, initial, reminders, consented, defaultSisterSurveys }) {
  const [sisterSurveys, setSisterSurveys] = useState(defaultSisterSurveys);

  /* one time questions */
  const [sex, setSex] = useState(null);
  const [zip, setZip] = useState('');
  const [born, setBorn] = useState('');
  const [household, setHousehold] = useState('');
  const [children, setChildren] = useState('');
  const [conditions, setConditions] = useState([]);

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(false);

  const [consent, setConsent] = useState(false);
  const [wantReminders, setWantReminders] = useState(!reminders);
  const [hasChanged, setHasChanged] = useState(initial || false);

  /* each registration */
  const [exposure, setExposure] = useState([]);
  const [temperature, setTemperature] = useState(null);
  const [temperatureValue, setTemperatureValue] = useState('');
  const [symptoms, setSymptoms] = useState([]);

  const [symptomsAdditional, setSymptomsAdditional] = useState({});
  const changeSymptomsAdditional = (symptom, key, optionKey) => {
    setSymptomsAdditional(R.assocPath([symptom, key], optionKey, symptomsAdditional));
  };

  const [distancing, setDistancing] = useState(null);
  const [state, setState] = useState(null);
  const [critical, setCritical] = useState(null);
  const [neighbourhood, setNeighbourhood] = useState(null);
  const [community, setCommunity] = useState(null);

  const { language } = useContext(LanguageContext);
  const content = registrationContent[language];
  const auth = authContent[language];

  if (!survey) {
    return (
      <PageLayout>
        <p>
          {content.expired.label}{' '}
          <Link href="/">
            <a className="text-teal-600 hover:text-teal-700">{content.expired.link}</a>
          </Link>
          .
        </p>
      </PageLayout>
    );
  }

  const unit = initial ? '14 ' + content.unit.days : '24 ' + content.unit.hours;

  const validTemperatureValue = temperatureValue > 30 && temperatureValue < 45;

  const symptomsAdditionalAnswered = symptoms.reduce(
    (acc, symptom) =>
      !!(
        acc &&
        Object.keys(content.symptoms.additional).reduce(
          (acc, key) => !!(acc && R.path([symptom, key], symptomsAdditional)),
          true
        )
      ),
    true
  );

  const complete =
    (consented || consent) &&
    (!hasChanged ||
      (!!temperature &&
        (temperature !== 'measured' || validTemperatureValue) &&
        !!distancing &&
        !!state &&
        (state !== 'work' || !!critical) &&
        !!symptomsAdditionalAnswered &&
        !!community &&
        !!neighbourhood &&
        !!exposure &&
        (!initial || (!!sex && born.length === 4 && zip.length === 4 && !!household.length))));

  const submitSurvey = async e => {
    setError(false);
    setSaving(true);
    e.preventDefault();

    /* If user didn't receive reminders, but changed their mind, update reminder preferences,
                     but don't await it to go through – shouldn't interfere with form submission UX */
    if (!reminders && wantReminders) {
      fetch('/api/post/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          survey,
        }),
      });
    }

    /* If user didn't complete the right consent form, we force them to do it here,
                    but shouldn't interfere with form submission UX */
    if (!consented && consent) {
      fetch('/api/post/consent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          survey,
        }),
      });
    }

    const response = await fetch('/api/post/survey', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        hasChanged,
        value: {
          initial: initial || false,
          sex,
          zip,
          born,
          household,
          children,
          conditions,
          exposure,
          temperature,
          temperatureValue,
          symptoms,
          symptomsAdditional,
          distancing,
          state,
          critical,
          neighbourhood,
          community,
        },
        survey,
      }),
    });
    if (response.ok) setShowConfirmation(true);
    else setError('An unexpected error occured. Please try again.');
    setSaving(false);
  };

  const addParticipant = async () => {
    const response = await fetch('/api/post/participant', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        survey,
      }),
    });

    if (response.ok) {
      const result = await response.json();
      setSisterSurveys(sisterSurveys.concat({ survey: result?.survey?.id }));
    } else setError('An unexpected error occured. Please try again.');
    setSaving(false);
  };

  return (
    <PageLayout>
      <ConfirmationModal
        offerToAddParticipants={initial && parseInt(household)}
        language={language}
        show={showConfirmation}
        addParticipant={() => {
          addParticipant();
          setShowConfirmation(false);
        }}
        close={() => setShowConfirmation(false)}
      />
      <div className="mb-2">
        {sisterSurveys.map((item, index) => (
          <span key={item.survey}>
            {!!index && ' • '}
            <Link href={'/' + item.survey} className="text-blue-800">
              <a className="text-blue-800">{item.survey}</a>
            </Link>
          </span>
        ))}
      </div>

      <Header
        title={
          <>
            <div className="flex flex-wrap items-baseline">
              <span className="flex-auto">
                {initial && content.baseline.label} {content.by} {phone}
              </span>
              <span className="text-base pt-1 text-gray-500">
                {new Date().toLocaleString(language, {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
            {initial && (
              <p className="max-w-xl mt-4 text-sm text-gray-500">
                {content.baseline.description.replace('{unit}', unit)}
              </p>
            )}
          </>
        }
      />
      {!initial && (
        <Label
          label={content.noChange.label.replace('{unit}', unit)}
          description={content.noChange.description.replace('{unit}', unit)}>
          <Radio
            label={content.noChange.options.no}
            checked={!hasChanged}
            onChange={() => setHasChanged(!hasChanged)}
          />
          <Radio
            label={content.noChange.options.yes}
            checked={hasChanged}
            onChange={() => setHasChanged(!hasChanged)}
          />
        </Label>
      )}
      {initial && (
        <>
          <Label label={content.sex.label}>
            {Object.keys(content.sex.options).map(key => (
              <Radio key={key} label={content.sex.options[key]} checked={sex === key} onChange={() => setSex(key)} />
            ))}
          </Label>
          <Label label={content.born.label}>
            <div className="w-24">
              <InputWithFix
                suffix={born.length === 4 && <Checkmark />}
                value={born}
                placeholder="1968"
                onChange={({ value }) =>
                  setBorn([...value].filter((v, idx) => idx < 4 && Number.isInteger(parseInt(v))).join(''))
                }
              />
            </div>
          </Label>
          <Label label={content.zip.label}>
            <div className="w-24">
              <InputWithFix
                suffix={zip.length === 4 && <Checkmark />}
                value={zip}
                placeholder="2200"
                onChange={({ value }) =>
                  setZip([...value].filter((v, idx) => idx < 4 && Number.isInteger(parseInt(v))).join(''))
                }
              />
            </div>
          </Label>
          <Label label={content.household.label}>
            <div className="w-24">
              <InputWithFix
                suffix={parseInt(household) > 0 && <Checkmark />}
                value={household}
                placeholder="4"
                onChange={({ value }) => setHousehold([...value].filter(v => Number.isInteger(parseInt(v))).join(''))}
              />
            </div>
          </Label>
          {household > 1 && (
            <Label label={content.children.label}>
              <div className="w-24">
                <InputWithFix
                  suffix={parseInt(children) >= 0 && <Checkmark />}
                  value={children}
                  placeholder="2"
                  onChange={({ value }) => setChildren([...value].filter(v => Number.isInteger(parseInt(v))).join(''))}
                />
              </div>
            </Label>
          )}
          <Label label={content.conditions.label} description={content.conditions.description}>
            {Object.keys(content.conditions.options).map(key => (
              <Checkbox
                key={key}
                label={content.conditions.options[key].label}
                description={content.conditions.options[key].description}
                onChange={() => {
                  if (conditions.includes(key)) {
                    setConditions(conditions.filter(string => string !== key));
                  } else setConditions(conditions.concat(key));
                }}
              />
            ))}
          </Label>
        </>
      )}
      {(initial || hasChanged) && (
        <>
          <Label
            label={content.exposure.label.replace('{unit}', unit)}
            description={content.exposure.description.replace('{unit}', unit)}>
            {Object.keys(content.exposure.options).map(key => (
              <Radio
                key={key}
                label={content.exposure.options[key]}
                checked={exposure === key}
                onChange={() => setExposure(key)}
              />
            ))}
          </Label>
          <Label label={<ReactMarkdown source={content.temperature.label.replace('{unit}', unit)} />}>
            <Radio
              checked={temperature === 'measured'}
              label={content.temperature.options.measured}
              onChange={() => setTemperature('measured')}
              description={
                <InputWithFix
                  suffix={validTemperatureValue && <Checkmark />}
                  value={
                    typeof temperatureValue === 'number'
                      ? temperatureValue.toString().replace('.', content.unit.decimalSeperator)
                      : temperatureValue
                  }
                  placeholder="38"
                  prefix="°C"
                  onChange={({ value }) => {
                    setTemperature('measured');
                    setTemperatureValue(value.replace(/[^\d\.,]/g, ''));
                  }}
                  onBlur={() => {
                    temperatureValue && setTemperatureValue(parseFloat(String(temperatureValue).replace(',', '.')));
                  }}
                />
              }
            />
            {['subjective', 'normal'].map(key => (
              <Radio
                key={key}
                label={content.temperature.options[key].label}
                description={content.temperature.options[key].description}
                checked={temperature === key}
                onChange={() => {
                  setTemperature(key);
                  setTemperatureValue('');
                }}
              />
            ))}
          </Label>
          <Label
            label={content.symptoms.label.replace('{unit}', unit)}
            description={content.symptoms.description.replace('{unit}', unit)}>
            {Object.keys(content.symptoms.options).map(key => (
              <Checkbox
                label={content.symptoms.options[key]}
                key={key}
                onChange={() => {
                  if (symptoms.includes(key)) {
                    setSymptoms(symptoms.filter(string => string !== key));
                  } else setSymptoms(symptoms.concat(key));
                }}
              />
            ))}
          </Label>
          {symptoms.map(symptom =>
            Object.keys(content.symptoms.additional).map(key => (
              <Label
                key={key}
                label={content.symptoms.additional[key].label.replace(
                  '{symptom}',
                  content.symptoms.options[symptom].toLowerCase()
                )}>
                {Object.keys(content.symptoms.additional[key].options).map(optionKey => (
                  <Radio
                    key={key + '-' + optionKey}
                    label={content.symptoms.additional[key].options[optionKey]}
                    checked={R.path([symptom, key], symptomsAdditional) === optionKey}
                    onChange={() => changeSymptomsAdditional(symptom, key, optionKey)}
                  />
                ))}
              </Label>
            ))
          )}
          <Label label={content.distancing.label.replace('{unit}', unit)}>
            {Object.keys(content.distancing.options).map(key => {
              const label = content.distancing.options[key];
              const optionProps = { label, onChange: () => setDistancing(key), checked: key === distancing };
              return <Radio key={key} {...optionProps} />;
            })}
          </Label>
          <Label label={content.state.label}>
            {Object.keys(content.state.options).map(key => {
              const label = content.state.options[key];
              const optionProps = { label, onChange: () => setState(key), checked: key === state };
              return <Radio key={key} {...optionProps} />;
            })}
          </Label>
          {state === 'work' && (
            <Label label={content.critical.label}>
              {Object.keys(content.critical.options).map(key => {
                const label = content.critical.options[key];
                const optionProps = { label, onChange: () => setCritical(key), checked: key === critical };
                return <Radio {...optionProps} />;
              })}
            </Label>
          )}
          <Label label={content.neighbourhood.label}>
            {Object.keys(content.neighbourhood.options).map(key => {
              const label = content.neighbourhood.options[key];
              const optionProps = { label, onChange: () => setNeighbourhood(key), checked: key === neighbourhood };
              return <Radio key={key} {...optionProps} />;
            })}
          </Label>
          <Label label={content.community.label}>
            {Object.keys(content.community.options).map(key => {
              const label = content.community.options[key];
              const optionProps = { label, onChange: () => setCommunity(key), checked: key === community };
              return <Radio key={key} {...optionProps} />;
            })}
          </Label>
        </>
      )}
      {consented === false && (
        <Label label={auth.consent.label}>
          <Checkbox
            checked={consent}
            onChange={() => setConsent(!consent)}
            description={
              <p>
                {auth.consent.description}
                <a href="/privacy" target="_privacy" className="font-medium text-gray-900 underline">
                  {auth.consent.privacy}
                </a>
              </p>
            }
          />
        </Label>
      )}
      {reminders === false && (
        <Label label={auth.reminders.label}>
          <Checkbox
            checked={wantReminders}
            onChange={() => setWantReminders(!wantReminders)}
            label={auth.reminders.description}
          />
        </Label>
      )}
      <div className="pt-5">
        {!error && !complete && (
          <p className="my-2 text-right text-xs font-normal text-gray-700">{content.incomplete}</p>
        )}
        <div className="flex items-center justify-end">
          <p className="mt-2 text-xs font-normal text-red-600">{error}</p>
          <span className="ml-3 inline-flex rounded-md shadow-sm">
            <button
              onClick={submitSurvey}
              disabled={!complete}
              className={
                (complete ? 'hover:bg-teal-600' : 'opacity-50 cursor-default focus:outline-none') +
                ' flex-shrink-0 relative inline-flex justify-center text-white bg-teal-500 py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md'
              }>
              {saving && (
                <span className="absolute inset-0 h-full flex items-center justify-center text-lg">
                  <LoadingSpinner color="white" />
                </span>
              )}
              <span className={saving ? 'invisible' : ''}>{content.submit}</span>
            </button>
          </span>
        </div>
      </div>
    </PageLayout>
  );
}

export async function getServerSideProps(context) {
  const db = require('../db');
  const secret = process.env.SECRET;
  const { survey } = context.query;
  const { phone, value, surveys, reminders, consent, sisterSurveys } = await db.task(async t => {
    const { person, value } =
      (await t.oneOrNone(
        `SELECT *
        FROM survey
        WHERE id = $/id/
          and date = current_date`,
        { id: survey }
      )) || {};
    if (!person) return {};
    const { phone, reminders, consent } = await t.oneOrNone(
      `SELECT PGP_SYM_DECRYPT(phone::bytea, $/secret/) as phone, reminders, consent
      FROM person
      WHERE id = $/id/`,
      { secret, id: person }
    );
    //find out if this is the initial survey, for this participant
    const { surveys } = await t.one(
      `SELECT s1.participant, count(s1.id) as surveys
      FROM survey s1
      INNER JOIN survey s2 on s1.participant = s2.participant
      WHERE s1.person = $/person/
      AND s2.id = $/survey/
      GROUP BY s1.participant`,
      { person, survey }
    );

    const sisterSurveys = await t.any(
      `SELECT s1.id as survey
      FROM survey s1
      INNER JOIN survey s2 on s1.person = s2.person
      WHERE s2.id = $/survey/
      AND s1.date = current_date
      AND s1.id <> $/survey/`,
      { survey }
    );

    return { phone, value, surveys, reminders, consent, sisterSurveys };
  });
  if (phone) {
    return {
      props: {
        phone: '*'.repeat(phone.substr(0, phone.length - 4).length) + phone.substr(phone.length - 4),
        survey,
        initial: parseInt(surveys) === 1,
        reminders,
        consented: consent,
        defaultSisterSurveys: sisterSurveys || [],
      },
    };
  } else return { props: {} };
}

export default Registration;

const Checkmark = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-teal-500">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);
