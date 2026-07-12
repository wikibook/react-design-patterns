import styles from './SignInput.module.css';
import useEyesValue from './useEyesValue.js';

export default function SignInput({
  idFor,
  name,
  type,
  value,
  children,
  errorText,
  onChange,
  onBlur,
  onFocus,
  eyes,
}) {
  const [eyesValue, handleEyesClick, eyesStyle] = useEyesValue();

  if (eyesValue) {
    type = 'text';
  }

  const borderControl = `${styles.input} ${errorText ? styles.errorBorder : ''}`;

  return (
    <div className={styles.root}>
      <label className={styles.label} htmlFor={idFor}>
        {children}
      </label>

      <div className={borderControl} onBlur={onBlur} onFocus={onFocus}>
        <input
          onChange={onChange}
          value={value}
          className={styles.container}
          id={idFor}
          name={name}
          type={type}
          autoComplete="off"
        />

        {eyes && (
          <button
            className={eyesStyle}
            onClick={handleEyesClick}
            type="button"
          />
        )}
      </div>

      {errorText && <div className={styles.errorMessage}>{errorText}</div>}
    </div>
  );
}
