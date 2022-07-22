const validateEmail = value => {
  let emailRex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (emailRex.test(value)) {
    return true;
  }
  return false;
};

const getEventPrice = eventCard => {
  const addons = eventCard.addons === '' ? [] : JSON.parse(eventCard.addons);
  const payees = eventCard.payees === '' ? [] : JSON.parse(eventCard.payees);
  let addonPrice = 0;
  const len = addons.length;
  for (let i = 0; i < len; i++) {
    addonPrice += Number(addons[i].price);
  }
  let payeeFee = 0;
  payees.map(payee => {
    payeeFee += Number(payee.fee);
    return 0;
  });
  return ((Number(eventCard.price) + addonPrice) * (100 + payeeFee)) / 100;
};

const isVideoFile = str => {
  const fileName = str.split('.');
  const ext = fileName[fileName.length - 1].toLowerCase();
  return ext === 'mp4' || ext === 'mov' || ext === 'avi';
};

const getLikesNumber = eventCard => {
  let likes = [];
  try {
    likes = JSON.parse(eventCard.likes_number);
  } catch (err) {
    likes = [];
    console.log(err);
  }
  if (typeof likes !== 'object' || likes === null) likes = [];
  if (likes) return likes.length;
  else return 0;
};

export {validateEmail, getEventPrice, getLikesNumber, isVideoFile};
