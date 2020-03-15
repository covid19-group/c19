import fetch from 'node-fetch';
import db from '../db';

import { useState, useContext } from 'react';
import { Header, Label, Checkbox, Radio, Input, InputWithDropDown } from '../components/Form';
import PageLayout from '../components/PageLayout';
import { LanguageContext } from '../components/LanguageSelector';
import registrationContent from '../content/registration';
import fahrenheitToCelcius from '../methods/fahrenheitToCelcius';

function Registration({ phone, survey }) {
  /* authorization */
  /* TODO: Move to seperate component */
  // const [phone, setPhone] = useState('');
  // const [code, setCode] = useState('');

  /* one time questions */
  /* TODO: Move so separate component */
  const [country, setCountry] = useState('');
  const [age, setAge] = useState('');

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
      <Header
        title={
          <div className="flex flex-wrap">
            <span className="flex-auto">Registration by {phone}</span>
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
          <span className="ml-3 inline-flex rounded-md shadow-sm">
            <button
              onClick={() => e.preventDefault()}
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
              {content.submit}
            </button>
          </span>
        </div>
      </div>
    </PageLayout>
  );
}

export async function getServerSideProps(context) {
  const secret = process.env.SECRET;
  const { survey } = context.query;
  const phone = await db.task(async t => {
    const { person } = await t.one(
      `SELECT *
        FROM survey
        WHERE id = $/id/`,
      { id: survey }
    );
    const { phone } = await db.oneOrNone(
      `SELECT PGP_SYM_DECRYPT(phone::bytea, $/secret/) as phone
      FROM person
      WHERE id = $/id/`,
      { secret, id: person }
    );
    return phone;
  });
  if (phone) {
    return {
      props: {
        phone: '*'.repeat(phone.substr(0, phone.length - 4).length) + phone.substr(phone.length - 4),
        survey,
      },
    };
  } else return {};
}

export default Registration;
