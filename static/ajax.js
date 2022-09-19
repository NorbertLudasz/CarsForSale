// eslint-disable-next-line
async function getMessage (hirdetesID) {
  try {
    const fetchresult = await fetch(`/message/${hirdetesID}`);
    const jsonresult = await fetchresult.json();
    console.log(jsonresult);
    document.getElementById('elrejtett').innerText = jsonresult.date;
  } catch (err) {
    console.log(err);
  }
}

// eslint-disable-next-line
async function photoDel(imageid) {
  try {
    console.log('photodel eleje');
    document.getElementById(`keep/${imageid}`).remove();
    document.getElementById(`photodelete/${imageid}`).remove();
    await fetch(`/imageDel/${imageid}`, { method: 'delete' });
    console.log('photodel after await');
    document.getElementById('delphotomessage').innerText = 'Image deleted successfully';
  } catch (err) {
    document.getElementById('delphotomessage').innerText = 'Image deletion unsuccessful';
    console.log(err);
  }
}
