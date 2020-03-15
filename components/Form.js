export const InputWithFix = ({ id, prefix, suffix, value, onChange, placeholder, type = 'text', ...props }) => (
  <div className="mt-1 sm:col-span-2">
    <div className="relative max-w-lg flex rounded-md shadow-sm">
      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
        {prefix}
      </span>
      <input
        id={id}
        value={value}
        type={type}
        placeholder={placeholder}
        onChange={e => onChange({ id, value: e.target.value })}
        className="flex-1 form-input block w-full rounded-none rounded-r-md transition duration-150 ease-in-out sm:text-sm sm:leading-5"
        {...props}
      />
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">{suffix}</div>
    </div>
  </div>
);

export const InputWithDropDown = ({ value, onChange, options = [], onSelectChange, placeholder }) => (
  <div className="mt-1 relative">
    <div className="absolute inset-y-0 left-0 flex items-center">
      <select
        onChange={e => onSelectChange({ id: e.target.value })}
        className="form-select h-full py-0 pl-3 pr-8 border-transparent bg-transparent text-gray-500 sm:text-sm sm:leading-5">
        {options.map(option => (
          <option>{option}</option>
        ))}
      </select>
    </div>
    <input className="form-input block w-full pl-20 sm:text-sm sm:leading-5" placeholder={placeholder} />
  </div>
);

export const Textarea = ({ id, value, onChange, placeholder, type = 'text' }) => (
  <div className="mt-1 sm:mt-4 sm:col-span-2">
    <div className="max-w-lg flex rounded-md shadow-sm">
      <textarea
        id={id}
        value={value}
        type={type}
        placeholder={placeholder}
        onChange={e => onChange({ id, value: e.target.value })}
        rows="3"
        className="form-textarea block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"></textarea>
    </div>
    {description && <p className="mt-2 text-sm text-gray-500">{description}</p>}
  </div>
);

export const Input = ({ id, value, onChange, placeholder, type = 'text' }) => (
  <div className="mt-1 sm:mt-4 sm:col-span-2">
    <div className="max-w-xs rounded-md shadow-sm">
      <input
        id={id}
        value={value}
        type={type}
        placeholder={placeholder}
        onChange={e => {
          console.log(e.target.value);
          onChange({ id, value: e.target.value });
        }}
        className="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
      />
    </div>
  </div>
);

export const Select = ({ id, value, onChange, options }) => (
  <div className="mt-1 sm:mt-0 sm:col-span-2">
    <div className="max-w-xs rounded-md shadow-sm">
      <select
        id={id}
        value={value}
        onChange={e => onChange({ id, value: e.target.value })}
        className="block form-select w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5">
        {options.map(option => (
          <option>{option}</option>
        ))}
      </select>
    </div>
  </div>
);

export const Checkbox = ({ id, label, checked, onChange, description }) => (
  <label className="relative flex items-start mt-4">
    <div className="absolute flex items-center h-5">
      <input
        id={id}
        checked={checked}
        onChange={e => onChange({ id, value: !!checked })}
        type="checkbox"
        className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
      />
    </div>
    <div className="pl-7 text-sm leading-5">
      <span className="font-medium text-gray-700">{label}</span>
      {description && <p className="text-gray-500">{description}</p>}
    </div>
  </label>
);

export const Radio = ({ id, label, checked, onChange, description }) => (
  <label className="relative flex items-start mt-4">
    <div className="absolute flex items-center h-5">
      <input
        id={id}
        checked={checked}
        onChange={e => onChange({ id })}
        type="radio"
        className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
      />
    </div>
    <div className="pl-7 text-sm leading-5">
      <span className="font-medium text-gray-700">{label}</span>
      {description && <p className="text-gray-500">{description}</p>}
    </div>
  </label>
);

export const Header = ({ title, description }) => (
  <div className="pb-4 border-b border-gray-200">
    <h3 className="text-lg leading-6 font-medium text-gray-900">{title}</h3>
    <p className="mt-1 max-w-2xl text-sm leading-5 text-gray-500">{description}</p>
  </div>
);

export const Label = ({ label, description, children }) => (
  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-b sm:border-gray-200 py-5">
    <label className="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2">
      {label}
      {description && <span className="block my-1 font-normal text-gray-500">{description}</span>}
    </label>
    <div className="-mt-2 mb-2 sm:col-span-2">{children}</div>
  </div>
);
