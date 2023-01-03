import crypto from 'crypto';

const generateUniqueId = () => {
  return crypto.randomBytes(6).toString('hex');
};

export default generateUniqueId;

