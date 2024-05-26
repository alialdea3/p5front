const BackButton = () => {
  return (
    <button
      onClick={(e) => {
        window.location.href = `/`;
      }}
    >
      Back
    </button>
  );
};

export default BackButton;
