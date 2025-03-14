export function Input({ id, title }) {
    return (
      <div>
        <label htmlFor={id}>{title}</label>
        <input id={id} name={id} />
      </div>
    );
  }