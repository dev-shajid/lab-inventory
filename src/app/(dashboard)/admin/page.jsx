import HandleItemRequest from "./HandleItemRequest";
import HandleNewUserRequest from "./HandleNewUserRequest";
import HandleUserRequest from "./HandleUserRequest";

export default function Admin() {
  return (
    <section className="container space-y-8">
      <HandleNewUserRequest />
      <HandleUserRequest />
      <HandleItemRequest />
    </section>
  );
}