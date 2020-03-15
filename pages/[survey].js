import fetch from 'node-fetch';

import { useState, useContext } from 'react';
import { Header, Label, Checkbox, Radio, Input, InputWithDropDown } from '../components/Form';
import PageLayout from '../components/PageLayout';
import ConfirmationModal from '../components/ConfirmationModal';
import LoadingSpinner from '../components/LoadingSpinner';
import { LanguageContext } from '../components/LanguageSelector';
import registrationContent from '../content/registration';
import fahrenheitToCelcius from '../methods/fahrenheitToCelcius';

function Registration({ phone, survey }) {
  /* one time questions */
  /* TODO: Move so separate component */
  const [country, setCountry] = useState('');
  const [age, setAge] = useState('');

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(false);

  /* each registration */
  const [exposure, setExposure] = useState([]);
  const [exposureDate, setExposureDate] = useState(null);
  const [symptoms, setSymptoms] = useState([]);
  const [scale, setScale] = useState('℃');
  const [fever, setFever] = useState('');
  const [feverValue, setFeverValue] = useState('');
  const [tested, setTested] = useState(false);
  const [state, setState] = useState([]);

  const { language } = useContext(LanguageContext);
  const content = registrationContent[language];

  return (
    <PageLayout>
      {showConfirmation && <ConfirmationModal language={language} close={() => setShowConfirmation(false)} />}
      <Header
        title={
          <div className="flex flex-wrap">
            <span className="flex-auto">
              {content.by} {phone}
            </span>
            <span className="text-gray-500">
              {new Date().toLocaleString(language, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </div>
        }
      />
      <Label label={content.exposure.label}>
        {Object.keys(content.exposure.options).map(key => {
          let { label, description } = content.exposure.options[key];
          description = description && (
            <>
              {description.value}
              <a href={description.link.href} target={description.link.href} className="text-indigo-500">
                {description.link.label}
              </a>
            </>
          );
          const optionProps = {
            key,
            label,
            description,
            onChange: () => {
              if (exposure.includes(key)) {
                setExposure(exposure.filter(string => string !== value));
              } else setExposure(exposure.concat(key));
            },
          };
          return <Checkbox {...optionProps} />;
        })}
      </Label>
      {!!exposure.length && (
        <Label label={content.exposureDate.label}>
          <Input type="date" onChange={({ value }) => setExposureDate(value)} />
        </Label>
      )}
      <Label label={content.symptoms.label}>
        {Object.keys(content.symptoms.options).map(key => (
          <Checkbox
            label={content.symptoms.options[key]}
            onChange={() => {
              if (symptoms.includes(key)) {
                setSymptoms(symptoms.filter(string => string !== value));
              } else setSymptoms(symptoms.concat(key));
            }}
          />
        ))}
      </Label>
      {symptoms.includes('fever') && (
        <Label label={content.fever.label}>
          <Radio
            type="number"
            checked={fever === 'measured'}
            label={content.fever.options.measured}
            onChange={() => setFever('measured')}
            description={
              fever === 'measured' && (
                <InputWithDropDown
                  placeholder={scale === '℃' ? '38' : '98'}
                  options={['℃', '℉']}
                  onSelectChange={({ id }) => setScale(id)}
                  onChange={({ value }) => setFeverValue(scale === '℃' ? value : fahrenheitToCelcius(value))}
                />
              )
            }
          />
          <Radio
            label={content.fever.options.subjective}
            checked={fever === 'subjective'}
            onChange={() => {
              setFever('subjective');
              setFeverValue('');
            }}
          />
        </Label>
      )}
      <Label label={content.tested.label} description={content.tested.description}>
        <Radio label={content.tested.options.true} checked={tested} onChange={() => setTested(true)} />
        <Radio label={content.tested.options.false} checked={!tested} onChange={() => setTested(false)} />
      </Label>
      <Label label={content.state.label}>
        {Object.keys(content.state.options).map(key => {
          const { label, description } = content.state.options[key];
          const optionProps = { label, description, onChange: () => setState(key), checked: key === state };
          return <Radio {...optionProps} />;
        })}
      </Label>
      <div className="pt-5">
        <div className="flex justify-end">
          <p className="mt-2 text-xs font-normal text-red-600">{error}</p>
          <span className="ml-3 inline-flex rounded-md shadow-sm">
            <button
              onClick={async e => {
                setSaving(true);
                e.preventDefault();
                const response = await fetch('/api/post/survey', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    value: {
                      country,
                      age,
                      exposure,
                      exposureDate,
                      symptoms,
                      scale,
                      fever,
                      feverValue,
                      tested,
                      state,
                    },
                    survey,
                  }),
                });
                if (response.ok) setShowConfirmation(true);
                else setError('An unexpected error occured. Please try again.');
                setSaving(false);
              }}
              type="submit"
              className="relative inline-flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
              <LoadingSpinner
                size={16}
                color="white"
                className={saving ? 'absolute inset-0 h-full flex items-center' : 'hidden'}
              />
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
  const { phone, value } = await db.task(async t => {
    const { person, value } =
      (await t.oneOrNone(
        `SELECT *
        FROM survey
        WHERE id = $/id/`,
        { id: survey }
      )) || {};
    if (!person) return {};
    const { phone } = await db.oneOrNone(
      `SELECT PGP_SYM_DECRYPT(phone::bytea, $/secret/) as phone
      FROM person
      WHERE id = $/id/`,
      { secret, id: person }
    );
    return { phone, value };
  });
  if (phone) {
    return {
      props: {
        phone: '*'.repeat(phone.substr(0, phone.length - 4).length) + phone.substr(phone.length - 4),
        survey,
        submitted: value !== null,
      },
    };
  } else return { props: {} };
}

export default Registration;
