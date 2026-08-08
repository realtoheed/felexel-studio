import { Fragment } from "react";

/**
 * Renders CMS copy containing the `{email}` token, swapping the token for a
 * real mailto link. Editors write e.g. "Contact us at {email} before paying."
 */
export default function EmailText({
  template,
  email,
  linkClassName = "",
}: {
  template: string;
  email: string;
  linkClassName?: string;
}) {
  const parts = template.split("{email}");

  return (
    <>
      {parts.map((part, i) => (
        <Fragment key={i}>
          {part}
          {i < parts.length - 1 && (
            <a href={`mailto:${email}`} className={linkClassName}>
              {email}
            </a>
          )}
        </Fragment>
      ))}
    </>
  );
}
