export const getSavedBookIds = () => {
    if (typeof window === 'undefined') {
      return [];
    }
  
    const savedBookIds = localStorage.getItem('saved_books')
      ? JSON.parse(localStorage.getItem('saved_books'))
      : [];
  
    return savedBookIds;
  };
  
  export const saveBookIds = (bookIdArr) => {
    if (typeof window === 'undefined') {
      return;
    }
  
    if (bookIdArr.length) {
      localStorage.setItem('saved_books', JSON.stringify(bookIdArr));
    } else {
      localStorage.removeItem('saved_books');
    }
  };
  
  export const removeBookId = (bookId) => {
    if (typeof window === 'undefined') {
      return false;
    }
  
    const savedBookIds = localStorage.getItem('saved_books')
      ? JSON.parse(localStorage.getItem('saved_books'))
      : null;
  
    if (!savedBookIds) {
      return false;
    }
  
    const updatedSavedBookIds = savedBookIds?.filter((savedBookId) => savedBookId !== bookId);
    localStorage.setItem('saved_books', JSON.stringify(updatedSavedBookIds));
  
    return true;
  };
  