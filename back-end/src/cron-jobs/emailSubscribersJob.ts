import cron from "node-cron";
import { EMAIL_SUBSCRIBERS_JOB_INTERVAL } from "../configuration/dbUpdateIntervals";
import { emailSubscribers } from "../services/email-subscribers/emailSubscribersService";

const emailSubscribersJob = async () => {
  try {
    console.log("Checking if it should email subscribers...");
    emailSubscribers();
  } catch (err) {
    console.error(`Error running periodic check email subscribers job: ${err}`);
  }
};

export const startEmailSubscribersJob = () => {
  cron.schedule(EMAIL_SUBSCRIBERS_JOB_INTERVAL, emailSubscribersJob);
};
