import React, { useState } from 'react';

// Custom Radio Button Component with peer-none
const CustomRadioButton = ({
  label,
  options = [],
  value,
  onChange,
  name,
  disabled = false,
  className = '',
  labelClassName = '',
  optionClassName = '',
  direction = 'vertical',
  required = false,
  variant = 'default', // 'default', 'card', 'button'
  size = 'md', // 'sm', 'md', 'lg'
  ...props
}) => {
  const sizeClasses = {
    sm: { container: 'w-4 h-4', dot: 'w-2 h-2' },
    md: { container: 'w-5 h-5', dot: 'w-2.5 h-2.5' },
    lg: { container: 'w-6 h-6', dot: 'w-3 h-3' }
  };

  const currentSize = sizeClasses[size] || sizeClasses.md;

  const renderOption = (option, index) => {
    const optionValue = typeof option === 'object' ? option.value : option;
    const optionLabel = typeof option === 'object' ? option.label : option;
    const optionDisabled = typeof option === 'object' ? option.disabled : false;
    const optionId = `${name}-${index}`;
    const isChecked = value === optionValue;
    const isDisabled = disabled || optionDisabled;

    if (variant === 'card') {
      return (
        <div key={optionValue} className={`relative ${optionClassName}`}>
          <input
            type="radio"
            id={optionId}
            name={name}
            value={optionValue}
            checked={isChecked}
            onChange={(e) => onChange && onChange(e.target.value, e)}
            disabled={isDisabled}
            className="absolute opacity-0 w-0 h-0 peer"
          />
          <label
            htmlFor={optionId}
            className={`block p-4 bg-white border-2 rounded-lg cursor-pointer transition-all duration-200
              ${isChecked ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'}
              ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <div className="flex items-center">
              <div className={`${currentSize.container} border-2 rounded-full mr-3 flex items-center justify-center
                ${isChecked ? 'border-blue-500 bg-blue-500' : 'border-gray-300'}`}>
                {isChecked && <div className={`${currentSize.dot} bg-white rounded-full`} />}
              </div>
              <span className="text-gray-700 font-medium">{optionLabel}</span>
            </div>
          </label>
        </div>
      );
    }

    if (variant === 'button') {
      return (
        <div key={optionValue} className={`relative ${optionClassName}`}>
          <input
            type="radio"
            id={optionId}
            name={name}
            value={optionValue}
            checked={isChecked}
            onChange={(e) => onChange && onChange(e.target.value, e)}
            disabled={isDisabled}
            className="absolute opacity-0 w-0 h-0"
          />
          <label
            htmlFor={optionId}
            className={`inline-flex items-center px-4 py-2 border rounded-md cursor-pointer transition-all duration-200
              ${isChecked 
                ? 'bg-blue-500 text-white border-blue-500' 
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}
              ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {optionLabel}
          </label>
        </div>
      );
    }

    // Default variant
    return (
      <div key={optionValue} className={`relative flex items-center ${optionClassName}`}>
        <input
          type="radio"
          id={optionId}
          name={name}
          value={optionValue}
          checked={isChecked}
          onChange={(e) => onChange && onChange(e.target.value, e)}
          disabled={isDisabled}
          className="absolute opacity-0 w-0 h-0"
        />
        <label
          htmlFor={optionId}
          className={`flex items-center cursor-pointer ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <div className={`${currentSize.container} border-2 rounded-full mr-3 flex items-center justify-center transition-all duration-200
            ${isChecked ? 'border-blue-500 bg-blue-500' : 'border-gray-300 hover:border-blue-400'}`}>
            {isChecked && <div className={`${currentSize.dot} bg-white rounded-full`} />}
          </div>
          <span className="text-gray-700 select-none">{optionLabel}</span>
        </label>
      </div>
    );
  };

  return (
    <div className={`radio-group ${className}`} {...props}>
      {label && (
        <div className={`text-sm font-medium text-gray-700 mb-3 ${labelClassName}`}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </div>
      )}
      
      <div className={`${direction === 'horizontal' ? 'flex flex-wrap gap-3' : 'space-y-3'}`}>
        {options.map(renderOption)}
      </div>
    </div>
  );
};

// Custom Checkbox Component with peer-none
const CustomCheckbox = ({
  label,
  options = [],
  value = [],
  onChange,
  name,
  disabled = false,
  className = '',
  labelClassName = '',
  optionClassName = '',
  direction = 'vertical',
  required = false,
  selectAll = false,
  variant = 'default', // 'default', 'card', 'button', 'switch'
  size = 'md',
  ...props
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const currentSize = sizeClasses[size] || sizeClasses.md;

  const handleSingleChange = (optionValue, checked) => {
    let newValue;
    if (checked) {
      newValue = [...value, optionValue];
    } else {
      newValue = value.filter(v => v !== optionValue);
    }
    onChange && onChange(newValue);
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      const allValues = options.map(option => 
        typeof option === 'object' ? option.value : option
      );
      onChange && onChange(allValues);
    } else {
      onChange && onChange([]);
    }
  };

  const isAllSelected = options.length > 0 && options.every(option => {
    const optionValue = typeof option === 'object' ? option.value : option;
    return value.includes(optionValue);
  });

  const isSomeSelected = value.length > 0 && !isAllSelected;

  const CheckIcon = () => (
    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  );

  const renderOption = (option, index) => {
    const optionValue = typeof option === 'object' ? option.value : option;
    const optionLabel = typeof option === 'object' ? option.label : option;
    const optionDisabled = typeof option === 'object' ? option.disabled : false;
    const optionId = `${name}-${index}`;
    const isChecked = value.includes(optionValue);
    const isDisabled = disabled || optionDisabled;

    if (variant === 'switch') {
      return (
        <div key={optionValue} className={`relative flex items-center justify-between ${optionClassName}`}>
          <span className="text-gray-700 font-medium">{optionLabel}</span>
          <input
            type="checkbox"
            id={optionId}
            checked={isChecked}
            onChange={(e) => handleSingleChange(optionValue, e.target.checked)}
            disabled={isDisabled}
            className="absolute opacity-0 w-0 h-0"
          />
          <label
            htmlFor={optionId}
            className={`relative inline-flex h-6 w-11 items-center rounded-full cursor-pointer transition-colors duration-200
              ${isChecked ? 'bg-blue-500' : 'bg-gray-200'}
              ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200
              ${isChecked ? 'translate-x-6' : 'translate-x-1'}`} />
          </label>
        </div>
      );
    }

    if (variant === 'card') {
      return (
        <div key={optionValue} className={`relative ${optionClassName}`}>
          <input
            type="checkbox"
            id={optionId}
            checked={isChecked}
            onChange={(e) => handleSingleChange(optionValue, e.target.checked)}
            disabled={isDisabled}
            className="absolute opacity-0 w-0 h-0"
          />
          <label
            htmlFor={optionId}
            className={`block p-4 bg-white border-2 rounded-lg cursor-pointer transition-all duration-200
              ${isChecked ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'}
              ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <div className="flex items-center">
              <div className={`${currentSize} border-2 rounded mr-3 flex items-center justify-center
                ${isChecked ? 'border-blue-500 bg-blue-500' : 'border-gray-300'}`}>
                {isChecked && <CheckIcon />}
              </div>
              <span className="text-gray-700 font-medium">{optionLabel}</span>
            </div>
          </label>
        </div>
      );
    }

    if (variant === 'button') {
      return (
        <div key={optionValue} className={`relative ${optionClassName}`}>
          <input
            type="checkbox"
            id={optionId}
            checked={isChecked}
            onChange={(e) => handleSingleChange(optionValue, e.target.checked)}
            disabled={isDisabled}
            className="absolute opacity-0 w-0 h-0"
          />
          <label
            htmlFor={optionId}
            className={`inline-flex items-center px-4 py-2 border rounded-md cursor-pointer transition-all duration-200
              ${isChecked 
                ? 'bg-blue-500 text-white border-blue-500' 
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}
              ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {optionLabel}
          </label>
        </div>
      );
    }

    // Default variant
    return (
      <div key={optionValue} className={`relative flex items-center ${optionClassName}`}>
        <input
          type="checkbox"
          id={optionId}
          checked={isChecked}
          onChange={(e) => handleSingleChange(optionValue, e.target.checked)}
          disabled={isDisabled}
          className="absolute opacity-0 w-0 h-0"
        />
        <label
          htmlFor={optionId}
          className={`flex items-center cursor-pointer ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <div className={`${currentSize} border-2 rounded mr-3 flex items-center justify-center transition-all duration-200
            ${isChecked ? 'border-blue-500 bg-blue-500' : 'border-gray-300 hover:border-blue-400'}`}>
            {isChecked && <CheckIcon />}
          </div>
          <span className="text-gray-700 select-none">{optionLabel}</span>
        </label>
      </div>
    );
  };

  return (
    <div className={`checkbox-group ${className}`} {...props}>
      {label && (
        <div className={`text-sm font-medium text-gray-700 mb-3 ${labelClassName}`}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </div>
      )}
      
      <div className={`${direction === 'horizontal' ? 'flex flex-wrap gap-3' : 'space-y-3'}`}>
        {/* Select All option */}
        {selectAll && options.length > 0 && (
          <div className="flex items-center border-b pb-3 mb-3">
            <input
              type="checkbox"
              id={`${name}-select-all`}
              checked={isAllSelected}
              onChange={(e) => handleSelectAll(e.target.checked)}
              disabled={disabled}
              className="absolute opacity-0 w-0 h-0"
            />
            <label
              htmlFor={`${name}-select-all`}
              className={`flex items-center cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <div className={`${currentSize} border-2 rounded mr-3 flex items-center justify-center transition-all duration-200
                ${(isAllSelected || isSomeSelected) ? 'border-blue-500 bg-blue-500' : 'border-gray-300 hover:border-blue-400'}`}>
                {isAllSelected && <CheckIcon />}
                {isSomeSelected && !isAllSelected && (
                  <div className="w-2 h-0.5 bg-white rounded"></div>
                )}
              </div>
              <span className="text-gray-700 font-medium select-none">Select All</span>
            </label>
          </div>
        )}

        {options.map(renderOption)}
      </div>
    </div>
  );
};

// Single Custom Checkbox
const CustomSingleCheckbox = ({
  label,
  checked = false,
  onChange,
  name,
  value,
  disabled = false,
  className = '',
  labelClassName = '',
  required = false,
  variant = 'default',
  size = 'md',
  ...props
}) => {
  const checkboxId = name || `checkbox-${Math.random().toString(36).substr(2, 9)}`;
  
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const currentSize = sizeClasses[size] || sizeClasses.md;

  const CheckIcon = () => (
    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  );

  if (variant === 'switch') {
    return (
      <div className={`flex items-center justify-between ${className}`} {...props}>
        <div className={`text-gray-700 font-medium ${labelClassName}`}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </div>
        <input
          type="checkbox"
          id={checkboxId}
          name={name}
          value={value}
          checked={checked}
          onChange={(e) => onChange && onChange(e.target.checked, e)}
          disabled={disabled}
          className="absolute opacity-0 w-0 h-0"
        />
        <label
          htmlFor={checkboxId}
          className={`relative inline-flex h-6 w-11 items-center rounded-full cursor-pointer transition-colors duration-200
            ${checked ? 'bg-blue-500' : 'bg-gray-200'}
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200
            ${checked ? 'translate-x-6' : 'translate-x-1'}`} />
        </label>
      </div>
    );
  }

  return (
    <div className={`flex items-center ${className}`} {...props}>
      <input
        type="checkbox"
        id={checkboxId}
        name={name}
        value={value}
        checked={checked}
        onChange={(e) => onChange && onChange(e.target.checked, e)}
        disabled={disabled}
        className="absolute opacity-0 w-0 h-0"
      />
      <label
        htmlFor={checkboxId}
        className={`flex items-center cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <div className={`${currentSize} border-2 rounded mr-3 flex items-center justify-center transition-all duration-200
          ${checked ? 'border-blue-500 bg-blue-500' : 'border-gray-300 hover:border-blue-400'}`}>
          {checked && <CheckIcon />}
        </div>
        <span className={`text-gray-700 select-none ${labelClassName}`}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </span>
      </label>
    </div>
  );
};

// Demo Component
const CustomComponentsDemo = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [selectedFramework, setSelectedFramework] = useState('react');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedColors, setSelectedColors] = useState(['blue']);
  const [selectedFeatures, setSelectedFeatures] = useState(['darkMode']);
  const [selectedSkills, setSelectedSkills] = useState(['html', 'css']);
  const [selectedSettings, setSelectedSettings] = useState(['auto-save']);
  const [agreed, setAgreed] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const languageOptions = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'cpp', label: 'C++' },
    { value: 'typescript', label: 'TypeScript' }
  ];
  
  const frameworkOptions = [
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue.js' },
    { value: 'angular', label: 'Angular' },
    { value: 'svelte', label: 'Svelte' }
  ];

  const colorOptions = [
    { value: 'red', label: 'Red' },
    { value: 'blue', label: 'Blue' },
    { value: 'green', label: 'Green' },
    { value: 'purple', label: 'Purple' }
  ];

  const featureOptions = [
    { value: 'darkMode', label: 'Dark Mode' },
    { value: 'notifications', label: 'Push Notifications' },
    { value: 'analytics', label: 'Analytics' },
    { value: 'backup', label: 'Auto Backup' }
  ];

  const skillOptions = [
    { value: 'html', label: 'HTML' },
    { value: 'css', label: 'CSS' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'react', label: 'React' },
    { value: 'nodejs', label: 'Node.js' },
    { value: 'python', label: 'Python' }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Custom Components Demo</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Radio Button Variants */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Radio Button Variants</h2>
          
          {/* Default Radio */}
          <CustomRadioButton
            label="Programming Language (Default)"
            name="language"
            options={languageOptions}
            value={selectedLanguage}
            onChange={setSelectedLanguage}
            className="bg-white p-4 rounded-lg shadow-sm"
            size="md"
          />
          
          {/* Card Radio */}
          <CustomRadioButton
            label="Framework (Card Style)"
            name="framework"
            options={frameworkOptions}
            value={selectedFramework}
            onChange={setSelectedFramework}
            variant="card"
            className="bg-white p-4 rounded-lg shadow-sm"
          />
          
          {/* Button Radio */}
          <CustomRadioButton
            label="Experience Level (Button Style)"
            name="level"
            options={[
              { value: 'beginner', label: 'Beginner' },
              { value: 'intermediate', label: 'Intermediate' },
              { value: 'advanced', label: 'Advanced' },
              { value: 'expert', label: 'Expert' }
            ]}
            value={selectedLevel}
            onChange={setSelectedLevel}
            variant="button"
            direction="horizontal"
            className="bg-white p-4 rounded-lg shadow-sm"
          />
        </div>

        {/* Checkbox Variants */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Checkbox Variants</h2>
          
          {/* Default Checkbox */}
          <CustomCheckbox
            label="Colors (Default with Select All)"
            name="colors"
            options={colorOptions}
            value={selectedColors}
            onChange={setSelectedColors}
            selectAll={true}
            className="bg-white p-4 rounded-lg shadow-sm"
          />
          
          {/* Card Checkbox */}
          <CustomCheckbox
            label="Features (Card Style)"
            name="features"
            options={featureOptions}
            value={selectedFeatures}
            onChange={setSelectedFeatures}
            variant="card"
            className="bg-white p-4 rounded-lg shadow-sm"
          />
          
          {/* Button Checkbox */}
          <CustomCheckbox
            label="Skills (Button Style)"
            name="skills"
            options={skillOptions}
            value={selectedSkills}
            onChange={setSelectedSkills}
            variant="button"
            direction="horizontal"
            className="bg-white p-4 rounded-lg shadow-sm"
          />
        </div>
      </div>

      {/* Switch Variants */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Switch Variants</h2>
        
        <div className="space-y-4">
          <CustomSingleCheckbox
            label="I agree to the terms and conditions"
            checked={agreed}
            onChange={setAgreed}
            variant="switch"
            required
          />
          
          <CustomSingleCheckbox
            label="Enable notifications"
            checked={notifications}
            onChange={setNotifications}
            variant="switch"
          />
          
          <CustomCheckbox
            label="App Settings"
            name="settings"
            options={[
              { value: 'auto-save', label: 'Auto Save' },
              { value: 'dark-theme', label: 'Dark Theme' },
              { value: 'sound', label: 'Sound Effects' }
            ]}
            value={selectedSettings}
            onChange={setSelectedSettings}
            variant="switch"
            className="border-t pt-4"
          />
        </div>
      </div>

      {/* Selected Values Display */}
      <div className="mt-8 p-6 bg-white rounded-lg shadow-sm">
        <h3 className="font-semibold text-gray-700 mb-3">Selected Values:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
          <div>
            <p><strong>Language:</strong> {selectedLanguage || 'None'}</p>
            <p><strong>Framework:</strong> {selectedFramework}</p>
            <p><strong>Level:</strong> {selectedLevel || 'None'}</p>
            <p><strong>Colors:</strong> {selectedColors.join(', ') || 'None'}</p>
          </div>
          <div>
            <p><strong>Features:</strong> {selectedFeatures.join(', ') || 'None'}</p>
            <p><strong>Skills:</strong> {selectedSkills.join(', ') || 'None'}</p>
            <p><strong>Settings:</strong> {selectedSettings.join(', ') || 'None'}</p>
            <p><strong>Agreement:</strong> {agreed ? 'Yes' : 'No'}</p>
            <p><strong>Notifications:</strong> {notifications ? 'Enabled' : 'Disabled'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomComponentsDemo;