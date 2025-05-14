/**
 * `Fullname` Untils
 * This Untility generates Fullname.
 *
 * @param Firstname @param Middlename @param Lastname
 * @returns Fullname string
 */

export default function generateFullname(
  firstname: string,
  middlename: string,
  lastname: string
) {
  return firstname + " " + middlename.substring(0, 1) + ". " + lastname;
}
