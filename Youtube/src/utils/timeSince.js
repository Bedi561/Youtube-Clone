export const timeSince = (date) => {
    const seconds = Math.floor((new Date().valueOf() - new Date(date).valueOf()) / 1000);
  
    let interval = seconds / 31536000; // 1 year = 31536000 seconds
    if (interval > 1) {
      return Math.floor(interval) + " years";
    }
  
    interval = seconds / 2592000; // 1 month = 2592000 seconds
    if (interval > 1) {
      return Math.floor(interval) + " months";
    }
  
    interval = seconds / 86400; // 1 day = 86400 seconds
    if (interval > 1) {
      return Math.floor(interval) + " days";
    }
  
    interval = seconds / 3600; // 1 hour = 3600 seconds
    if (interval > 1) {
      return Math.floor(interval) + " hours";
    }
  
    interval = seconds / 60; // 1 minute = 60 seconds
    if (interval > 1) {
      return Math.floor(interval) + " minutes";
    }
  
    return Math.floor(seconds) + " seconds"; // fallback if it's less than 1 minute
  };
  