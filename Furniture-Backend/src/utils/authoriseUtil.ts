export const authorizeUtil = (
  permission: boolean,
  userRole: string,
  ...roles: string[]
) => {
  let authorizeUser = true;

  const result = roles.includes(userRole);

  if (permission && !result) {
    authorizeUser = false;
  }
  if (!permission && result) {
    authorizeUser = false;
  }

  return authorizeUser;
};
