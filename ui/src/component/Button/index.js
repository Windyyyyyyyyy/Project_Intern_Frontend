import "./Button.css";

function Button(props) {
  return (
    <>
      <button
        type={props.type}
        onClick={props.onClick}
        className="button-component"
      >
        {props.value}
      </button>
    </>
  );
}
export default Button;
