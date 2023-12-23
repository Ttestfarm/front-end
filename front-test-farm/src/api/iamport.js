export const userCode = "imp26142610";

export function importIamport() {
  const jqueryScript = document.createElement("script");
  jqueryScript.src = "https://code.jquery.com/jquery-1.12.4.min.js";
  document.head.appendChild(jqueryScript);

  const iamportScript = document.createElement("script");
  iamportScript.src = "https://cdn.iamport.kr/js/iamport.payment-1.1.7.js";
  document.head.appendChild(iamportScript);
}
