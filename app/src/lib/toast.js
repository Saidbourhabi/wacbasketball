import toast from 'react-hot-toast';

const recent = new Map(); // message -> timestamp
const DEDUPE_MS = 5000;

const dedupe = (key) => {
  const now = Date.now();
  const last = recent.get(key);
  if (last && now - last < DEDUPE_MS) return false;
  recent.set(key, now);
  return true;
};

export const notify = {
  success: (msg, opts) => dedupe(`s:${msg}`) && toast.success(msg, opts),
  error:   (msg, opts) => dedupe(`e:${msg}`) && toast.error(msg, opts),
  info:    (msg, opts) => dedupe(`i:${msg}`) && toast(msg, opts),
  dismiss: (id) => toast.dismiss(id),
};