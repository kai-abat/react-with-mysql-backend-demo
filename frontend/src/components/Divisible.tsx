const Divisible = ({ num }: { num: number }) => {
  const div3 = num % 3;
  const div5 = num % 5;
  const div3Text = "divisible by three";
  const div5Text = "divisible by five";

  if (div3 === 0 && div5 === 0)
    return <div>{`${div3Text} and ${div5Text}`}</div>;
  if (div3 === 0) return <div>{div3Text}</div>;
  if (div5 === 0) return <div>{div5Text}</div>;

  return <div>{num}</div>;
};
export default Divisible;
