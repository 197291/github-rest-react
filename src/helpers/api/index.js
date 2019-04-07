export function parser(linkStr) {
    linkStr = linkStr.replace(/per_page/g, '');

    return linkStr.split(',').map( (rel) => {
      return rel.split(';').map( (curr, idx) => {

        if (idx === 0) return /page=(\d+)/.exec(curr)[1];
        if (idx === 1) return /rel="(.+)"/.exec(curr)[1];
      })
    }).reduce( (obj, curr, i,) => {
      obj[curr[1]] = curr[0];
      return obj;
    }, {});
}

/**
 * Run the canceler function if it is defined
 */
export const cancelRequest = (canceler) => {
  if (canceler) {
    canceler();
  }

  return null;
};