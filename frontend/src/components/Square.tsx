const Square = ({ type }: { type: string }) => {
  return <div className={`square ${type}`}>{type}</div>;
};
export default Square;
