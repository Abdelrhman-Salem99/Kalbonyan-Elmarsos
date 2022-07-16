const getPuzzle = async (wordCount) => {
  const response = await fetch(
    `//puzzle.mead.io/puzzle?wordCount=${wordCount}`
  );

  if (response.status === 200) {
    const data = await response.json();
    return data.puzzle;
  } else {
    throw new Error("Unable to get puzzle");
  }
};

const getCurrentCountry = async () => {
  const location = await getLocation();
  return getCountry(location.country);
};

const getCountry = async (countryCode) => {
  const response = await fetch("//restcountries.com/v3.1/all");

  if (response.status === 200) {
    const data = await response.json();
    return data.find((country) => country.cca2 === countryCode).name.common;
  } else {
    throw new Error("Unable to fetch the country");
  }
};

const getLocation = async () => {
  const response = await fetch("//ipinfo.io/json?token=c57400ddbefd5a");

  if (response.status === 200) {
    return response.json();
  } else {
    throw new Error("Unable to get the current location");
  }
};

export { getPuzzle as default };
