function checkUserRole() {
  return "APPLICANT";
}

export default function Layout({
  ADMIN,
  MANAGER,
  SCHOLAR,
  APPLICANT,
}: {
  ADMIN: React.ReactNode;
  MANAGER: React.ReactNode;
  SCHOLAR: React.ReactNode;
  APPLICANT: React.ReactNode;
}) {
  const role = checkUserRole();
  return (
    <div>
      {role === "ADMIN" && ADMIN}
      {role === "MANAGER" && MANAGER}
      {role === "SCHOLAR" && SCHOLAR}
      {role === "APPLICANT" && APPLICANT}
    </div>
  );
}
