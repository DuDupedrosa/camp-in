import React from 'react';

const useMedia = (media) => {
  const [match, setMatch] = React.useState(null);

  React.useEffect(() => {
    function handleResize() {
      const { matches } = window.matchMedia(media);
      setMatch(matches);
    }
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [media]);

  return match;
};

export default useMedia;
