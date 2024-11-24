import { ContactType } from "./clients";
  
  export interface FollowUpActivity {
    contactType: string;
    contactDate: string;
    clientContact: ContactType;
    salesExecutive: string;
    description: string;
    additionalNotes: string;
    opportunityId?: string;
  }
  