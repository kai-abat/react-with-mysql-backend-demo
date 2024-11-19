const calculateSomething = () => {
  const x = Math.random();
  const y = Math.random();

  return Math.atan2(x, y);
};

const getHomepageData = () => {
  const title = getTitle();
  const navs = getListOfNavs();

  const data = {
    title,
    navs,
  };
};
const getTitle = () => {
  const t1 = getFirstTitle();
  const t2 = getSecondTitle();

  return `${t1} ${t2}`;
};
const getListOfNavs = () => {
  return ["Home", "Menu", "News", "About us", "Contact us"];
};
const getFirstTitle = () => {
  return "Great";
};
const getSecondTitle = () => {
  return "Gigantes";
};

module.exports = { getHomepageData, calculateSomething };
