import {FollowUpActivity} from "./followups";
export interface Opportunities {
  client: string;
  businessName: string;
  businessLine:
    | "outsourcing recursos"
    | "desarrollo web"
    | "desarrollo mobile"
    | "consultoría TI";
  description: string;
  estimatedValue: number;
  estimatedDate: Date;
  status: "Apertura" | "En Estudio" | "Orden de Compra" | "Ejecutada";
  followUps?: FollowUpActivity;
}
