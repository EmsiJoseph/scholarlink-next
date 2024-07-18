const generateSchoolYearOptions = (startYear: number, endYear: number) => {
  const options = [];
  for (let year = startYear; year <= endYear; year++) {
    options.push({
      value: `S.Y. ${year}-${year + 1}`,
      label: `S.Y. ${year}-${year + 1}`,
    });
  }
  return options.reverse();
};

const currentYear = new Date().getFullYear();
export const yearOptions = generateSchoolYearOptions(2014, currentYear - 1);
export const currentSchoolYear = () => {
  const dateToday = new Date();

  if (dateToday.getMonth() < 8) {
    return `S.Y. ${currentYear - 1}-${currentYear}`;
  } else {
    return `S.Y. ${currentYear}-${currentYear + 1}`;
  }
};
