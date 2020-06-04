const tmpTemple = document.createElement('template');

export function htmlToDom(html) {
  if (!html) {
    throw new Error(`html parameter MUST NOT be NULL nor EMPTY, got ${html}`);
  }
  tmpTemple.innerHTML = html;
  const result = tmpTemple.content.cloneNode(true);
  tmpTemple.innerHTML = '';
  return result;
}
