import React from 'react';
import { X } from 'lucide-react';

interface ClearableSelectInputProps {
  value: string;
  displayText: string;
  onSelect: () => void;
  onClear: () => void;
  placeholder?: string;
  error?: boolean;
  selectTitle?: string;
}

const ClearableSelectInput: React.FC<ClearableSelectInputProps> = ({
  displayText,
  onSelect,
  onClear,
  placeholder = 'Select an option...',
  error = false,
  selectTitle = 'Select'
}) => {
  return (
    <div className={`clearable-select-input-wrapper ${error ? 'input-error' : ''}`}>
      <input
        type="text"
        value={displayText}
        readOnly
        placeholder={placeholder}
        className={`clearable-select-input input-readonly ${error ? 'input-error' : ''}`}
      />
      <div className="select-action-buttons">
        {displayText && (
          <button
            type="button"
            className="action-btn clear-select-btn"
            onClick={onClear}
            title="Clear selection"
            aria-label="Clear selection"
          >
            <X size={18} />
          </button>
        )}
        <button
          type="button"
          className="action-btn select-btn"
          onClick={onSelect}
        >
          {selectTitle}
        </button>
      </div>
    </div>
  );
};

export default ClearableSelectInput;
