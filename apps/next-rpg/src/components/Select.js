export function Select({ id, title, list }) {
  return (
    <div>
      <label htmlFor={id}>{title}</label>
      <select id={id} name={id}>
        {list.map((option, index) => {
          return (
            <option key={index} value={option.slug}>
              {option.name}
            </option>
          );
        })}
      </select>
    </div>
  );
}
