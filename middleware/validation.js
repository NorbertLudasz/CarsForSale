export function existcheck(markain, varosin, arin, datein) {
  return (markain && varosin && arin && datein);
}

export function uploadsearchinputcheck(ms, vs, arin, datein) {
  if (!ms.match(/[A-Za-z]*/) || !vs.match(/[A-Za-z]*/) || !arin.match(/[0-9]*/) || !Date.parse(datein)) {
    return false;
  }
  return true;
}

export function existcheckSearch(markain, varosin, armin, armax) {
  return (markain && varosin && armin && armax);
}

export function existcheckimage(image) {
  return (image);
}
export function searchinputcheck(ms, vs, mina, maxa) {
  if (!ms.match(/[A-Za-z]*/) || !vs.match(/[A-Za-z]*/) || !mina.match(/[0-9]*/) || !maxa.match(/[0-9]*/) || mina > maxa) {
    return false;
  }
  return true;
}

export function archeck(currentAr, minAr, maxAr) {
  if (currentAr > minAr && currentAr < maxAr) {
    return true;
  }
  return false;
}

export function namechecker(a, ms, b, vs) {
  return (a === ms && b === vs);
}

export function usercheckReg(nev, szerep) {
  if (!nev.match(/[A-Za-z]*/) || (szerep !== 'admin' && szerep !== 'user')) {
    return false;
  }
  return true;
}

export function usercheckLogin(nev) {
  if (!nev.match(/[A-Za-z]*/)) {
    return false;
  }
  return true;
}
