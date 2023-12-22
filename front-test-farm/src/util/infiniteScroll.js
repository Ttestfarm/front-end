export const smoothController = (handleScroll) => {
  const timer = setInterval(() => {
    window.addEventListener('scroll', handleScroll);
  }, 100);

  return () => {
    clearInterval(timer);
    window.removeEventListener('scroll', handleScroll);
  };
};

export const handleScroll = (scrollRef, setBtnView) => {
  if (window.scrollY > scrollRef.current) {
    setBtnView((prev) => !prev); // 상태를 토글합니다
  }
  scrollRef.current = window.scrollY;
};

export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

// useEffect(() => {
//   scroll.smoothController(() => scroll.handleScroll(scrollRef, setBtnView));
// }, [setBtnView]);
