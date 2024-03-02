export const serviceError = (err) => {
  if (err.response && err.response.data) {
    return err.response.data.message;
  } else {
    return 'An error occured';
  }
};

export const isInRole = (roles, role) => {
  return roles.some((roleObj) => roleObj.name?.toLowerCase() === role.toLowerCase());
};

export const dateConverter = (format) => {
  if (format === '') {
    return '';
  }

  let monthArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

  let fullDate = new Date(format);
  let currentDateTime = new Date();

  let year = fullDate.getFullYear();
  let month = fullDate.getMonth();
  let date = fullDate.getDate();
  let hour = fullDate.getHours();
  let min = fullDate.getMinutes();

  // Calculate the time difference in milliseconds
  let timeDifference = currentDateTime.getTime() - fullDate.getTime();

  // Convert the time difference to hours
  let timeDifferenceInHours = timeDifference / (1000 * 60 * 60);

  if (timeDifferenceInHours < 24) {
    // Less than 24 hours ago
    return `${hour}:${min}`;
  } else if (timeDifferenceInHours < 48) {
    // Between 24 and 48 hours ago
    return 'Yesterday';
  } else {
    // More than 48 hours ago
    return `${hour}:${min} ${date} ${monthArray[month]}, ${year}`;
  }
};

export const professionNames = (items) => {
  return items.map((item) => item.name).join(', ');
};

export const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const summaryValueCheck = (obj, value) => {
  return obj !== null ? (value === null ? '0' : value.toLocaleString()) : '0';
};
