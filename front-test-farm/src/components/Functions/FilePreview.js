export const FilePreview = (files, itemsPerRow) => {
  return (
    files.length !== 0 &&
    files.map((file, index) => (
      <span key={index}>
        <img
          src={URL.createObjectURL(file)}
          width="110px"
          height="110px"
          alt=""
          style={{ marginRight: '10px' }}
        />
        {(index + 1) % itemsPerRow === 0 ? (
          <>
            <br />
            <br />
          </>
        ) : null}
      </span>
    ))
  );
};
