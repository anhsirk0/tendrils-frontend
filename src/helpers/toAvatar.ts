function toAvatar(fullName: string) {
  const name = fullName.split(" ");
  const firstName = name[0];
  let middleName = "";
  let lastName = "";

  if (name.length > 1) {
    lastName = name[name.length - 1];
    if (name.length > 2) {
      middleName = name.slice(1, -1).join(" ");
    }
  }

  return [firstName, middleName, lastName]
    .map((s) => s.charAt(0).toUpperCase())
    .join("");
}

export default toAvatar;
