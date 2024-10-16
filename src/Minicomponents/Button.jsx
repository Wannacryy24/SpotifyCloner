export default function Button({ text, onClick, className, icon }) {
  return (
    <button className={className} onClick={onClick}>
      {icon && <i className={icon}></i>} {text}
    </button>
  );
}


