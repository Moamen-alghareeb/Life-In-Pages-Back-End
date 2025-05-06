import { Webhook } from 'svix';
import User from '../models/user.model.js';

export const clerkWebHook = async (req, res) => {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
  if (!WEBHOOK_SECRET) {
    throw new Error('WebHook Secret needed!');
  }
  const payload = req.body;
  const headers = req.headers;

  const wh = new Webhook(WEBHOOK_SECRET);
  let evt;
  try {
    evt = wh.verify(payload, headers);
  } catch (err) {
    res.status(400).json({ message: 'WebHook verification Failed' });
  }

  console.log(evt);
  if (evt.type == 'user.created') {
    console.log(evt.data);

    const newUser = new User({
      clerkId: evt.data.id,
      username: evt.data.username || evt.data.email_addresses[0].email_address,
      email: evt.data.email_addresses[0].email_address,
      img: evt.data.profile_img_url,
    });
    await newUser.save();
  }

  if (evt.type == 'user.deleted') {
    await User.findOneAndDelete({ clerkId: evt.data.id });
  }
  res.status(200).json({ message: 'WeebHook Received' });
};
