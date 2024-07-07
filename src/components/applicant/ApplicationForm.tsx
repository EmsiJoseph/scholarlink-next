import { Form } from "@saas-ui/forms/zod";
import * as z from "zod";
import { ApplicationFormSchema } from "@/schemas";

const schema = ApplicationFormSchema;
export default function Post() {
  return (
    <Form
      schema={schema}
      defaultValues={{
        title: "",
        description: "",
      }}
      onSubmit={() => null}
      fields={{
        submit: {
          children: "Next",
        },
      }}
    />
  );
}
