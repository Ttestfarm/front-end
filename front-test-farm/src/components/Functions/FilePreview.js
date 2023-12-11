export const FilePreview = (files, itemsPerRow) => {
  if (!files || files.length === 0) {
    return null; // 파일이 없거나 null일 경우, 미리보기를 생성하지 않고 null 반환
  }
  return (
    files.length !== 0 &&
    files.map((file, index) => (
      <span key={index}>
        <img
          src={URL.createObjectURL(file)}
          width="110px"
          height="110px"
          alt=""
          style={{ marginRight: "10px" }}
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
