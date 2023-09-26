import { myQueue } from "./Queue";
import EmailOptions from "./email/EmailOptions";
import { emailService } from "./email/SendEmail";
import { Job } from "bull";

myQueue.process(async (job: Job) => {
  switch (job.data.type) {
    case "sendEmail":
      await emailService.send(job.data.data);
      console.log("Done");
      break;
    default:
      console.log("Unknown job type");
  }
});
