import "./Avatar.css";

function Avatar(props) {
  const { path, width, height } = props;

  return (
    <div className="avatar">
      <img src={path} alt="avatar" width={width} height={height} />
    </div>
  );
}
export default Avatar;
