import React from 'react';
import { useController } from 'react-hook-form';

// Input Component
const Input = ({ name, control, label, placeholder, type = 'text' }) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue: '',
  });

  return (
    <div className="mb-4.5">
      <label className="mb-2.5 block text-black dark:text-white">
        {label}
      </label>
      <input
        {...field}
        type={type}
        placeholder={placeholder}
        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
      />
      {error && <span className="text-red-500">{error.message}</span>}
    </div>
  );
};

// FileInput Component
const FileInput = ({ name, control, label }) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue: null,
  });

  const handleFileChange = (e) => {
    field.onChange(e.target.files[0]);
  };

  return (
    <div className="mb-4.5">
      <label className="mb-2.5 block text-black dark:text-white">
        {label}
      </label>
      <input
        {...field}
        type="file"
        onChange={handleFileChange}
        className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
      />
      {error && <span className="text-red-500">{error.message}</span>}
    </div>
  );
};

// Select Component
const Select = ({ name, control, label, options }) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue: '',
  });

  return (
    <div className="mb-4.5">
      <label className="mb-2.5 block text-black dark:text-white">
        {label}
      </label>
      <select
        {...field}
        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
      >
        <option value="">Select an option</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className="text-red-500">{error.message}</span>}
    </div>
  );
};

// MultiSelect Component
const MultiSelect = ({ name, control, label, options }) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue: [],
  });

  const handleChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(
      (option) => option.value
    );
    field.onChange(selectedOptions);
  };

  return (
    <div className="mb-4.5">
      <label className="mb-2.5 block text-black dark:text-white">
        {label}
      </label>
      <select
        {...field}
        multiple
        onChange={handleChange}
        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className="text-red-500">{error.message}</span>}
    </div>
  );
};

const Textarea = ({ name, control, label, placeholder, rows = 6 }) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue: '',
  });

  return (
    <div className="mb-4.5">
      <label className="mb-2.5 block text-black dark:text-white">
        {label}
      </label>
      <textarea
        {...field}
        rows={rows}
        placeholder={placeholder}
        className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
      />
      {error && <span className="text-red-500">{error.message}</span>}
    </div>
  );
};


// Export all components
export { Input, FileInput, Select, MultiSelect, Textarea };
