import style from './Checkbox.module.css';
export const Checkbox = ({ children, disabled, checked, onChange }) => {
  return (
    <div className={style.checkbox}>
      <label>
        <input
          type="checkbox"
          disabled={disabled}
          checked={checked}
          onChange={({ target: { checked } }) => onChange(checked)}
        />
        {children}
      </label>
    </div>
  );
};
