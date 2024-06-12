// Function to format timestamps
export const formatTimestamp = (date) => {
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
    let interval = Math.floor(seconds / 31536000);
  
    if (interval >= 1) return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) return `${interval} days ago`;
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) return `${interval} hours ago`;
    interval = Math.floor(seconds / 60);
    if (interval >= 1) return `${interval} minutes ago`;
    return `${seconds} seconds ago`;
  };
  
  // Function to debounce another function
  export const debounce = (func, wait) => {
    let timeout;
    return function () {
      const context = this, args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), wait);
    };
  };
  